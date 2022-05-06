const Express = require("express");
const ctrl = require("../controler/Controler");

const rtRoom = Express.Router();



rtRoom.get("/add",async (req,res) => {

    try {

        let current_user = ctrl.getCurrentUser(req);

        let room_form = {
            "player":current_user.name,
            "token" :current_user.token,
        }

        let response = await ctrl.CreateRooms(room_form);

        if(response){
            res.redirect("/rooms/"+response.id);
        }
        
    } catch (error) {
        res.redirect("/?code="+error.code+"&msg="+error.msg);
    }
 
});

rtRoom.get("/join/:id",async (req,res) => {

    try {

        let current_user = ctrl.getCurrentUser(req);

        let room_form = {
            "roomId": req.params.id,
            "player":current_user.name,
            "token" :current_user.token,
        }

        let response = await ctrl.JoinRoom(room_form);

        if(response){
            res.redirect("/rooms/"+response.id);
        }
        
    } catch (error) {
        res.redirect("/?code="+error.code+"&msg="+error.msg);
    }

});

rtRoom.get("/:id",async (req,res)=>{

    let options = ctrl.GetOption(req);
    
    options["page"] = "game";

    console.log(options);


    res.render("index.ejs",info = options);

});

let exp = {
    path:"rooms",
    router:rtRoom
}

module.exports = exp;