const {signupvalidation,loginvalidation}=require("../Middlewares/Authvalidation.js")
const { Signup,Login,getAdmins, submitAssignment,getAssignmentsForAdmin,deleteAssignment , acceptAssignment}=require("../Controllers/Authcontrollers.js")
// const { getAdmins, submitAssignment } = require('../Controllers/Assignmentcontrollers.js');
const router = require('express').Router()
router.post('/signup',signupvalidation,Signup)
router.post('/login',loginvalidation,Login)
router.get('/admins', getAdmins);
router.post('/assignments', submitAssignment);
router.get('/assignments', getAssignmentsForAdmin); // Fetch assignments for logged-in admin
router.delete('/:id', deleteAssignment);
router.put('/:id', acceptAssignment)
module.exports=router   