var Image  = require('../models/mongodb/Image');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB,{ useNewUrlParser: true });
/**
 * 分页查找图片
 * Callback:
 * - err, 数据库异常
 * - images, 图片
 * @param {String} id 图片ID
 * @param {Function} callback 回调函数
 */
exports.getImages = function (id, callback) {
  if (id) {
    return Image.find({'_id': {"$lt": id}})
      .limit(100)
      .sort({'_id':-1})
      .exec(callback);
  }else {
    return Image.find({})
      .limit(100)
      .sort({'_id':-1})
      .exec(callback);
  }
};

exports.saveImage = function (image, callback) {
  Image.create(image,callback)
};

exports.updateImage = function (id,image, callback) {
  Image.update({'_id':id},{$set:image},callback)
};
exports.deleteImage = function (id, callback) {
  Image.remove({'_id':id},callback)
};
/**
 * 根据图片ID查找图片
 * Callback:
 * - err, 数据库异常
 * - image, 图片
 * @param {String} id 图片ID
 * @param {Function} callback 回调函数
 */
exports.getImageByID = function (id, callback) {
  Image.findOne({_id: id}, callback);
};