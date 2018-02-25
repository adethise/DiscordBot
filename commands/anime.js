const Command = require('./command')
const Discord = require('discord.js')
const malScraper = require('mal-scraper')
module.exports = class anime extends Command{

    static async action(message){
      function resultReader(result){
        //console.log(result);
        const embed = new Discord.RichEmbed()
        .setTitle(result['title'])
        .setDescription(result['synopsis'])
        .setThumbnail(result['picture'])
        .addField('Status',result['status']+' Aired: '+result['aired'])
        .addField('Episodes',result['episodes'])
        .addField('Genres',result['genres'].join(' '))
        .addField('Score',result['score']+' '+result['scoreStats'])
        .setColor(0x00AE86)
        message.channel.send({embed});
      }
      var args = message.content.split(' ')
      if( args[1] === undefined){
        message.channel.send('Baaaaakaaaaaa !! Tu as oublié de préciser ta recherche !');
        return;
      }
      args.shift();
      let name = args.join(' ');
      var data,entry;
    try{
       data = await malScraper.getResultsFromSearch(name);
       let len = Object.keys(data).length;
       var msg = 'Chomosuke a trouvé plusieurs animes ! Entres le numéro correspondant à celui que tu cherches ! \n```';
       for( var i = 0 ; i < len ; i++ ){
         msg = msg +'['+i+'] '+data[i]['name'] + '\n';
       }
       msg = msg + '```';
      message.channel.send(msg);
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', async function(message){
            entry = parseInt(message.content);
            if( !Number.isInteger(entry) || entry < 0 || entry > 9  ){
              message.channel.send('Niiiiaaaaarrrkkkk ! Chomosuke ne te comprends pas ! Mets juste le chiffre correspondant la prochaine fois.');
              return;
            }
            try{
              //console.log(data[entry]['name']);
            const result = await malScraper.getInfoFromName(data[entry]['name']);
            resultReader(result);
          }catch(error){
            console.log(error);
            return;
          }
        })
    }catch(error){
        console.log(error);
        return;
    }
    }

}
