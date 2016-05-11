var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', require('./routes'));
require('./app.js')

app.use(express.static(path.join(__dirname, './browser')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './browser/index.html'));
});

app.listen(3000, function() {
  console.log('listening!!!!!')
})