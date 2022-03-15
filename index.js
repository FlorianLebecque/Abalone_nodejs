const MainController = require("./controlers/main")

global.controller = new MainController();


const express = require('express');
const session = require("express-session");
const bodyparser = require("body-parser")
const http = require('http');
const router = require("./router.js")
const {Server} = require("socket.io");





const app = express();                  //Web server
app.use(session({
    secret : "hello",
    resave : false,
    saveUninitialized : true
}));
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("./public"))
app.use(express.static("./node_modules/socket.io/client-dist/"))
app.use("/",router)


io = new Server();                //Websocket server
const server = http.createServer(app);

io.on("connection", (socket) => {
    console.log("connected");
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});