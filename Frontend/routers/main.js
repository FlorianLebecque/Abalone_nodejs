const Express = require("express");
const ctrl = require("../controler/Controler");

const MainRouter = Express.Router();


MainRouter.get("/",async (req,res)=>{

    let options = ctrl.GetOption(req);

    let rooms = await ctrl.GetRooms();

    if(req.query.code){
        options["code"] = req.query.code;
    }
    if(req.query.msg){
        options["msg"]  = req.query.msg;
    }

    options["rooms"] = rooms;

    res.render("index.ejs",info = options);

});

MainRouter.get("/history",async (req,res)=>{
    let options = ctrl.GetOption(req);

    if(req.query.code){
        options["code"] = req.query.code;
    }
    if(req.query.msg){
        options["msg"]  = req.query.msg;
    }

    options["page"] = "history";
    
    let gamehistory = await ctrl.GetGameHistory(req.session.userid);
    options["gamehistory"] = gamehistory;

    res.render("index.ejs",info = options);
});

MainRouter.get("/followed",async (req,res)=>{
    let options = ctrl.GetOption(req);

    if(req.query.code){
        options["code"] = req.query.code;
    }
    if(req.query.msg){
        options["msg"]  = req.query.msg;
    }

    options["page"] = "followed";

    let followed_user = await ctrl.GetFollowedUser(ctrl.getCurrentUser(req).name,req.session.token);
    options["followed_user"] = followed_user;

    res.render("index.ejs",info = options);
});

MainRouter.get("/login",(req,res)=>{

    let options = ctrl.GetOption(req);


    if(req.query.code){
        options["code"] = req.query.code;
    }
    if(req.query.msg){
        options["msg"]  = req.query.msg;
    }

    let log_info = 0;
    switch(req.query.i){
        case "o":
            log_info = 1;
            break;
        case "n":
            log_info = 2;
            break;
        default:
            log_info = 0;
            break;
    }

    options["page"] = "login";
    options["log_info"] = log_info;

    console.log(options);

    res.render("index.ejs",info = options);
});



let exp = {
    path:"",
    router:MainRouter
}

module.exports = exp;