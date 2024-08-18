const { Router } = require("express");
const { doctoruser, getAlldoctors,getDoctorsDetails } = require("../controllers/doctor");
const router = Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/registerdoctor',upload.single('doctorImage'), doctoruser);
router.get('/usersdoctor', getAlldoctors);
router.get('/usersdoctor/:id', getDoctorsDetails);

module.exports = router;
