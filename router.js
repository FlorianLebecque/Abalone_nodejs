let express = require("express")
let mainRouter = express.Router();

const User = require("./models/user")

mc = global.controller

function Show(res,option){
    res.render("index.ejs",opt = option)
}


mainRouter.get("/",(req,res) => {

    Show(res,mc.GetGlobalOption(req,"main"));
});

mainRouter.get("/game/:id",(req,res) => {
    let option = mc.GetGlobalOption(req,"game");
    option["gid"] = req.params.id
    Show(res,option);
});

mainRouter.get("/login",(req,res) => {

    Show(res,mc.GetGlobalOption(req,"login"));

});

mainRouter.post("/b/login",(req,res) => {
    let username = req.body["username"];

    let id = mc.Connect(username)

    req.session.userId = id;
    req.session.connected = true;

    res.redirect("/");
});

mainRouter.get("/disconnect",(req,res) => {

    if(!req.session.connected)
        res.sendStatus(500)

    let id = req.session.userId;
    mc.Disconnect(id);

    req.session.userId = -1;
    req.session.connected = false;

    res.redirect("/");
});


mainRouter.get("/new",(req,res)=> {

    if(!req.session.connected){
        res.redirect("/login");
        return
    }   

    let gameId = mc.CreateGame(req.session.userId);

    res.redirect("/game/"+gameId);

});

module.exports = mainRouter;