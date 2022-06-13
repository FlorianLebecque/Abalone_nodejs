const Sequelize = require("sequelize");
const db = require("../db");


const Follow = db.define("follow",{
    id_user_1:{
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    id_user_2:{
        type: Sequelize.STRING,
        allowNull : false,
        primaryKey:true
    }
});


db.sync();


module.exports = Follow;