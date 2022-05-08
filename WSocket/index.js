const express = require("express");
const app = express();

app.use(express.json())

const http = require("http");

const server = http.createServer(app);

const {Server} = require("socket.io");

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

const ctrl = require("./controler");

io.on("connection", (socket) => {


    const fs = require("fs");
    fs.readdir("./modules",(err,files)=>{
        if(err)
            throw err;
        
        files.forEach(file => {
            //console.log("Loaded modules :",file);

            let md = require("./modules/"+file);
            socket.on(md.event,async (msg) => {
                await md.function(socket,msg);
            });
        });
    })

});


server.listen(3002,() => {
    console.log("Listening on port 3002");
});