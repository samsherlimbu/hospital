const { Router } = require("express");
const { doctoruser, getAlldoctors,getDoctorsDetails } = require("../controllers/doctor");
const router = Router();

router.post('/registerdoctor', doctoruser);
router.get('/usersdoctor', getAlldoctors);
router.get('/usersdoctor/:id', getDoctorsDetails);

module.exports = router;
