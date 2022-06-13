const ctrl = require("../controler");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/*
room = {
    player_1 : "socket player 1",
    player_2 : "socket player 2",
    turn     : "player id",
    board    : "array",
    score    : "array",
    roomId   : "room id",
    player_1_id : "player 1 id",
    player_2_id : "player 2 id"
}
*/

module.exports = {
    event:"disconnect",
    function : async (socket,msg = "") => {
        if(ctrl.users.has(socket)){
            let room = ctrl.rooms.get(ctrl.users.get(socket).roomId);

            ctrl.EndGame(socket,room)
        }
        
    }
}