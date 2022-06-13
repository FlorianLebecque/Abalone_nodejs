const Sequelize = require("sequelize");
const db = require("../db");


const Room = db.define("rooms",{
    room_id:{
        type: Sequelize.STRING,
        allowNull : false,
        primaryKey:true
    },

    id_user_1:{
        type: Sequelize.STRING,
        allowNull:false,
    },

    id_user_2:{
        type: Sequelize.STRING,
        allowNull : false,
    },

    score_1:{
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue:0
    },

    score_2:{
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue:0
    },

    winner_id:{
        type: Sequelize.STRING,
        allowNull : false,
        defaultValue:""
    }

});


db.sync();


module.exports = Room;