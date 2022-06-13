
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
        window.location.href = "/?code=400&msg=room not found"
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

socket.on("end",(data)=>{
    state = 2;
});

socket.on("played",(data) => {
    updateHex(data.board);
    cur_teamPlay = data.turn;
    score = data.score;
});

function sendGame(hex){
    let current_url = window.location.href;
    let params = current_url.split("/");
    
    socket.emit("play",{
        roomId: params[params.length - 1],
        board  : convertHex(hex)
    });
}

function convertHex(hex){
    let int_array = [];
    hex.forEach(row => {
        let int_row = [];
        row.forEach(hexa =>{
            int_row.push(hexa.team);
        })
        int_array.push(int_row);
    })

    return int_array;
}

function updateHex(gameArray){
    let i = 0;
    hex.forEach(row => {
        let j = 0;
        row.forEach(hexa =>{
            hexa.team = gameArray[i][j];
            j++
        })
        i++;
    });
}

document.querySelector('.js-form')?.addEventListener('submit', e => {
    e.preventDefault();

    let box = document.getElementById("msg_box");
    
    let new_msg = "<div class='msg-y'>"+e.currentTarget.myText.value+"</div>";

    box.innerHTML += new_msg;

    socket.emit("msg",e.currentTarget.myText.value);

    e.currentTarget.myText.value = "";
});