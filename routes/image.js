const ImageModel = require('../models/image');
const express = require('express');
const imageProxy = require('../proxy/image');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  imageProxy.getImages(req.params.id,function (err,images) {
    if(err) throw  err;
    res.json(images)
  });
});

router.put('/:id', function(req, res, next) {
  let img = req.query;
  let id = req.params.id;
  imageProxy.updateImage(id,img,function (err) {
   if(err) throw  err;
   res.json({ success: true });
 })
});

router.post('/', function(req, res, next) {
  let img = req.query;
  console.log(req.files);
  // let img = new ImageModel({
  //   name: 'test',
  //   des: 'test',
  //   link: 'https://huangxingstorage.blob.core.windows.net/img/default-img.png',
  //   plus: 0
  // });

  imageProxy.saveImage(img,function (err) {
    if(err) throw  err;
    res.json({ success: true });
  })
});

module.exports = router;
