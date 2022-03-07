const Str = require('@supercharge/strings')

class User{
    constructor(name){
        this.id = Str.uuid();
        this.name = name;
        this.displayName = name +"#"+this.id.split("-")[0];
    }
}

module.exports = User;