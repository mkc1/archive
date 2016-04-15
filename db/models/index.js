var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/archive');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var messageSchema = new mongoose.Schema({
    type: {
      type: String
    },
    channel: {
      type: String
    },
    user: {
      type: String
    },
    text: {
      type: String
    },
    date: {
      type: Date
    },
    team: {
      type: String
    },
    event: {
      type: String
    }
});

messageSchema.pre('save', function(next){
  var ts = this.date;
  this.date = new Date(ts*1000);
  next();
})

messageSchema.statics.findAllChannels = function(){
  return this.find().distinct('channel', function(err, channels){
    return channels;
  })
}

var Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message: Message
};