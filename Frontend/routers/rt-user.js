const Express = require("express");
const ctrl = require("../controler/Controler");

const rtUser = Express.Router();



rtUser.post("/register",async (req,res) => {

    try {

        let p1 = req.body.pass1;
        let p2 = req.body.pass2;

        if(p1 != p2){
            res.redirect("/login?i=n");
            return;
        }

        if((req.body.username == "")&&(p1 !== p2)){
            res.redirect("/login?i=n");
            return;
        }
    } catch (error) {
            res.redirect("/login?i=n");
            return;
    }

    let user_form = {
        name: req.body.username,
        password: req.body.pass1
    };

    try {
        let response = await ctrl.Register(user_form);

        if(response != false){
            console.log(response, ' register and logged in')
            req.session.userid = response.id;
            res.redirect("/login?i=o");
        }else{
            res.redirect("/login?i=n");
        }
        
    } catch (error) {
        res.redirect("/login?i=n");
    }
 
});

rtUser.post("/login",async (req,res) => {

    let log_form = {
        name: req.body.username,
        password: req.body.password
    };

    try {
        let response = await ctrl.Login(log_form);

        if(response){
            //set session
            console.log(response, ' logged in')
            req.session.userid = response.id;
            req.session.token = response.token;

            res.redirect("/");

        }else{
            res.redirect("/login?i=n");

        }
        
    } catch (error) {
        res.redirect("/login?i=n");
    }

});

rtUser.get("/disconnect",(req,res)=> {
    req.session.userid = -1;
    req.session.token = -1;

    res.redirect("/");
})


let exp = {
    path:"user",
    router:rtUser
}

module.exports = exp;