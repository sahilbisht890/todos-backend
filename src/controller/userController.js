const User  = require('../modal/user.model');

const createUser = async (req , res) => {
    const {email , password} = req.body; 
    console.log('Request body',req.body);
    res.status(200).json({
        success : true ,
        message : 'success'
    })
}
 
module.exports = createUser