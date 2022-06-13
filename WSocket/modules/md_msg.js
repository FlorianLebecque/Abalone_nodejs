const ctrl = require("../controler");


module.exports = {
    event:"msg",
    function : (socket,msg) => {
        
        try {
            let sender = ctrl.users.get(socket);
            
            if(!sender){
                console.log("Msg received in non existant room");
                socket.disconnect();
                return;
            }

            ctrl.users.forEach((player,sckt)=>{
                if((player.roomId == sender.roomId)&&(player.id != sender.id)){
                    sckt.emit("new_message", msg);
                }
            });

        } catch (error) {
            console.log("Msg received in non existant room");
            socket.disconnect();
        }


    }
}