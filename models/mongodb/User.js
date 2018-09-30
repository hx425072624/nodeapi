var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  String,
  password:  String,
  scope: String,
  name: String,
  sex: Boolean,
  headImg: String,
  des: String
});

module.exports = mongoose.model('User', UserSchema);

