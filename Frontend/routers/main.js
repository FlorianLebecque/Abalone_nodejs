const Express = require("express");
const ctrl = require("../controler/Controler");

const MainRouter = Express.Router();


MainRouter.get("/",async (req,res)=>{

    let options = ctrl.GetOption(req);

    res.render("index.ejs",info = options);

});

MainRouter.get("/login",(req,res)=>{

    let options = ctrl.GetOption(req);

    options["page"] = "login";

    res.render("index.ejs",info = options);


});



let exp = {
    path:"",
    router:MainRouter
}

module.exports = exp;