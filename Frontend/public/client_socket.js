
 window.location.href

let socket = io.connect(window.location.hostname+":3002");

socket.on('connect',(data) => {

    let current_url = window.location.href;

    let params = current_url.split("/");

    user.roomId = params[params.length - 1]

    socket.emit("start_room",user);
});

socket.on("start_room",(data)=>{
    console.log(data);

    if(data.code != 200){
        //window.location.href = "/?code=400&msg=room not found"
    }

});

socket.on("new_message",(data)=>{
    let box = document.getElementById("msg_box");
    
    let new_msg = "<div class='msg'>"+data+"</div>";

    box.innerHTML += new_msg;

});

socket.on("start_game", (data) =>{

    your_turn = data.turn;
    player_1 = data.player_1;
    player_2 = data.player_2;
    state = 1;

});

document.querySelector('.js-form')?.addEventListener('submit', e => {
    e.preventDefault();

    let box = document.getElementById("msg_box");
    
    let new_msg = "<div class='msg-y'>"+e.currentTarget.myText.value+"</div>";

    box.innerHTML += new_msg;

    socket.emit("msg",e.currentTarget.myText.value);

    e.currentTarget.myText.value = "";
});