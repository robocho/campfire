var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true}
  }
);

//Export model - compiles a model
// instances of models are called documents

module.exports = mongoose.model('User', UserSchema);