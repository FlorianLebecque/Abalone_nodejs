const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Controler{
    constructor(){
        this.users = new Map();
        this.rooms = new Map();
    }


    ComputeScore(board){

        let pieces = new Map();
        pieces.set(1,0);
        pieces.set(2,0);
        pieces.set(0,0);

        board.forEach(row => {
            
            row.forEach(p => {
                pieces.set(p,pieces.get(p) + 1);
            });

        });



        return [14 - pieces.get(2),14 - pieces.get(1)];

    }

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

    player = {
        roomId : "",
        player : "user name",
        id     : "user id"
    }
    */

    

    async EndGame(socket,room){
        let player = ctrl.users.get(socket);
        

        const url = "http://127.0.0.1:3001"
        try {

            let score = ctrl.ComputeScore(room.board);
            let the_winner_id = 0;
            if((score[0] != 6)&&(score[1] != 6)){   //a player exited the game before the end
                
                if(room.player_1_id == player.id){
                    the_winner_id = room.player_2_id;
                }else{
                    the_winner_id = room.player_1_id;
                }
            }

            let bod = {
                room_id   : room.roomId,
                id_user_1 : room.player_1_id,
                id_user_2 : room.player_2_id,
                score_1   : score[0],
                score_2   : score[1],
                winner_id : the_winner_id
            } 

            const response = await fetch(url+"/rooms/end",{
                method:     "post",
                body: JSON.stringify(bod),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        
            const data = await response.json();

            if(response.status == 200){
                console.log("player exit : "+player.player+" in room : " + player.roomId);
                
                if(room){
                    if(room.player_1){
                        room.player_1.emit("end",1);
                    }
    
                    if(room.player_2){
                        room.player_2.emit("end",1);
                    }
                }

                ctrl.rooms.delete(player.roomId);
                ctrl.users.delete(socket);
            }

        } catch (error) {
            console.log(error);
        }
    }

}

let ctrl = new Controler();

module.exports = ctrl;