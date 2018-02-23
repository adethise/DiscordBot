const Command = require('./command');

module.exports = class Slap extends Command{

  static action(message){
    if(message.mentions.members.first() != undefined){
      let voiceChannel = message.mentions.members.first().voiceChannel
      let server = message.guild
      let idSpace = ('349532519030587394')
      let victim = message.mentions.members.first().id

      if(voiceChannel === undefined){
        message.reply("Je ne peux exploser quelqu'un qui n'est pas là :(")
      }

      else{
        message.channel.send('EXPLOOOOSION!')
        server.members.get(victim).setVoiceChannel(idSpace)
      }
    }
    else{
      message.reply("Qui c'est celui la?")
    }
  }
}
