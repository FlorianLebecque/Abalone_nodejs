
const User = require("../models/user");


class Controler{

    constructor(){
        this.rooms = new Map();

    }

    Modules(){
        console.log(Object.getOwnPropertyNames(this).filter(item=> typeof this[item] ==="function"));
    }

    Sanatize(str,type="text"){
        return str;
    }

    CheckObj(obj,key_array){
        return key_array.every(function(val) { return Object.keys(obj).indexOf(val) >= 0; })
    }

    async checkToken(username,usr_token){

        let user = await User.findOne({where:{name:username,token:usr_token}}).then(data=>{
            return data;
        }).catch(err=>{
            throw {code:403,err:"Bad user or token"};
        })

        return user;
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