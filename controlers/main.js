const User = require("../models/user");
const GameInfo = require("../models/gameInfo");
const Game = require("../models/game");


class MainController{

    constructor(){
        this.users = new Map();
        this.games = new Map();



        let dummy = new User("Dummy");
        this.users.set(dummy.id,dummy);

        let dummy_game = new Game(dummy)
        this.games.set(dummy_game.id,dummy_game)
    }

    GetGlobalOption(req,target){
        return {
            page:target,
            connected:this.IsUserConnected(req),
            user :this.GetCurrentUser(req),
            games:this.GetGameList()
        }
    }

    GetGameList(){
        let gameList = []
        for (var [id, game] of this.games.entries()) {

            let p1 = game.players[0].displayName;
            let p2 = "";

            if(game.players.count > 1){
                p2 = game.players[1].displayName;
            }

            gameList.push(new GameInfo(p1,p2,game.id));
        }

        return gameList;
    }

    IsUserConnected(req){

        if(req.session.connected)
            return true
        return false
    }

    GetCurrentUser(req){
        if(!req.session.connected)
            return null

        return this.users.get(req.session.userId);
    }

    Connect(username){
        let temp = new User(username)
        console.log("New user : ",temp)
        this.users.set(temp.id,temp);
        return temp.id
    }

    Disconnect(userId){

        console.log("User disconnected : ",this.users.get(userId).displayName);
        this.users.delete(userId);

        //todo remove all current game
    }

    CreateGame(userId){
        let newGame = new Game(this.users.get(userId));

        this.games.set(newGame.id,newGame);
        console.log("New game :",newGame.id," Created by ",this.users.get(userId).displayName);

        return newGame.id
    }

}

module.exports = MainController