var models = require('./db/models');
var Message = models.Message;
var Promise = require('bluebird')
var Slack = require('./slackfactory')

//xoxb-33701779302-PNVLBx0mqybphatcr3Em1HKq

//amazon API

// amazon lambda function

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
    text: 'I\'m here and writing everything down! :lower_left_ballpoint_pen: Don\'t forget to set the password for this channel\'s archive.\n Mention me and say: \'password is *channelpassword*\'',
    channel: message.channel.id
  }
  );
});

// give the bot something to listen for.
controller.hears('password is',['direct_message','direct_mention','mention'],function(bot,message) {

  
  var password = message.text.substring(message.text.indexOf('to ')+3, message.text.length)
  bot.reply(message, 'Your channel\'s password is now *'+password+'*! Write it down somewhere! :lower_left_ballpoint_pen:')
  bot.reply(message,'The password is already set for this channel! If you want to change the password, mention me in the channel and say: \'change password to *yournewpassword*\'');

});

controller.hears('change password to',['direct_message','direct_mention','mention'],function(bot,message) {

  var newPassword = message.text.substring(message.text.indexOf('to ')+3, message.text.length)
  bot.reply(message,'Password changed! Your channel\'s new password is *' + newPassword + '*. Write it down somewhere! :lower_left_ballpoint_pen:')
});


controller.on(['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'I\'m here and archiving!\nIf you want to change the password for this channel, mention me and say: ')

});


controller.on('file_shared', function(bot, file) {
  console.log('the file:', file)
  //bot.reply('file')
})


controller.on('ambient',function(bot,message) {

    Promise.join(Slack.getUserInfo(message.user), Slack.getChannelInfo(message.channel), Slack.getTeamInfo(message.team))
    .spread(function(user, channel, team) {
      return Message.create({
      type: message.type,
      channel: channel.name,
      user: user.name,
      text: message.text,
      date: message.ts,
      team: team.name,
      event: message.event
      })
    })
    .then(function(message){
      console.log('message create', message)
    })

})

module.exports = controller;