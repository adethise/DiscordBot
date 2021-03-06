const auth = require('./auth.json')
const Discord = require('discord.js')
const bot = new Discord.Client()

let executor = new Map()
//key = commande    value = chemin vers fichier.js
executor.set('>help', require('./commands/list'))
executor.set('>google', require('./commands/google'))
executor.set('>ping', require('./commands/ping'))
executor.set('>yt', require('./commands/youtube'))
executor.set('>s', require('./commands/sound'))
executor.set('>slap', require('./commands/slap'))
executor.set('>image', require('./commands/image'))
executor.set('>belgium', require('./commands/belgium'))
//executor.set('>anime', require('./commands/anime'))  bug?
//executor.set('>stop', require('./commands/stop'))

bot.login(auth.token)

bot.on('ready', function () {
    console.log("Je suis connecté !")
    //bot.user.setAvatar('./avatars/megumin.png')
    bot.user.setActivity('EXPLOSION!').catch(console.error)
})

//verifie que le message n'est pas d'un bot et commence bien par le caractere de commande
bot.on('message', function (message){
    if(!message.author.bot && message.content.startsWith('>')){
        let cmd = executor.get(message.content.split(' ')[0])
        if (cmd === undefined){
          message.reply(">help pour les commandes valides.")
        }else{
          cmd.action(message)
          message.delete()
        }
    }else{
      return
    }
})
