const Express = require("express");
const app = Express();

app.use(Express.json());

const db = require("./db");

db.sync();

const ctrl = require("./controler/Controler");




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