var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/archive');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var messageSchema = new mongoose.Schema({
    type: {
      type: String
    },
    text: {
      type: String
    }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message: Message
};