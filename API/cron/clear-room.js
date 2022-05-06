const cron = require("node-cron");
const ctrl = require("../controler/Controler");

console.log("CRON : Clear room");

cron.schedule("* * * * *",function(){

    let roomsKey = Array.from( ctrl.rooms.keys() );

    let count = 0;

    for(let i = 0 ; i < roomsKey.length; i++){

        if(!ctrl.rooms.get(roomsKey[i]).started){

            count++;
            console.log("cleared room : " + ctrl.rooms.get(roomsKey[i]).id);
            ctrl.rooms.delete(roomsKey[i]);
        }
    }

    console.log("cleared " + count + " inactive rooms");

});


module.exports = cron;