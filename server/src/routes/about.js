const { Router } = require("express");
const { About, AboutInfo, deleteAboutInfo } = require("../controllers/About");
const router = Router();

// Define routes for adding, fetching, and deleting "about" information
router.post('/About', About);                // Add new about info
router.get('/AboutInfo', AboutInfo);          // Get all about info
router.delete('/AboutInfo/:id', deleteAboutInfo);  // Delete specific about info by ID

module.exports = router;
