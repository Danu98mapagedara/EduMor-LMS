const express = require('express');
const router = express.Router();
const { verifyEmailController } = require('../Controllers/emailController');

//verify email
router.get("/verify", verifyEmailController)

module.exports=router;