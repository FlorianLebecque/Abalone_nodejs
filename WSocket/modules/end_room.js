const ctrl = require("../controler");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    event:"disconnect",
    function : async (socket,msg = "") => {

        let player = ctrl.users.get(socket);

        const url = "http://127.0.0.1:3001"
        try {
            const response = await fetch(url+"/rooms/end",{
                method:     "post",
                body: JSON.stringify(player),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        
            const data = await response.json();

            if(response.status == 200){
                console.log("player exit : "+player.player+" in room : " + player.roomId);

                ctrl.users.delete(socket);
            }

        } catch (error) {
            console.log(error);
        }

       
    }
}