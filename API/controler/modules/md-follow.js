
const Follow = require("../../models/follow");
const Str = require("@supercharge/strings");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const follows = {

    async Follow(user_info,follow_form){

        try {
            if(!this.CheckObj(follow_form,["id"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }

        let usr_id = await this.CheckToken(user_info.name,user_info.token);

        if(!usr_id){
            throw {code:401,err:"Unauthorized"};
        }

        if(usr_id.id == follow_form.id){
            throw {code:403,err:"Can't follow yoursefl"};
        }

        let new_follow = Follow.build({
            id_user_1      :usr_id.id,
            id_user_2      :this.Sanatize(follow_form.id),
        });

        let data = await new_follow.save().then(data => {
            return data;
        }).catch(err=>{

            throw {code:500,err:"Internal server error"};
        });

        if(data){
            return true
        }

        return false;
    },

    async UnFollow(user_info,follow_form){

        try {
            if(!this.CheckObj(follow_form,["id"])){
                throw {code:400,err:"Incomplete forms"};
            }
        } catch (error) {
            throw {code:400,err:"Incomplete forms"};
        }

        let usr_id = await this.CheckToken(user_info.name,user_info.token);

        if(!usr_id){
            throw {code:401,err:"Unauthorized"};
        }

        if(usr_id.id == follow_form.id){
            throw {code:403,err:"Can't unfollow yoursefl"};
        }

        
        let result = await Follow.destroy({where:{[Op.and]:[{id_user_1:usr_id.id},{id_user_2:follow_form.id}]}}).then(data => {
            return data;
        }).catch(err=>{
            throw {code:500,err:"Internal server error"};
        });

        if(result != 0){
            return result;
        }

        throw {code:404,err:"Not found"};
            
    },

    async GetFollowedUser(user_info){
        let usr_id = await this.CheckToken(user_info.name,user_info.token);

        if(!usr_id){
            throw {code:401,err:"Unauthorized"};
        }

        let follows = await Follow.findAll({attributes:["id_user_2"],where:{id_user_1:usr_id.id}}).then(data=>{
            return data;
        }).catch(err=>{
            throw {code:500,err:"Internal server error"};
        })

        //for each followed user, get the user info
        let users = [];
        for(let i = 0; i < follows.length; i++){
            let user = await this.GetUser({id:follows[i].id_user_2});
            users.push(user);
        }


        return users;
    }    


};

module.exports = follows;