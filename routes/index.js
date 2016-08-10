var express = require('express');
var router = express.Router();

var models = require('../db/models');
var Message = models.Message;
var Channel = models.Channel;

router.param('id', function (req, res, next, id) {
  console.log('param', id)
  Channel.find({channelId: id}).exec()
  .then(function (channel) {
    req.requestedChannel = channel[0];
    next();
  })
  .then(null, next)
})

router.get('/messages', function(req, res, next){
  Message.find({})
  .then(function(messages){
    console.log(Message)
    res.json(messages)
  })
  .then(null, next)
})

router.get('/channels', function(req, res, next){
  Channel.find({})
  .then(function(channels){
    res.json(channels)
  })
  .then(null, next)
})

router.get('/channel/:id', function(req, res, next){
  req.requestedChannel.getChannelMessages()
  .then(function(messages){
    var obj = req.requestedChannel.toObject();
    obj.messages = messages;
    res.json(obj)
  })
  .then(null, next)
})

router.post('/messages', function(req, res, next){
  Message.create(req.body)
  .then(function(message){
    res.json(message)
  })
  .then(null, next)
})

router.post('/channels', function(req, res, next){
  Channel.create(req.body)
  .then(function(channel){
    res.json(channel)
  })
  .then(null, next)
})

router.delete('/messages', function(req, res, next){
  Message.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );
})

module.exports = router;