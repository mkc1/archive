var models = require('./db/models');
var Message = models.Message;
var Channel = models.Channel;
var Promise = require('bluebird')
var Slack = require('./slackfactory')

//xoxb-33701779302-PNVLBx0mqybphatcr3Em1HKq

var Botkit = require('botkit');

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-33701779302-PNVLBx0mqybphatcr3Em1HKq',
}).startRTM()

controller.on('channel_joined',function(bot,message) {
  bot.say(
  {
    text: 'I\'m here and recording all! :lower_left_ballpoint_pen: Don\'t forget to set the password for this channel\'s archive.\n Mention me and say: \'password is *channelpassword*\'',
    channel: message.channel.id
  }
  );
});

// give the bot something to listen for.
controller.hears('password is',['direct_message','direct_mention','mention'],function(bot,message) {

  Channel.findOne({channelId: message.channel})
  .then(function(channel){
    if (!channel) {
      var password = message.text.substring(message.text.indexOf('is ')+3, message.text.length)
      Slack.getChannelInfo(message.channel)
      .then(function(channel) {
        return Channel.create({
          channelId: message.channel,
          name: channel.name,
          password: password
        })
        .then(function(channel) {
          bot.reply(message, 'Your channel\'s password is now *'+password+'* and your channel id is *'+message.channel+'*! Write them down somewhere! :lower_left_ballpoint_pen:')
        })
      })
    } else {
        bot.reply(message,'The password is already set for this channel! If you want to change the password, mention me in the channel and say: \'change password to *(yournewpassword)*\'');
    }
  })
});

controller.hears('change password to',['direct_message','direct_mention','mention'],function(bot,message) {

  var newPassword = message.text.substring(message.text.indexOf('to ')+3, message.text.length)

  Channel.findOne({channelId: message.channel})
  .then(function(channel){
    if (!channel) {
      Slack.getChannelInfo(message.channel)
      .then(function(channel) {
        return Channel.create({
          channelId: message.channel,
          name: channel.name,
          password: newPassword
        })
        .then(function(channel) {
          bot.reply(message,'Password changed! Your channel\'s new password is *' + newPassword + '* and your channel id is *'+message.channel+'*!')
        })
      })
    } else {
      channel.password = newPassword;
      channel.save()
      bot.reply(message,'Password changed! Your channel\'s new password is *' + newPassword + '* and your channel id is *'+message.channel+'*!')
    }
  })
});


controller.on(['direct_mention','mention'],function(bot,message) {

  bot.reply(message,'I\'m here and recording all!\nIf you want to change the password for this channel, mention me in the channel and say: \'change password to *(yournewpassword)*\'')

});

controller.on(['direct_message'],function(bot,message) {
  var compliments = [
    'the most beautiful, glowing, sun goddess ever',
    'a poetic, noble land mermaid',
    'a beautiful, talented, brilliant, powerful musk ox',
    'a beautiful tropical fish',
    'a beautiful, naïve, sophisticated newborn baby'
  ]
  var randomCompliment = compliments[Math.floor(Math.random()*compliments.length)]
  bot.reply(message,'I cannot have conversations as I am merely an archivebot, but you are '+randomCompliment+'.')

});


controller.on('file_shared', function(bot, file) {

  Promise.join(Slack.getUserInfo(file.file.user), Slack.getChannelInfo(file.file.channels[0]))
  .spread(function(user, channel) {
    console.log(file)
    if (file.file.mode=='snippet') {
      return Message.create({
        type: 'file',
        channel: channel.name,
        user: user.name,
        date: file.event_ts,
        event: file.type,
        file: {
          mode: file.file.mode,
          title: file.file.title,
          filetype: file.file.filetype,
          url_private: file.file.url_private,
          preview: file.file.preview
        }
      })
    } else {
      return Message.create({
        type: 'file',
        channel: channel.name,
        user: user.name,
        date: file.event_ts,
        event: file.type,
        file: {
          mode: file.file.mode,
          title: file.file.title,
          filetype: file.file.filetype,
          url_private: file.file.url_private,
        }
      })
    }
  })
  .then(function(message){
    console.log('message create', message)
  })

})


controller.on('ambient',function(bot,message) {

    Promise.join(Slack.getUserInfo(message.user), Slack.getChannelInfo(message.channel))
    .spread(function(user, channel) {
      return Message.create({
      type: message.type,
      channel: channel.name,
      user: user.name,
      text: message.text,
      date: message.ts,
      event: message.event
      })
    })
    .then(function(message){
      console.log('message create', message)
    })

})

module.exports = controller;