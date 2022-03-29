const Sequelize = require("sequelize");
const db = require("../db");


const User = db.define("user",{
    id:{
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull : false,
        unique:true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    token:{
        type: Sequelize.STRING,
        allowNull: true
    },
    connection:{
        type: Sequelize.DATE,
        allowNull: true
    }
});


db.sync();



module.exports = User;