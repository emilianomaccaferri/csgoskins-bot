console.log("\n\n****** CSGOSkinsBot initiating...\n\n");

const nodeogram = require("nodeogram");
const utils = require("./lib/utils");
const fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json", "utf8"));

var weaponURL = null;
var knifeURL = null;
var caseURL = null;
var cArgs = null;
var date = new Date();

bot = new nodeogram.Bot(config.key);

bot.init();

console.log("+ Bot started.");

bot.command("start", "Starts the bot",false, (args, message) => {

      message.reply("<b>== Welcome to CSGOSkinsBot ==</b>\nI rewrote this bot in NodeJS, so it can be faster.\nI'm currently using <a href='https://github.com/ALCC01/nodeogram'>nodeogram</a> as Telegram NodeJS library, but I will write my own soon!\n\n<b>Available commands:</b>\n/weapon => Fetches a weapon\n/knife => Fetches a knife\n/case => Fetches a case\n\n Enjoy!", {parse_mode: "HTML"});

    });

    bot.command("info", "Informations about the bot", (args, message) => {

      message.reply(
"<b>Bot developed by @GeneralApathy</b>\n" +
"Feel free to contact me for any questions about the bot.\n"+
"<a href='https://github.com/GeneralApathy/csgoskins-bot'> Source code </a>\n" +
"\n Enjoy!"

, {parse_mode: "HTML"});

    });

bot.command("weapon", "Fetches a weapon", false, (args, message) => {

  cArgs = args.toString().replace(/,/g, " "); //.replace(/,/g, "%20").replace("(", "%28").replace(")", "%29").replace("|", "%7C");
  weaponURL = "http://steamcommunity.com/market/listings/730/"+encodeURI(cArgs)+"/render?start=0&count=1&currency=3&language=english&format=json";
  priceURL = "http://steamcommunity.com/market/priceoverview/?country=IT&currency=3&appid=730&market_hash_name="+encodeURI(cArgs);

  if(cArgs == ""){

    message.reply("Are you searching for 'nothing'?");
    console.log("\t+ "+ message.from.username+" searched for 'nothing' because he's a funny guy.");
    return false;

  }

  console.log("\n\t\t---- BEGINNING REQUEST TO STEAM API ----");
  console.log("\t+ Sender: " + message.from.username);
  console.log("\t+ Date: " + date);

  utils.getWeapon(weaponURL, function(err, json){
    console.log("\t+ Downloading weapon infos from SteamAPI...");
    if(err){

      console.log("\tShit, an error while parsing the weapon json response!\n" + err);
      //console.log(err);
      return false;

      }

      global.name = json.name;
      global.count = json.total_count;
      global.id = json.id;
      global.icon = json.icon;
      global.description = json.description;
      global.collection = json.collection;

    });

    utils.getPrice(priceURL, function(err, json){
      console.log("\t+ Requesting URL:" + weaponURL);
      console.log("\t+ Downloading price infos from SteamAPI...");

      if(err){

        console.log("\tShit, an error while parsing the price json response!\n" + err);
        //console.log(err);
        return false;

      }

      global.price = json.median_price;

    });

    console.log("\t+ Done!");

    setTimeout(function(){

      if(global.name == undefined){

        console.log("\t+ The weapon entered isn't available on Steam Market. RIP");

        message.reply("This weapon isn't available in the market."+
  "\n<b>Fill in with the weapon exact market's name.</b>"+
  "\ne.g: /weapon AWP | Asiimov (Field-Tested)", {parse_mode: "HTML"});

      console.log("\t\t---- ENDING (bad) REQUEST TO STEAM API ----\n");

  return false;

      }

      console.log("\t+ Weapon searched: " + global.name);
      console.log("\t+ Weapon collection: " + global.collection);
      console.log("\t+ Weapon available! Sending...");
    message.reply(

"<b>+ " + global.name + " - " + global.collection + " +</b>"+
"\n\n " + global.description + "\n\n" +
"<b>- Weapon ID:</b> " + global.id +
"\n<b>- Total count:</b> " + global.count +
"\n<b>- Median price:</b> " + global.price +
"\n\n<a href='http://cdn.steamcommunity.com/economy/image/"+global.icon+"'>Generated image</a>"

, {parse_mode: "HTML"});
console.log("\t\t---- ENDING REQUEST TO STEAM API ----\n");
  },1000);

  delete global.name;
  delete global.id;
  delete global.count;
  delete global.price;
  delete global.icon;
  delete global.collection;
  delete global.description;

});

bot.command("knife", "Fetches a knife", false, (args, message) => {

  cArgs = args.toString().replace(/,/g, " "); //.replace(/,/g, "%20").replace("(", "%28").replace(")", "%29").replace("|", "%7C");
  knifeURL = "http://steamcommunity.com/market/listings/730/%E2%98%85%20"+encodeURI(cArgs)+"/render?start=0&count=1&currency=3&language=english&format=json";
  priceURL = "http://steamcommunity.com/market/priceoverview/?country=IT&currency=3&appid=730&market_hash_name=%E2%98%85%20"+encodeURI(cArgs);

  if(cArgs == ""){

    message.reply("Are you searching for 'nothing'?");
    console.log("\t+ "+ message.from.username+" searched for 'nothing' because he's a funny guy.");
    return false;

  }

  console.log("\n\t\t---- BEGINNING REQUEST TO STEAM API ----");
  console.log("\t+ Sender: " + message.from.username);
  console.log("\t+ Date: " + date);

  utils.getKnife(knifeURL, function(err, json){
    console.log("\t+ Requesting URL:" + knifeURL);
    console.log("\t+ Downloading weapon infos from SteamAPI...");
    if(err){

      console.log("\tShit, an error while parsing the weapon json response!\n" + err);
      //console.log(err);
      return false;

      }
      global.name = json.name;
      global.count = json.total_count;
      global.id = json.id;
      global.icon = json.icon;

    });

    utils.getPrice(priceURL, function(err, json){
      console.log("\t+ Downloading price infos from SteamAPI...");

      if(err){

        console.log("\tShit, an error while parsing the price json response!\n" + err);
        //console.log(err);
        return false;

      }

      global.price = json.median_price;

    });

    console.log("\t+ Done!");

    setTimeout(function(){

      if(global.name == undefined){

        console.log("\t+ The knife entered isn't available on Steam Market. RIP");

        message.reply("This knife isn't available in the market."+
  "\n<b>Fill in with the weapon exact market's name.</b>"+
  "\ne.g: /knife Karambit | Blue Steel (Field-Tested)", {parse_mode: "HTML"});

      console.log("\t\t---- ENDING (bad) REQUEST TO STEAM API ----\n");

  return false;

      }

      console.log("\t+ Knife searched: " + global.name);
      console.log("\t+ Weapon available! Sending...");
    message.reply(

"<b>+ " + global.name + " +</b>"+
"\n\n<b>- Knife ID:</b> " + global.id +
"\n<b>- Total count:</b> " + global.count +
"\n<b>- Median price:</b> " + global.price +
"\n\n<a href='http://cdn.steamcommunity.com/economy/image/"+global.icon+"'>Generated image</a>"

, {parse_mode: "HTML"});
console.log("\t\t---- ENDING REQUEST TO STEAM API ----\n");
  },1000);

  delete global.name;
  delete global.id;
  delete global.count;
  delete global.price;
  delete global.icon;

});

bot.command("case", "Fetches a case", false, (args, message) => {

  cArgs = args.toString().replace(/,/g, " "); //.replace(/,/g, "%20").replace("(", "%28").replace(")", "%29").replace("|", "%7C");
  caseURL = "http://steamcommunity.com/market/listings/730/"+encodeURI(cArgs)+"/render?start=0&count=1&currency=3&language=english&format=json";
  priceURL = "http://steamcommunity.com/market/priceoverview/?country=IT&currency=3&appid=730&market_hash_name="+encodeURI(cArgs);

  if(cArgs == ""){

    message.reply("Are you searching for 'nothing'?");
    console.log("\t+ "+ message.from.username+" searched for 'nothing' because he's a funny guy.");
    return false;

  }

  console.log("\n\t\t---- BEGINNING REQUEST TO STEAM API ----");
  console.log("\t+ Sender: " + message.from.username);
  console.log("\t+ Date: " + date);

  utils.getCase(caseURL, function(err, json){
    console.log("\t+ Requesting URL:" + caseURL);
    console.log("\t+ Downloading weapon infos from SteamAPI...");
    if(err){

      console.log("\tShit, an error while parsing the weapon json response!\n" + err);
      //console.log(err);
      return false;

      }
      global.name = json.name;
      global.count = json.total_count;
      global.id = json.id;
      global.icon = json.icon;
      global.items = json.items;

      utils.getPrice(priceURL, function(err, json){
        console.log("\t+ Downloading price infos from SteamAPI...");

        if(err){

          console.log("\tShit, an error while parsing the price json response!\n" + err);
          //console.log(err);
          return false;

        }

        global.price = json.median_price;

      });

    });



    console.log("\t+ Done!");

    setTimeout(function(){

      if(global.name == undefined){

        console.log("\t+ The case entered isn't available on Steam Market. RIP");

        message.reply("This case isn't available in the market."+
  "\n<b>Fill in with the weapon exact market's name.</b>"+
  "\ne.g: /case Chroma 3 Case", {parse_mode: "HTML"});

      console.log("\t\t---- ENDING (bad) REQUEST TO STEAM API ----\n");

  return false;

      }

      console.log("\t+ Case searched: " + global.name);
      console.log("\t+ Case available! Sending...");

      var n = global.items.length;
      var caseWeapons = [];
      for(var k = 0; k<n; k++){

        //console.log("\t+ " +global.items[k]["value"]);
        caseWeapons.push(global.items[k]["value"]);

      }

      var weps = caseWeapons.toString().replace(/,/g, "\n");

    message.reply(

"<b>+ " + global.name + " +</b>\n"+
weps +
"\n\n<b>- Case ID:</b> " + global.id +
"\n<b>- Median price:</b> " + global.price +
"\n\n<a href='http://cdn.steamcommunity.com/economy/image/"+global.icon+"'>Generated image</a>"

, {parse_mode: "HTML"});
console.log("\t\t---- ENDING REQUEST TO STEAM API ----\n");
  },1000);

  delete global.name;
  delete global.id;
  delete global.price;
  delete global.icon;
  delete global.items;

});
