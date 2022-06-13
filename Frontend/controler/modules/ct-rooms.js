const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



const ct_rooms = {
    
    async GetRooms(){
    
        const url = "http://127.0.0.1:3001"

        const response = await fetch(url+"/rooms/",{
            method:     "get",
        });

        const data = await response.json();

        return data;
    },

    async CreateRooms(room_form){

        const url = "http://127.0.0.1:3001"

        const response = await fetch(url+"/rooms/add",{
            method:     "post",
            body: JSON.stringify(room_form),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(response.status == 200){
            return data;
        }else{
            throw {"code":response.status,"msg":data}
        }

    },

    async JoinRoom(room_form){
        const url = "http://127.0.0.1:3001"

        const response = await fetch(url+"/rooms/join",{
            method:     "post",
            body: JSON.stringify(room_form),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(response.status == 200){
            return data;
        }else{
            throw {"code":response.status,"msg":data}
        }
    },

    async GetGameHistory(userId){
        const url = "http://127.0.0.1:3001";

        const response = await fetch(url+"/rooms/history/"+userId,{
            method:     "get",
        });

        const data = await response.json(); 
        return data;
    }
    
}

module.exports = ct_rooms;