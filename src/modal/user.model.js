const sequelize = require('../connection');
const {DataTypes} = require('sequelize');

const User = sequelize.define("User" , {
email : {
    type : DataTypes.STRING,
    allowNull : false ,
    unique : true,
    required : true
},
password : {
    type : DataTypes.STRING,
    allowNull : false ,
    required : true
}
})

module.exports = User;