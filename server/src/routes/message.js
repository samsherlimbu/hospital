// server/src/routes/message.js
const { Router } = require("express");
const router = Router();
const updateMessage = require("../controllers/updateMessage");

router.post('/message', updateMessage);

module.exports = router;
