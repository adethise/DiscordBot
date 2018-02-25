const auth = require('../auth.json')
const Command = require('./command')
const malScraper = require('mal-scraper')
module.exports = class anime extends Command{

    static async action(message){
      var args = message.content.split(' ')
      args.splice(args,1);
      let name = args.join(' ');

      var data;
    try{
       data = await malScraper.getResultsFromSearch(name);
       let len = Object.keys(data).length;
       var msg = '``` \n';
       for( var i = 0 ; i < len ; i++ ){
         msg = msg +'['+i+'] '+data[i]['name'] + '\n';
       }
       msg = msg + '```';
      message.reply(msg);
    }catch(error){
        console.log(error);
      }



    }
}
