const Express = require("express");
const ctrl = require("../controler/Controler");

const MainRouter = Express.Router();


MainRouter.get("/",async (req,res)=>{

    let options = ctrl.GetOption(req);

    console.log(options);

    res.render("index.ejs",info = options);

});

MainRouter.get("/login",(req,res)=>{

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

    let options = ctrl.GetOption(req);
    
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