var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  // User.find({}, function(err, users) {
  //   res.json(users);
  // });
  res.json({hello:"hello"});
});
router.get('/setup', function(req, res, next) {

  // 创建一个测试用户
  var nick = new User({
    name: 'waitifsh',
    password: 'test',
    admin: true
  });

  // 将测试用户保存到数据库
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
