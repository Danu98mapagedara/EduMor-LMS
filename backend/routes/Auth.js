const express = require('express');
const { registerController, loginController, forgotpasswordController,resetPasswordController,updateUserController,getUserController,updatePremiumMembership,getAllUsers } = require('../Controllers/authController');
const verifyTokenController = require('../Controllers/verifyTokenController');
const authMiddleware = require('../Middlewares/authMiddleware');
const router = express.Router();


//register user
router.post("/register",registerController);

//login user
router.post("/login",loginController);

//forgot password
router.post("/forgotpassword",forgotpasswordController);

//verify Token
router.get("/verifyToken", verifyTokenController);

//Reset password
router.post("/resetPassword", resetPasswordController);

// Update a user
router.patch('/:id',authMiddleware, updateUserController);

// Get a user by id
router.get('/:id', getUserController);

router.put('/users/:userId/premium-membership', updatePremiumMembership);

// Route to get all user details
router.get('/',authMiddleware, getAllUsers);


module.exports=router;