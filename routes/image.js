if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
const ImageModel = require('../models/image');
const express = require('express');
const imageProxy = require('../proxy/image');
const router = express.Router();
const multer = require('multer')
    ,blobContainer=require('../middleware/blobcontainer')
    , getStream = require('into-stream')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

router.get('/:id', function(req, res, next) {
  imageProxy.getImages(req.params.id,function (err,images) {
    if(err) throw  err;
    res.json(images)
  });
});

router.put('/:id', function(req, res, next) {
  let img = req.query;
  let id = req.params.id;
  imageProxy.updateImage(id,img, err=> {
   if(err) throw  err;
   res.json({ success: true });
 })
});

router.post('/add', uploadStrategy,(req, res, next)=> {
    const img = req.query
        ,originalName = req.file.originalname
        , stream = getStream(req.file.buffer)
        , streamLength = req.file.buffer.length;
    blobContainer.upload(originalName,stream,streamLength).then(blobName =>{
        img.link= process.env.STORAGE_NAME+'/'+ process.env.CONTAINER_NAME+'/'+ blobName;
        imageProxy.saveImage(img,err=> {
            if(err) throw  err;
            res.json({ success: true });
        })
    }).catch(err =>{
        throw  err;
    });
});

module.exports = router;
