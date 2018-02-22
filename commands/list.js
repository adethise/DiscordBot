const Command = require('./command')
const commandList = require('../commandList.json')

module.exports = class List extends Command{
    static match(message){
        return message.content.startsWith('!help')
    }

    static action(message){
        var json = JSON.parse(commandList)
        console.log(json)
        message.author.send("Voici la liste des commandes:")
        message.author.send()
    }
}
