var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SongSchema = new Schema(
  {
    mp3_link: {type: String, required: true},
  }
);

//Export model - compiles a model
// instances of models are called documents

module.exports = mongoose.model('Song', SongSchema);