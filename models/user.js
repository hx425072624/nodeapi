var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 Image 模块
module.exports = mongoose.model('User', new Schema({
  id: String,
  name: String,
  loginname: String,
  psw: String,
  headImg: String,
  des: String
}));