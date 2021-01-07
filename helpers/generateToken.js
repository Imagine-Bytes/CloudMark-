const jwt = require('jsonwebtoken');
const config = require('../config/config')
//import jwt from 'jsonwebtoken'; 

const generateToken = (res, link , id,username) => {
  const expiration =  86400000;
  const token = jwt.sign({ link , id,username }, config.secretKey, {
    expiresIn: 86400000,
  });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration),
    secure: false, // set to true if your using https
    httpOnly: true,
  }).json({status:"Logged In", token});
};
module.exports = generateToken
