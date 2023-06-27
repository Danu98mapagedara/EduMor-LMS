const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      msg: 'Authorization token missing'
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(402).json({
      success: false,
      msg: 'Authorization token missing',
      error:err
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.decode(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(403).json({
      success: false,
      msg: 'Invalid authorization token',
      error: err
    });
  }
  req.user = decodedToken;
  next();
};

module.exports = authMiddleware;
