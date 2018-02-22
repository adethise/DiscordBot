const Command = require('./command')

module.exports = class List extends Command{
  static match(message){
    return message.content.startsWith('!help')
  }

  static action(message){
    message.author.send("Oi")

  }
}
