var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 Image 模块
module.exports = mongoose.model('Image', new Schema({
  name: String,
  des: String,
  link: String,
  create_time:{type:Date,default:Date.now},
  plus:{type:Number,default:0}
}));