var mongoose = require('mongoose');

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
    },
    file: fileSchema
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