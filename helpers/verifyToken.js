const jwt = require('jsonwebtoken');
const config = require('../config/config')

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.status(401).json({message:"You need to Login"})
    }
    const decrypt = await jwt.verify(token, config.secretKey);
    req.user = {
      username:decrypt.username,
    };
    next();
  } catch (err) {
    return res.status(500).json({error:err});
  }
};

module.exports = verifyToken;

