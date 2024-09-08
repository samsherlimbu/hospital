const { Router } = require('express');
const router = Router();
const { updateMessage, getMessage ,deleteMessage} = require('../controllers/updateMessage');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/messageImage');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post('/message', upload.single('messageImage'), updateMessage);
router.get('/message', getMessage);
router.delete('/deletemessage/:id', deleteMessage);

module.exports = router;
