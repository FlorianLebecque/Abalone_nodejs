const io = global.io;
const mc = global.controller;

io.on("connection", (socket) => {
    console.log("connected");


    socket.on("join",(requestInfo) => {
        console.log(requestInfo);
    })


});


