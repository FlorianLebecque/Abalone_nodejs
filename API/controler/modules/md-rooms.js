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
                started : false
            }

            this.rooms.set(new_room.id,new_room);


            return new_room;

        }else{
            throw {code:403,err:"Invalid user or token"}; 
        }
    },

    async JoinRoom(room_form){
        let res = await this.checkToken(room_form.player,room_form.token)
        if(res){

            if(this.IsPlayerInRoom(room_form.player)){
                throw {code:403,err:"Player is already in a room"}; 
            }

            let room = this.rooms.get(room_form.roomId);

            room.player_2 = room_form.player

            return room;

        }else{
            throw {code:403,err:"Invalid user or token or room id"}; 
        }
    }

}

module.exports = md_rooms;