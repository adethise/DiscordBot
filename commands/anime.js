const auth = require('../auth.json')
const Command = require('./command')
const parseString = require('xml2js').parseString;
const request = require('request');

module.exports = class anime extends Command{

    static action(message){

      let USER = auth.MAL_USER;
      let PASS = auth.MAL_PASS;
      let rUrl = "https://myanimelist.net/api/anime/search.xml?q=bleach";
      request(rUrl, {'auth': {'user':auth.MAL_USER, 'pass':auth.MAL_PASS, "sendImmediately":false}},
        function (error, response, body) {
          // Do more stuff with 'body' here
          message.reply(response.statusCode);
          if(response.statusCode != 200){message.reply(":("); }
          if (!error && response.statusCode == 200){
              try{
                parseString(body,function(err,result){
                  console.log(result);
                  console.log( Object.keys(result['anime']['entry']).length );
                  console.log(result['anime']['entry'][0]);
                  message.reply(result['anime']['entry'][0]);
                });
              }catch(error){
                  message.reply('ERROR MSH'+error)
              }
          }
        }
      );

    }
}
