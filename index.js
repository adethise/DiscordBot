const auth = require('./auth.json')
const Discord = require('discord.js')
const bot = new Discord.Client()
const List = require('./commands/list')
const Google = require('./commands/google')
const Ping = require('./commands/ping')
const Youtube = require('./commands/youtube')
const Sound = require('./commands/sound')


bot.login(auth.token)

bot.on('ready', function () {
    console.log("Je suis connecté !")
    //bot.user.setAvatar('./avatars/megumin.png')
    bot.user.setActivity('EXPLOSION!').catch(console.error)
})

bot.on('message', function (message){
    let commandUsed =
       List.parse(message)
    || Google.parse(message)
    || Youtube.parse(message)
    || Ping.parse(message)
    || Sound.parse(message)
})
