var express = require('express');
var router = express.Router();
var session = require('express-session');
var models = require('../db/models');
var Message = models.Message;
var Channel = models.Channel;

router.param('id', function (req, res, next, id) {
  Channel.find({channelId: id}).exec()
  .then(function (channel) {
    req.requestedChannel = channel[0];
    next();
  })
  .then(null, next)
})

router.use(session({
  secret: 'tongiscool',
  resave: false,
  saveUninitialized: false
}));

// router.use(function (req, res, next) {
//   console.log('session', req.session);
//   next();
// });

router.post('/login', function (req, res, next) {
  //find channel based on req body
  Channel.findOne({
    channelId: req.body.channelId,
    password: req.body.password
  })
  .exec()
  .then(function (channel) {
    // persist that channel to session
    if (!channel) {
      res.sendStatus(401);
    } else {
      req.session.channelId = channel._id;
      res.json(channel);
    }
  })
  .then(null, next);
});

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
  //console.log('session', req.session.channelId, 'channel', req.requestedChannel._id)
  if (!req.session.channelId || !req.requestedChannel || req.requestedChannel._id!=req.session.channelId) {
    res.sendStatus(401)
  } else {
    req.requestedChannel.getChannelMessages()
    .then(function(messages){
      var obj = req.requestedChannel.toObject();
      obj.messages = messages;
      res.json(obj)
    })
    .then(null, next)
  }
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