const { where } = require("sequelize");
const User = require("../modal/user.model");
const bcrypt = require("bcrypt");
const {generateAccessToken , generateRefreshToken} = require('../helpers/token')

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const userWithEmail = await User.findOne({
      where : {
        email
      }
    });

     if(userWithEmail) {
      console.log('fetch response' , userWithEmail);
      return res.status(401).json({
        success: false,
        message: "Email already registered",
      });
     }   

   const new_user = await User.create({ email, password : hashpassword });
   return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log("Server Error", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const signIn = async (req , res) => {
 try {
    const {email , password} = req.body
    
    const user = await User.findOne({
     where : {
       email
     }
    });
    if(!user){
     return res.status(401).json({
       status : false ,
       message : "Email is not registered"
     })
    }
 
    const isPasswordCorrect = await bcrypt.compare(user.password , password);
    if(!isPasswordCorrect){
     return res.status(401).json({
       status : false ,
       message : "Password is Wrong"
     })
    }

    const accessToken = await generateAccessToken(email , password);
    const refreshToken = await generateRefreshToken(user.id);

    user.accessToken = accessToken ;
    user.refreshToken = refreshToken ;
    await user.save();
   
     res.cookie('accessToken', accessToken, {
      httpOnly: true,        // Makes the cookie inaccessible to JavaScript
      secure: true,          // Ensures the cookie is sent over HTTPS (use only in production)
      sameSite: 'strict',    // Prevents CSRF by restricting cookie sending
      maxAge: 3600000       
    });

    return res.status(200).json({
     status : true,
     message : "User login successfully",
     accessToken : accessToken
   })
 } catch (error) {
      console.log('Server Error',error);
      return res.status(500).json({
        message : 'Server Error',
        status : false
      })
 }
}

module.exports = {createUser , signIn};
