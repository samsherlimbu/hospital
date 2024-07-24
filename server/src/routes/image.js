const { Router } = require('express');
const { postimage } = require('../controllers/image');

const router = Router();

router.post('/uploadimage', postimage);

module.exports = router;
