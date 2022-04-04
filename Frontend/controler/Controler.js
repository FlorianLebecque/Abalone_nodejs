
class Controler{

    constructor(){
        this.users = new Map();

    }


    GetOption(req) {
        let user = this.getCurrentUser(req);

        return {
            user    : user.name,
            id      : user.id,
            page    : "index"
        };
    }

    getCurrentUser(req){
        if(this.users.has(req.session.id)){
            return this.users.get(req.session.id);
        }
        return {name : -1, id : -1};
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