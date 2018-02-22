const Command = require('./command')

module.exports = class Ping extends Command{
    
    static action(message){
        message.reply('pong')
    }
}
