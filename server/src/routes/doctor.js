const { Router } = require("express");
const { doctoruser, getAlldoctors,getDoctorsDetails,deleteDoctor ,getDepartments,getDepartmentsby} = require("../controllers/doctor");
const router = Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/doctor')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/registerdoctor',upload.single('doctorImage'), doctoruser);
router.get('/usersdoctor', getAlldoctors);
router.get('/usersdoctor/:id', getDoctorsDetails);
router.delete('/usersdoctor/:id', deleteDoctor);


router.get('/departments', getDepartments)
router.get('/departments/:id', getDepartmentsby)





module.exports = router;
