
const { Router } = require('express');
const { registerUser, loginUser, findAllUser } = require('../controllers/user');
const router = Router();




router.post('/register',registerUser );
  
  
  router.post('/login',loginUser)

  router.get('/users',findAllUser)

  module.exports = router
  