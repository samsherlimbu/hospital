// server/src/routes/message.js
const { Router } = require("express");
const router = Router();
const {updateMessage,getMessage} = require("../controllers/updateMessage");



router.post('/message', updateMessage);
router.get('/message',getMessage);

module.exports = router;
