var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChannelSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    genre: {type: String, required: true, max: 100},
    date_created: {type: Date},
    queue: {type: Array, "default" : [], required: true}, 
    current_song: {type: String},
    active: {type: Number}
  }
);

//Export model - compiles a model
// instances of models are called documents
var Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel