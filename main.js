var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var models = require('./db/models');
var Channel = models.Channel;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', require('./routes'));
require('./app.js')

// app.use(session({
//   secret: 'tongiscool',
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(function (req, res, next) {
//   console.log('session', req.session);
//   next();
// });

app.post('/login', function (req, res, next) {
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

app.use(express.static(path.join(__dirname, './browser')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './browser/index.html'));
});


app.listen(3000, function() {
  console.log('listening!!!!!')
})