if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const express = require('express');
const imageProxy = require('../proxy/image');
const router = express.Router();
const authenticate = require('../middleware/oauth2/authenticate');
const multer = require('multer')
  ,blobContainer=require('../middleware/blobcontainer')
  , getStream = require('into-stream')
  , inMemoryStorage = multer.memoryStorage()
  , uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

router.get('/:id?',function(req, res, next) {
  imageProxy.getImages(req.params.id,function (err,images) {
    if(err) throw  err;
    res.json(images)
  });
});

router.put('/:id',authenticate({scope:'profile'}), function(req, res, next) {
  let img = req.body;
  let id = req.params.id;
  imageProxy.updateImage(id,img, err=> {
    if(err) throw  err;
    res.json({ success: true });
  })
});

router.post('/', authenticate({scope:'profile'}),uploadStrategy,(req, res, next)=> {
  const img = req.body
    ,originalName = req.file.originalname
    , stream = getStream(req.file.buffer)
    , streamLength = req.file.buffer.length;
  blobContainer.upload(originalName,stream,streamLength).then(blobName =>{
    img.link = blobName;
    imageProxy.saveImage(img,err=> {
      if(err) throw  err;
      res.json({ success: true });
    })
  }).catch(err =>{
    throw  err;
  });
});
router.delete('/:id',authenticate({scope:'profile'}), function(req, res, next) {
  let id = req.params.id;
  imageProxy.getImageByID(id,(image,err)=>{
    if(err) throw err;

    blobContainer.delete(image.link).catch(err=>{
      throw err;
    });

    imageProxy.deleteImage(id, err=> {
      if(err) throw  err;
      res.json({ success: true });
    })
  })

});
module.exports = router;
