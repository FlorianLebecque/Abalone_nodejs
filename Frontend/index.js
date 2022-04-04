const Express = require("express");
const sessions = require('express-session');
const app = Express();

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false 
}));

app.use(Express.urlencoded({extended:true}));

app.use(Express.static('public'))

//load router
const fs = require("fs");
fs.readdir("./routers",(err,files)=>{
    if(err)
        throw err;
    
    files.forEach(file => {
        console.log("Loaded router :",file);

        let rt = require("./routers/"+file);
        app.use("/"+rt.path,rt.router);
    });
})


app.listen(3000,()=>{
    console.log("listening on port 3000");
});