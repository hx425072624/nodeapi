if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const express = require('express');
const userProxy = require('../proxy/user');
const router = express.Router();
const authenticate = require('../middleware/oauth2/authenticate');
const oauth = require('../middleware/oauth2/oauth');
router.get('/',authenticate({scope:'profile'}),(req, res, next)=> {
  userProxy.getUserByLoginName(req.params.id,function (err,user) {
    if(err) throw  err;
    res.json(images)
  });
});

router.post('/authorise',(req, res, next)=> {
  oauth.getUser(req.body.userName,req.body.psw).then(user=>{
    console.log(user);

  })
  oauth.getClient(req.body.clientId,req.body.clientSecret).then(client=>{
    console.log(client);
  })
});

router.post('/register',(req, res, next)=> {
  res.json({ success: true });
});

module.exports = router;
