// server/src/routes/message.js
const { Router } = require("express");
const router = Router();
const {addDepartment,getdepartmentList} = require("../controllers/department");



router.post('/department', addDepartment);
router.get('/departmentlist',getdepartmentList);

module.exports = router;
