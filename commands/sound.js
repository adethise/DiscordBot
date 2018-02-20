const Command = require('./command')

module.exports = class Sound extends Command{
  static match(message){
    return message.content.startsWith('.')
  }

  static action(message){
    let args = message.content.split('.')
    let music = null

    switch (args[1]) {
      case 'cena':
        music = 'cena.ogg'
        break;
      case 'click':
        music = 'click2.mp3'
        break;
      case 'notknowdawae':
        music = 'doesntknowtheway.mp3'
        break;
      case 'doyouknowdawae':
        music = 'doyouknowtheway.mp3'
        break;
      case 'itai':
        music = 'itai.ogg'
        break;
      case 'n':
        music = 'n.ogg'
        break;
      case 'nani':
        music = 'nani.ogg'
        break;
      case 'chomosuke':
        music = 'ripchomusuke.ogg'
        break;
      case 'teachdawae':
        music = 'teachutheway.mp3'
        break;
      default:
        break;
    }

    //récupère le channel de l'utilisateur qui a envoyé le message
    let voiceChannel = message.member.voiceChannel

    if(voiceChannel === undefined){
      message.reply("Tu n'es pas dans un chan vocal.")
    }
    else{
      //join le channel de ce connard.
      voiceChannel
      .join()
      .then(function (connection){
        connection.playFile('./sounds/' + music).on('end', function(){
          connection.disconnect()
        })

        stream.on('error', function(){
            message.reply("Je n'ai pas réussi à lire cette vidéo. :(")
            connection.disconnect()
        })
      })
    }
  }
}
