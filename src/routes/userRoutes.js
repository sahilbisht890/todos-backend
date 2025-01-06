const {Router} = require('express');
const userRouter = Router();
const createUser = require('../controller/userController');

userRouter.post('/create' ,createUser);

module.exports = userRouter ;
