var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
    name: {type: String, required: true, max: 100},
    date_created: {type: Date},
    comment: {type: String, required: true, max: 400},
    channelID: {type: String, required: true}
  })

//Export model - compiles a model
// instances of models are called documents

module.exports = mongoose.model('Comment', CommentSchema);