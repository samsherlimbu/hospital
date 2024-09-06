const { Router } = require('express');
const { registerUser, loginUser, findAllUsers,findAllAdmin,getAdminById,deleteAdminById } = require('../controllers/user');
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', findAllUsers);

router.get('/Admin-Users',findAllAdmin );
router.get('/getAdmin/:id', getAdminById);
router.delete('/delete/:id', deleteAdminById);
module.exports = router;
