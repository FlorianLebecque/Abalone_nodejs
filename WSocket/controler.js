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

    async EndGame(socket,room){
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