const crypto = require("crypto");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


let ctrl_user = {

    HashAndSalt(name,password){

        const sha256Hasher = crypto.createHmac("sha256",name);

        return sha256Hasher.update(password).digest("hex");
    },

    async Register(user_form){


        let user_paylod = {
            name:   user_form.name,
            password : this.HashAndSalt(user_form.name,user_form.password)
        }

        const url = "http://127.0.0.1:3001"

        const response = await fetch(url+"/user/register",{
            method:     "post",
            headers:    { 'Content-Type':'application/json'},
            body: JSON.stringify(user_paylod)
        });

        const data = await response.json();

        try {
            if((data.id != "")&&(data.name==user_form.name)){

                return data
            }
        } catch (error) {
            return false; 
        }
        return false;

    },



    async Login(user_form){
        let user_paylod = {
            name:   user_form.name,
            password : this.HashAndSalt(user_form.name,user_form.password)
        }

        const url = "http://127.0.0.1:3001"

        const response = await fetch(url+"/user/login",{
            method:     "post",
            headers:    { 'Content-Type':'application/json'},
            body: JSON.stringify(user_paylod)
        });

        const data = await response.json();

        try {
            if((data.id != "")&&(data.name==user_form.name)){


                let current_user = {
                    name:data.name,
                    id:data.id,
                    token:data.token
                }

                this.users.set(data.id,current_user);

                return data
            }
        } catch (error) {
            return false; 
        }
        return false;
    },

    async GetFollowedUser(userName,usertoken){
        const url = "http://127.0.0.1:3001";

        let headers = {
            user : userName,
            token : usertoken
        }

        const response = await fetch(url+"/user/followed",{
            method:     "get",
            headers:    headers
        });

        const data = await response.json();

        try {
            if(data.length>0){
                return data;
            }
        } catch (error) {
            return false; 
        }
        return false;
        
    }

}


module.exports = ctrl_user;