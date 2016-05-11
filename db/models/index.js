var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/archive');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var channelSchema = new mongoose.Schema({
    channelId: {
      type: String
    },
    name: {
      type: String
    },
    password: {
      type: String
    }
});

var fileSchema = new mongoose.Schema({
    mode: {
      type: String
    },
    title: {
      type: String
    },
    filetype: {
      type: String
    },
    url_private: {
      type: String
    },
    thumbnail_url: {
      type: String
    },
    preview: {
      type: String
    },

})

var messageSchema = new mongoose.Schema({
    type: {
      type: String
    },
    channel: {
      type: String,
      ref: 'Channel',
      required: true
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
    },
    file: fileSchema
});

messageSchema.pre('save', function(next){
  var ts = this.date;
  date = new Date(ts*1000);
  next();
})

// messageSchema.statics.findAllChannels = function(){
//   return this.find().distinct('channel', function(err, channels){
//     return channels;
//   })
// }

channelSchema.methods.getChannelMessages = function(cb) {
  return Message.find({channel: this.channelId}).exec()
}

var Message = mongoose.model('Message', messageSchema);
var Channel = mongoose.model('Channel', channelSchema);

module.exports = {
    Message: Message,
    Channel: Channel
};