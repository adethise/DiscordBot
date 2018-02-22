const Command = require('./command')

module.exports = class Google extends Command{

    static action(message){
        let args = message.content.split(' ')
        args.shift()
        message.delete()
        message.reply('https://www.google.be#q=' + args.join('%20'))
    }
}
