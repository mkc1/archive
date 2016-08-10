var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./db/models');
var Channel = models.Channel;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes'));
require('./app.js')

app.use(express.static(path.join(__dirname, './browser')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './browser/index.html'));
});

app.listen(process.env.PORT || 3000)