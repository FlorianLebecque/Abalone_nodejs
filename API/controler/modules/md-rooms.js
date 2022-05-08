const Str = require("@supercharge/strings");


let room = {
    id  :   "",
    player_1:   "",
    player_2:   "",
    passwd  :   "",
}

const md_rooms = {

    GetRoomList(){
        return Array.from(this.rooms.values());
    },

    IsPlayerInRoom(player){
        let room_list = this.GetRoomList();

        let find = false;

        room_list.forEach(room => {

            if((room.player_1 == player)||(room.player_2 == player)){
                find = true;
            }

        });

        return find;

    },

    async CreateRoom(room_form){

        try {
            if(!this.CheckObj(room_form,["player","token"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }

        let res = await this.checkToken(room_form.player,room_form.token)
        if(res){

            if(this.IsPlayerInRoom(room_form.player)){
                throw {code:403,err:"Player is already in a room"}; 
            }

            let new_room = {
                id :    Str.uuid(),
                player_1: room_form.player,
                player_2: -1,
                passwd  : -1,
                started : false,
                createdAt: new Date()
            }

            this.rooms.set(new_room.id,new_room);


            return new_room;

        }else{
            throw {code:403,err:"Invalid user or token"}; 
        }
    },

    async JoinRoom(room_form){
        
        try {
            if(!this.CheckObj(room_form,["player","token","roomId"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }

        let res = await this.checkToken(room_form.player,room_form.token)
        if(res){

            if(this.IsPlayerInRoom(room_form.player)){
                throw {code:403,err:"Player is already in a room"}; 
            }

            let room = this.rooms.get(room_form.roomId);

            room.player_2 = room_form.player

            console.log("room joined");

            return room;

        }else{
            throw {code:403,err:"Invalid user or token or room id"}; 
        }
    },

    async StartRoom(room_form){

        try {
            if(!this.CheckObj(room_form,["player","roomId"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }


        try {
            let room = this.rooms.get(room_form.roomId);
            
            room.started = false;

            if(room.player_1 == room_form.player){
                room.started = true;
            }

            if(room.player_2 == room_form.player){
                room.started = true;
            }

            
            return room.started;
        } catch (error) {
            throw {code:400,err:"Room not found"};
        }

    },

    async EndRoom(room_form){

        try {
            if(!this.CheckObj(room_form,["player","roomId"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }


        try {
            
            console.log("End room : "+room_form.roomId);
            this.rooms.delete(room_form.roomId);

            return true;
        } catch (error) {
            throw {code:400,err:"Room not found"};
        }

    }

}

module.exports = md_rooms;