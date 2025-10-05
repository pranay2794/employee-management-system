const express=require('express');
const router=express.Router();
const authController=require('../controller/authController');

router.post('/register',authController.registerManager);
router.post('/login',authController.loginManager);
router.get('/current',authController.currentManager);


module.exports=router;

