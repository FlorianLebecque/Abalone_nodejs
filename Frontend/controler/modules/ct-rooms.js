const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



const ct_rooms = {
    
    async GetRooms(){
    
        const url = "http://127.0.0.1:3001"

        const response = await fetch(url+"/rooms/",{
            method:     "get",
        });

        const data = await response.json();

        return data;
    }
    
}

module.exports = ct_rooms;