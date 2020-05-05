var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var Schema = mongoose.Schema;

var SongSchema = new Schema(
  {
    title: {type: String, required: true},
    mp3_link: {type: String, required: true},
  }
);
var CommentSchema = new Schema ({
  name: {type: String, required: true, max: 100},
  date_created: {type: Date},
  comment: {type: String, required: true, max: 400},
  channelID: {type: String, required: true}
})


var ChannelSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    genre: {type: String, required: true, max: 100},
    date_created: {type: Date},
    queue: [SongSchema], 
    active: {type: Number},
    comments: [CommentSchema]
  }
);


//Export model - compiles a model
// instances of models are called documents
var Channel = mongoose.model('Channel', ChannelSchema);
module.exports =  Channel

