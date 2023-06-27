const jwt = require("jsonwebtoken");
const User = require("../models/User")
const dotenv = require('dotenv')
dotenv.config()

const verifyEmailController = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(404).json({ sucess: false, msg: "Invalid Token" });
    }

    //decode the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return res.status(404).json({ sucess: false, msg: "Invalid Token", error: err });
    }

    //checking if user present or not
    const oldUser = await User.findOne({ email: decodedToken.email });
    if (!oldUser) {
        return res.status(404).json({ sucess: false, msg: "User not found!" });
    }

    oldUser.verified = true;
    await oldUser.save();
    res.status(200).json({ sucess: true, msg: "You are verified successfully!" })
}

module.exports = { verifyEmailController };