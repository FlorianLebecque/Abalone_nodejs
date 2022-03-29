const Express = require("express");
const ctrl = require("../controler/Controler");

const MainRouter = Express.Router();


MainRouter.get("/",async (req,res)=>{

    res.render("index.ejs");

});



let exp = {
    path:"",
    router:MainRouter
}

module.exports = exp;