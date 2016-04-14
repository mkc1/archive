var models = require('./db/models');
var Message = models.Message;

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
    text: 'archivebot is listening and recording... archivebot sees all :eyes:',
    channel: message.channel.id
  }
  );
});

// give the bot something to listen for.
controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'Hello yourself!!!!.');
  console.log(message)

});

controller.on(['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'I hear you!!!');
  console.log(message)

});

// controller.on('user_typing', function(bot, message) {

//   bot.reply(message, '!!!!!typing still!!!')
// })

controller.on('file_shared', function(bot, file) {
  console.log('the file:', file)
  //bot.reply('file')
})

controller.on('ambient',function(bot,message) {

    // then respond with a message object
    console.log(message)
    Message.create(message)

})

module.exports = controller;