const Express = require("express");
const userRouter = Express.Router();

const ctrl = require("../controler/Controler");

userRouter.get("/",(req,res)=>{
    //return a list of all user

    res.json("hello world");

});

userRouter.get("/s/:search",async (req,res)=>{
    //return a list of all user

    if(req.params.search){
        let find_form = {
            name : req.params.search
        };

        let response = await ctrl.FindUser(find_form);

        if(response){
            res.json(response);
        }
    }else{
        res.status(400).json("No parameters");
    }
    
});

userRouter.post("/register",async (req,res) => {

    let user_form = req.body;

    try {
        let response = await ctrl.Register(user_form);

        if(response){
            res.json(response);
        }
        
    } catch (error) {
        res.status(error.code).json(error.err);
    }
 
});

userRouter.post("/login",async (req,res) => {

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

userRouter.post("/follow/",async (req,res)=>{
    let follow_form = req.body;

    try {

        let user_info = {
            name:req.headers.user,
            token:req.headers.token
        }

        let response = await ctrl.Follow(user_info,follow_form);

        if(response){
            res.json(response);
        }
        
    } catch (error) {
        res.status(error.code).json(error.err);
    }
});

userRouter.delete("/follow/",async (req,res)=>{
    let follow_form = req.body;

    try {

        let user_info = {
            name:req.headers.user,
            token:req.headers.token
        }

        let response = await ctrl.UnFollow(user_info,follow_form);

        if(response){
            res.json(response);
        }
        
    } catch (error) {
        res.status(error.code).json(error.err);
    }
});

userRouter.get("/follow/",async (req,res)=>{

    try {

        let user_info = {
            name:req.headers.user,
            token:req.headers.token
        }

        let response = await ctrl.GetFollowedUser(user_info);

        if(response){
            res.json(response);
        }
        
    } catch (error) {
        res.status(error.code).json(error.err);
    }
});

userRouter.get("/posts/:id",async (req,res) => {
    if(req.params.id){
        let find_form = {
            id : req.params.id
        };

        try {
            let response = await ctrl.GetUserPost(find_form);

            res.json(response);
        } catch (error) {
            res.status(error.code).json(error.err);
        }

        
    }else{
        res.status(400).json("No parameters");
    }
});

userRouter.get("/i/:id",async (req,res) => {
    if(req.params.id){
        let find_form = {
            id : req.params.id
        };

        try {
            let response = await ctrl.GetUser(find_form);

            res.json(response);
        } catch (error) {
            res.status(error.code).json(error.err);
        }

        
    }else{
        res.status(400).json("No parameters");
    }
});


let expt = {
    path:"user",
    router:userRouter
}

module.exports = expt;