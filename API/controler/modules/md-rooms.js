const Str = require("@supercharge/strings");
const Room = require("../../models/rooms");
const User = require("../../models/user");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

    /*
        let room_form = {
            room_id : room.roomId,
            id_user_1 : room.player_1_id,
            id_user_2 : room.player_2_id,
            score_1 : room.score[0],
            score_2 : room.score[1],
            winner_id : the_winner_id
        } 
    */
    async EndRoom(room_form){

        try {
            if(!this.CheckObj(room_form,["room_id","id_user_1","id_user_2","score_1","score_2","winner_id"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }


        try {
            
            console.log("End room : "+room_form.room_id);

            //save room_form in database
            let new_room = Room.build({
                room_id : room_form.room_id,
                id_user_1 : room_form.id_user_1,
                id_user_2 : room_form.id_user_2,
                score_1 : room_form.score_1,
                score_2 : room_form.score_2,
                winner_id : room_form.winner_id,
            });
            //save it to database (nothing happens if it already exists)
            await new_room.save()

            this.rooms.delete(room_form.room_id);

            return true;
        } catch (error) {
            throw {code:400,err:"Room not found"};
        }

    },


    async GetGameHistory(userId){
        //sequelize -> find all rooms where user is player_1 or player_2
        let rooms = await Room.findAll({where:{[Op.or]:[{id_user_1:userId},{id_user_2:userId}]}}).then(rooms => {
            return rooms;
        });

        //for each room, get user_1 and user_2 names
        let rooms_with_names = [];
        for(let i = 0; i < rooms.length; i++){
            
            let room = rooms[i];
            let user_1 = await User.findOne({where:{id:room.id_user_1}}).then(user => {
                return user.name;
            });
            let user_2 = await User.findOne({where:{id:room.id_user_2}}).then(user => {
                return user.name;
            });

            if(room.id_user_1 == room.winner_id){
                room.winner_name = user_1;
            }else{
                room.winner_name = user_2;
            }

            //if score = 14 -> set score to 0
            if(room.score_1 == 14){
                room.score_1 = 0;
            }
            if(room.score_2 == 14){
                room.score_2 = 0;
            }

            rooms_with_names.push({
                room_id : room.room_id,
                user_1  : user_1,
                user_2  : user_2,
                score_1 : room.score_1,
                score_2 : room.score_2,
                winner  : room.winner_name,
                date    : room.createdAt
            });

        }

        return rooms_with_names;
    }

}

module.exports = md_rooms;