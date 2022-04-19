
class Controler{

    constructor(){
        this.users = new Map();

    }


    GetOption(req) {
        let current_user = this.getCurrentUser(req);

        return {
            user    : current_user.name,
            id      : current_user.id,
            page    : "index"
        };
    }

    getCurrentUser(req){
        if(this.users.has(req.session.userid)){
            return this.users.get(req.session.userid);
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