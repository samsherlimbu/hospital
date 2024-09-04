const { Router } = require('express');
const { createPatientCase, getPatientCases, getPatientCaseById } = require('../controllers/patient');

const router = Router();

router.post('/patient-case', createPatientCase);
router.get('/patient-cases', getPatientCases);
router.get('/getPatient-cases/:id', getPatientCaseById); // Ensure this matches the client request

module.exports = router;
