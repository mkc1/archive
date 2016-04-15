var express = require('express');
var router = express.Router();

var models = require('../db/models');
var Message = models.Message;

router.get('/messages', function(req, res, next){
  Message.find({})
  .then(function(messages){
    res.json(messages)
  })
  .then(null, next)
})

router.get('/channels', function(req, res, next){
  Message.findAllChannels()
  .then(function(channels){
    res.send(channels)
  })
  .then(null, next)
})

router.get('/teams', function(req, res, next){
  Message.findAllTeams()
  .then(function(teams){
    res.send(teams)
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