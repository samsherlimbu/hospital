
const { Router } = require('express');
const { registerUser, loginUser,  findAllUsers } = require('../controllers/user');
const router = Router();




router.post('/register',registerUser );
  
  
  router.post('/login',loginUser)

  router.get('/users',findAllUsers)
  

  module.exports = router
  