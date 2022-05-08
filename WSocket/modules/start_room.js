const ctrl = require("../controler");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    event:"start_room",
    function : async (socket,room_form) => {
        
        const url = "http://127.0.0.1:3001"
        try {
            const response = await fetch(url+"/rooms/start",{
                method:     "post",
                body: JSON.stringify(room_form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        
            const data = await response.json();

            if(response.status == 200){
                console.log("player joined : "+room_form.player+" in room : " + room_form.roomId);

                ctrl.users.forEach((player,sckt)=>{
                    
                    if(player.player == room_form.player){
                        ctrl.users.delete(sckt);
                        console.log("cleared old connection");
                    }

                        //the room is already created and we joined it
                    if(player.roomId == room_form.roomId){

                        let info = {
                            player_1 : player.player,
                            player_2 : room_form.player,
                            turn : 1
                        }


                        sckt.emit("start_game",info);   //player 1
                        socket.emit("start_game",info)  //player 2
                    }

                });

                ctrl.users.set(socket,room_form);
            }

            socket.emit("start_room",{"code":response.status,"msg":data});
        } catch (error) {
            socket.emit("start_room",{"code":error});
        }

       
    }
}