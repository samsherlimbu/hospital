const { Router } = require('express');
const router = Router();
const { galleryImage, getImages, deleteImage, deleteImagesByTitle } = require('../controllers/gallery');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/galleryImage');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post('/galleryImage', upload.array('galleryImage', 12), galleryImage);
router.get('/get-galleryImage', getImages);
router.delete('/delete-galleryImage/:id', deleteImage);
router.delete('/delete-galleryImagesByTitle/:title', deleteImagesByTitle); // New route for deleting images by title

module.exports = router;
