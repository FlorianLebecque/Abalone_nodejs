const Express = require("express");
const ctrl = require("../controler/Controler");

const rtUser = Express.Router();


rtUser.post("/register",async (req,res) => {

    try {
        if((req.body.username == "")&&(req.body.pass1 != req.body.pass2)){
            res.redirect("/login");
        }
    } catch (error) {
            res.redirect("/login");
    }

    let user_form = {
        name: req.body.username,
        password: req.body.pass1
    };

    try {
        let response = await ctrl.Register(user_form);

        if(response){
            res.redirect("/");
        }
        
    } catch (error) {
        res.redirect("/login");
    }
 
});

rtUser.post("/login",async (req,res) => {

    let log_form = req.body;

    try {
        let response = await ctrl.Login(log_form);

        if(response){
            //set session

            res.redirect("/");

        }
        
    } catch (error) {
        res.redirect("/login");
    }

});



let exp = {
    path:"user",
    router:rtUser
}

module.exports = exp;