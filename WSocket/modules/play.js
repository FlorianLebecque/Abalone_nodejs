const ctrl = require("../controler");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    event:"play",
    function : async (socket,room_form) => {
        
        if(!ctrl.rooms.has(room_form.roomId)){
            return;
        }

        let room = ctrl.rooms.get(room_form.roomId);
        let current_user = ctrl.users.get(socket);

        let player_1 = ctrl.users.get(room.player_1);
        let player_2 = ctrl.users.get(room.player_2);


        let new_turn = 0;

        if(room.turn == player_1.id){
            room.turn = player_2.id;
            new_turn = 2;
        }else{
            room.turn = player_1.id;
            new_turn = 1;
        }

        if(room.turn != current_user.id){
            socket.emit("played",{
                board : room.board,
                turn : - new_turn + 3,
                score : room.score
            });
        }

        

        room.board = room_form.board
        room.score = ctrl.ComputeScore(room.board);
        
        if(room.score[0] == 6){
            if(room.player_1){
                room.player_1.emit("end",1);
            }

            if(room.player_2){
                room.player_2.emit("end",1);
            }
        }else if(room.score[1]== 6){
            if(room.player_1){
                room.player_1.emit("end",1);
            }

            if(room.player_2){
                room.player_2.emit("end",1);
            }
        }

        room.player_1.emit("played",{
            board : room.board,
            turn : new_turn,
            score : room.score
        });

        room.player_2.emit("played",{
            board : room.board,
            turn : new_turn,
            score : room.score
        });
    }
}