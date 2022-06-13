const ctrl = require("../controler");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/*
let room_form = {
    roomId : "",
    player : "user name",
    id     : "user id"
}
*/
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

                        let info_1 = {
                            player_1 : player.player,
                            player_2 : room_form.player,
                            turn : 1
                        }

                        let info_2 = {
                            player_1 : player.player,
                            player_2 : room_form.player,
                            turn : 2
                        }


                        sckt.emit("start_game",info_1);   //player 1

                        socket.emit("start_game",info_2)  //player 2
                    }

                });

                ctrl.users.set(socket,room_form);

                if(ctrl.rooms.has(room_form.roomId)){

                    let room = ctrl.rooms.get(room_form.roomId);
                    room.player_2 = socket;
                    room.player_2_id = room_form.id;
                }else{
                    ctrl.rooms.set(room_form.roomId,{
                        player_1 : socket,
                        player_2 : null,
                        score : [],
                        board : [],
                        turn : room_form.id,
                        roomId : room_form.roomId,
                        player_1_id : room_form.id,
                    });
                }

            }

            socket.emit("start_room",{"code":response.status,"msg":data});
        } catch (error) {
            socket.emit("start_room",{"code":error});
        }

       
    }
}