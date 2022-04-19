const Express = require("express");
const roomRoute = Express.Router();

const ctrl = require("../controler/Controler");

roomRoute.get("/",(req,res)=>{
    
    let rooms = ctrl.GetRoomList();

    res.json(rooms);
})


roomRoute.post("/add",async (req,res) => {

    let room_form = {
        player  : req.body.player,
        token   : req.body.token
    };

    try {
        let response = await ctrl.CreateRoom(room_form);

        if(response){
            res.json(response);
        }
        
    } catch (error) {
        res.status(error.code).json(error.err);
    }
 
});

roomRoute.post("/join",async (req,res) => {

    let log_form = req.body;

    try {
        let response = await ctrl.Login(log_form);

        if(response){
            res.json(response);
        }
        
    } catch (error) {
        res.status(error.code).json(error.err);
    }

});


let expt = {
    path:"rooms",
    router:roomRoute
}

module.exports = expt;