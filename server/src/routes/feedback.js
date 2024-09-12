// routes/feedback.js
const { Router } = require('express');
const { submitFeedback } = require('../controllers/feedback');
const router = Router();

router.post('/feedback', submitFeedback);

module.exports = router;
