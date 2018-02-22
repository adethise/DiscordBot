const Command = require('./command');
const commandList = require('../commandList.json');

module.exports = class List extends Command{
    static match(message){
        return message.content.startsWith('!help');
    }

    static action(message){
        var opt = JSON.parse(JSON.stringify(commandList));
        var data = "```\n";
          for(var i = 0, l = opt.length; i < l; i++){
            data += opt[i]["Commande"] + " - " +  opt[i]["Description"] + "\n"
          }
        data += "```";
        message.author.send("Voici la liste des commandes: \n====================" + data);
    }
}
