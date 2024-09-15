const express = require('express');
const router = express.Router();
const { addFooter, getFooter, deleteFooter } = require('../controllers/Foot');

router.post('/footer', addFooter);
router.get('/getfooter', getFooter);
router.delete('/footer/:id', deleteFooter); // Add this route for delete

module.exports = router;
