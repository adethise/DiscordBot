const Command = require('./command')
const YoutubeStream = require('ytdl-core')

module.exports = class Youtube extends Command{
    
    static action(message){
      let args = message.content.split(' ')
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
          //récupère la vidéo youtube
          let stream = YoutubeStream(args[1])
          //si le lien n'est pas bon
          stream.on('error', function(){
              message.reply("Je n'ai pas réussi à lire cette vidéo. :(")
              connection.disconnect()
            })

            //lance le son de la vidéo youtube et a la fin quitte le chan
            connection.playStream(stream).on('end',function(){
              connection.disconnect()
            })
          })
      }
    }
}
