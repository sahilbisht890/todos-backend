const {Router} = require('express');
const userRouter = Router();
const {createUser , signIn} = require('../controller/userController');

userRouter.post('/create' ,createUser);
userRouter.post('/signIn',signIn);

module.exports = userRouter ;
