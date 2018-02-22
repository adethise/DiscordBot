const Command = require('./command')

module.exports = class Sound extends Command{
  
  static action(message){
    let args = message.content.split(' ')
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
      case 'sad':
        music = 'titanic.ogg'
        break;
      case 'sad2':
        music = 'sad2.ogg'
        break;
      case 'gay':
        music = 'ahgay.ogg'
        break;
      case '...':
        music = 'cricket.ogg'
        break;
      case 'dun':
        music = 'dundundun.ogg'
        break;
      case 'fail':
        music = 'fail.ogg'
        break;
      case 'heaven':
        music = 'heaven.ogg'
        break;
      case 'kaboom':
        music = 'kaboom.ogg'
        break;
      case 'mlg':
        music = 'mlg.ogg'
        break;
      case 'scream':
        music = 'scream.ogg'
        break;
      case 'slap':
        music = 'slap.ogg'
        break;
      case 'fine':
        music = 'theyaskyou.ogg'
        break;
      case 'toasty':
        music = 'toasty.ogg'
        break;
      default:
        args[1] = undefined
        break;
    }

    //récupère le channel de l'utilisateur qui a envoyé le message
    let voiceChannel = message.member.voiceChannel

    if(voiceChannel === undefined){
      message.reply("Tu n'es pas dans un chan vocal.")
    }

    if(args[1] === undefined){
      message.reply("!help pour les commandes.")
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
