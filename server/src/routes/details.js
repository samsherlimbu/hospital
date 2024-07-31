const Router = require('express');
const { addDetail } = require('../controllers/details');
const router = Router.Router();


const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/doctor')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/doctordetails',upload.single('doctorphoto'), addDetail);

module.exports = router;
