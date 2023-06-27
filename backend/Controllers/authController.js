const bcrypt = require("bcryptjs");
const User = require("../models/User");
const tokenGenerator = require("../Config/createToken");
const { sendVerificationEmail, sendForgotPasswordEmail } = require("../Config/sentEmail")

const registerController = async (req, res) => {
    const { firstName, lastName, email, password, phonenumber, userRole} = req.body;

    //checks the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ sucess: false, msg: "Invalid email" });
    }

    //checks if the email is already registed
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return res.status(403).json({ sucess: false, msg: "This email is alreday registerd" });
    };

    //use model and create new user
    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const hashedPassword = hash;

            const newUser = new User({
                firstName,
                lastName,
                email,
                phonenumber,
                password: hashedPassword,
                userRole,
            });
            await newUser.save();

            //generate token
            const token = tokenGenerator({ email: newUser.email });

            //send email
            const link = "http://" + req.hostname + ":3000/verifyEmail?token=" + token;

            const sendMail = await sendVerificationEmail(newUser.email, link);
            if (sendMail) {
                res.status(201).json({ sucess: true, msg: "Registered in successfully error in sending verification" });
            } else {
                res.status(201).json({ sucess: true, msg: "Registered successfully" });
            }
        });
    });

};

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ sucess: false, msg: "Invalid email" });
    }

    //finding old user
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
        return res.status(400).json({ sucess: false, msg: "Inavaid email or password" });
    }

    //comparing passowrds
    const comparePassword = await bcrypt.compare(password, oldUser.password);

    if (!comparePassword) {
        return res.status(400).json({ sucess: false, msg: "Inavaid email or password" });
    }

    // Check if the user is verified
    if (!oldUser.verified) {
        return res.status(400).json({ success: false, msg: "Your account has not been verified yet. Please check your email for verifying your account." });
    }

    //generate token with user info
    const token = tokenGenerator({ email: oldUser.email, _id: oldUser._id, firstName: oldUser.firstName, lastName: oldUser.lastName, verified: oldUser.verified, phonenumber: oldUser.phonenumber, isPremiumMember:oldUser.isPremiumMember, userRole:oldUser.userRole });

    //sending response
    res.status(200).json({ sucess: true, token, msg: "You're logged in successfully" })
};

const forgotpasswordController = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ sucess: false, msg: "Please enter a valid email" })
    }

    //checks the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ sucess: false, msg: "Please enter a valid email" });
    }

    //checks user is present or not
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
        return res.status(404).json({ sucess: false, msg: "User is not found!" })
    }

    //send forgot password

    //generate token
    const token = tokenGenerator({ email: oldUser.email });

    //send email
    const link = "http://" + req.hostname + ":3000/resetPassword?token=" + token;

    const sendMail = await sendForgotPasswordEmail(oldUser.email, link);
    if (sendMail) {
        return res.status(201).json({ sucess: true, msg: "Error in sending email" });
    } else {
        return res.status(201).json({ sucess: true, msg: "Email sent" });
    }
};

//reset password
const resetPasswordController = async (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body;

    //checks the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ sucess: false, msg: "Invalid email" });
    }

    const oldUser = await User.findOne({ email });
    if (!oldUser) {
        return res.status(400).json({ sucess: false, msg: "User not found!" });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ sucess: false, msg: "Password do not match!" });
    }

    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newPassword, salt, async (err, hash) => {
            const hashedPassword = hash;

            const updatedData = await User.findOneAndUpdate({ email }, {
                $set: {
                    password: hashedPassword
                }
            })
            if (updatedData) {
                res.status(200).send({ sucess: true, msg: "Password is updated successfully!" });
            } else {
                res.status(500).send({ sucess: false, msg: "Something went wrong!" });
            }
        })
    });

};


// Update a user
const updateUserController = async (req, res) => {
    const { firstName, lastName, phoneNumber, birthday, profilePhoto, street, city, province, zipcode } = req.body;
    const userId = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: { firstName, lastName, phoneNumber, birthday, profilePhoto, street, city, province, zipcode }
            },
            { new: true }
        );

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error updating user", error });
    }
};

// Get a user by id
const getUserController = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error getting user", error });
    }
};

//update the user membership
const updatePremiumMembership = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.isPremiumMember = true;
      await user.save();
  
      return res.json({ message: 'Premium membership updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Controller function to get all user details
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
  };

module.exports = { registerController, loginController, forgotpasswordController, resetPasswordController, updateUserController, getUserController,updatePremiumMembership, getAllUsers }