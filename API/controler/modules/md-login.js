
const User = require("../../models/user");
const Str = require("@supercharge/strings");


const users = {

    async Register(user_form){

        try {
            if(!this.CheckObj(user_form,["name","password"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }

        let new_user = User.build({
            id          :Str.uuid(),
            name        :this.Sanatize(user_form.name),
            password   :this.Sanatize(user_form.password),
        });

        let data = await new_user.save().then(data => {
            return data;
        }).catch(err=>{

            if(err.errors[0].type == "unique violation"){
                throw {code:403,err:"Name must be unique"};
            }

            throw {code:500,err:"Internal server error"};
        });

        let user_info = {
            id:data.id,
            name:data.name
        };

        return user_info;
    },

    async Login(log_form){

        try {
            if(!this.CheckObj(log_form,["name","password"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }

        let user = await User.findOne({where:{name:log_form.name}}).then(data=>{
            return data;
        }).catch(err=>{
            throw {code:500,err:"Internal server error"};
        })

        if(user){
            
            if(user.password === log_form.password){

                let token_n = Str.uuid();

                let result = await User.update({token:token_n},{where:{id:user.id}}).then(data => {
                    return data;
                }).catch(err=>{
                    throw {code:500,err:"Internal server error"};
                });

                if(result){
                    return token_n;
                }
                
            }
            throw {code:400,err:"User or password incorrect"};

        }

        throw {code:400,err:"User or password incorrect"};
    }

};

module.exports = users;