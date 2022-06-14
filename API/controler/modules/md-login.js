
const User = require("../../models/user");
const Str = require("@supercharge/strings");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
                    return {
                        token:  token_n,
                        id:     user.id,
                        name:   user.name
                    };
                }
                
            }
            throw {code:403,err:"User or password incorrect"};

        }

        throw {code:403,err:"User or password incorrect"};
    },

    async FindUser(find_form){
        try {
            if(!this.CheckObj(find_form,["name"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }


        let users = await User.findAll({attributes:["id","name"],where:{name:{[Op.like]:"%"+find_form.name+"%"}}}).then(data=>{
            return data;
        }).catch(err=>{
            throw {code:500,err:"Internal server error"};
        })

        return users;

    },

    async GetUser(find_form){
        try {
            if(!this.CheckObj(find_form,["id"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }


        let user = await User.findOne({attributes:["id","name","createdAt"],where:{id:find_form.id}}).then(data=>{
            return data;
        }).catch(err=>{
            throw {code:500,err:"Internal server error"};
        })

        if(user){
            return user
        }

        throw {code:404,err:"Not found"};
    }

};

module.exports = users;