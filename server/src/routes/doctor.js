const { Router } = require("express");
const { doctoruser, getAlldoctors } = require("../controllers/doctor");
const router = Router();

router.post('/registerdoctor', doctoruser);
router.get('/usersdoctor', getAlldoctors);

module.exports = router;
