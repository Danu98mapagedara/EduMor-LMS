const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = (data) => {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    return jwt.sign(data, jwtSecret, { expiresIn: '1d' });
}
