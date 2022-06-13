const ctrl = require("../controler");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    event:"disconnect",
    function : async (socket,msg = "") => {
        if(ctrl.users.has(socket)){
            let room = ctrl.rooms.get(ctrl.users.get(socket).roomId);
            ctrl.EndGame(socket,room)
        }
        
    }
}