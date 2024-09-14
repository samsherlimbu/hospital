const { Router } = require('express');
const { registerUser, loginUser, findAllUsers,findAllUsersbyid,findAllAdmin,getAdminById,deleteAdminById,deleteUserById } = require('../controllers/user');
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', findAllUsers);
router.get('/users/:id', findAllUsersbyid)
router.delete('/deleteuser/:id', deleteUserById)

router.get('/Admin-Users',findAllAdmin );
router.get('/getAdmin/:id', getAdminById);
router.delete('/delete/:id', deleteAdminById);
module.exports = router;
