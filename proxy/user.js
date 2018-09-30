var User  = require('../models/mongodb/User');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_OAUTH2,{ useNewUrlParser: true });
/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByLoginName = function (loginName, callback) {
  User.findOne({'loginname': new RegExp('^'+loginName+'$', "i")}, callback);
};