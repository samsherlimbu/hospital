const { Router } = require('express');
const { sliderImage, getImages, deleteImageslider, deleteImagesByTitle } = require('../controllers/slider');
const multer = require('multer');

const router = Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/sliderImage');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/sliderImage', upload.array('sliderImage', 12), sliderImage);
router.get('/get-sliderImage', getImages);
router.delete('/delete-sliderImage/:id', deleteImageslider);
router.delete('/delete-galleryImagesByTitle/:title', deleteImagesByTitle);

module.exports = router;
