const { Router } = require("express");
const { Aboutmessage,getAboutMessage,deleteAboutMessage } = require("../controllers/AboutUs"); // Ensure this path is correct
const router = Router();

router.post('/AboutMessage', Aboutmessage);
router.get('/getAboutMessage',getAboutMessage )
router.delete('/getAboutMessage/:id', deleteAboutMessage);

module.exports = router;
