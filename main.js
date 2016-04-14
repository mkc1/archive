var express = require('express');
var app = express();
var path = require('path');

app.use('/', require('./routes'));
require('./app.js')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './browser/index.html'));
});

app.listen(3000, function() {
  console.log('listening!!!!!')
})