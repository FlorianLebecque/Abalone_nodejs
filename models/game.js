const Str = require('@supercharge/strings')


class Game{
    constructor(player){
        this.players = [player]
        this.turn = player.id;
        this.hex = []

        this.id = Str.uuid();
    }
}

module.exports = Game;