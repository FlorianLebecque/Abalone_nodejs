
class Controler{

    constructor(){

        this.users = new Map();
        this.games = new Map();

    }


    SocketConnection(socket){
        console.log("User connected");
        console.log(this);
    }



}


const fs = require("fs");

fs.readdir("./controler/modules",(err,files)=>{
    if(err)
        throw err;
    
    files.forEach(file => {
        console.log("Loaded controler module :",file);

        let md = require("./modules/"+file);

        Object.assign(Controler.prototype,md);
    });
})

const ctrl = new Controler();

module.exports = ctrl;