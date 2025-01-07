const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const generateAccessToken = async (email, password) => {
  const accessToken = await jwt.sign({ email, password }, jwt_secret, {
    expiresIn: "1h",
  });
  return accessToken;
};

const generateRefreshToken = async (id) => {
    const refreshToken = await jwt.sign({id} , jwt_secret , {expiresIn : '5h'});
    return refreshToken ; 
}

module.exports = {generateAccessToken  , generateRefreshToken};
