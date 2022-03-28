const socket = io()


function connect(uid_,gid_){
    let loginParam = {
        uid:uid_,
        gid:gid_
    }

    socket.emit("join",loginParam);

}