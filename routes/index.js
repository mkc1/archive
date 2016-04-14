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

router.post('/messages', function(req, res, next){
  Message.create(req.body)
  .then(function(message){
    res.json(message)
  })
  .then(null, next)
})


module.exports = router;