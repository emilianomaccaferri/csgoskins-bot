<?php

require 'libs/utils.class.php';
require 'libs/logging.class.php';
$utils = new Utils();
$logging = new Logging();

$url = "https://api.telegram.org/botNOKEYFORYOU";
$content = file_get_contents("php://input");
$content = json_decode($content, true);

$chatid = $content["message"]["chat"]["id"];
$username = $content["message"]["chat"]["username"];
$message = $content["message"]["text"];

$weaponURL = null;
$priceURL = null;
$insert = null;

if(0 === strpos($message, '/info') || 0 === strpos($message, '/info@csgoskins_bot')){

  $time = microtime(true);

  $utils->send("Developed and currently hosted by @GeneralApathy.\nThis bot fetches data from CSGO's Steam Market.", $chatid, $url);
  $logging->logEvent($message, $time, $username, $chatid);

}

if(0 === strpos($message, '/help') || 0 === strpos($message, '/help@csgoskins_bot')){

  $time = microtime(true);

  $utils->send("<b> == Help == </b>\n/knife -> Fetches a knife\n/weapon -> Fetches a weapon\n/info -> Credits & Source code", $chatid, $url);
  $logging->logEvent($message, $time, $username, $chatid);

}

if(0 === strpos($message, '/start') || 0 === strpos($message, '/start@csgoskins_bot')){

  $time = microtime(true);

  $utils->send("Just a bot I've been working on for a day, it fetches data from CSGO market.\nI'll add features in the future.\n/knife -> Fetch a knife\n/weapon -> Fetch a weapon\n/info -> Credits", $chatid, $url);
  $logging->logEvent($message, $time, $username, $chatid);

}

if (0 === strpos($message, '/weapon') || 0 === strpos($message, '/weapon@csgoskins_bot')) {

  $time = microtime(true);

  $insert = substr($message, strpos($message, "/weapon") + 8);

    if(strpos($message, '@csgoskins_bot') !== false){
      $insert = substr($message, strpos($message, "/weapon@csgoskins_bot") + 22);
    }

  $weaponURL = json_decode(file_get_contents("http://steamcommunity.com/market/listings/730/".rawurlencode($insert)."/render?start=0&count=1&currency=3&language=english&format=json"),true);
  $priceURL = json_decode(file_get_contents("http://steamcommunity.com/market/priceoverview/?country=IT&currency=3&appid=730&market_hash_name=".rawurlencode($insert)), true);
  $response = $utils->getWeapon($weaponURL, $priceURL);

  if($weaponURL["total_count"] == 0){

    $utils->send("<b>Error!</b>\nThis weapon doesn't exist\n<b>Example of correct syntax</b>: /weapon AWP | Asiimov (Field-Tested)\n<b>Remember to fill in with the exact item's market name.</b>", $chatid, $url);
    die();

  }
  $image = $response["icon_url"];
  $price = $response["median_price"];
  $id = $response["id"];
  $total = $response["total"];
  $coll = $response["collection"];
  $wName = $response["weapon_name"];

$utils->send("<b> == $wName - $coll == </b>

".

$response["description"]

  .
"

Total count: <b>$total</b>\n
Weapon ID: <b>$id</b>
Median price: <b>$price</b>


<a href='http://cdn.steamcommunity.com/economy/image/$image'>Image</a>", $chatid, $url);

$logging->logEvent($message, $time, $username, $chatid);


}


if (0 === strpos($message, '/knife')) {

  $time = microtime(true);

  $insert = substr($message, strpos($message, "/knife") + 7);

    if(strpos($message, '@csgoskins_bot') !== false){
      $insert = substr($message, strpos($message, "/knife@csgoskins_bot") + 21);
    }


  $weaponURL = json_decode(file_get_contents("http://steamcommunity.com/market/listings/730/%E2%98%85%20".rawurlencode($insert)."/render?start=0&count=1&currency=3&language=english&format=json"),true);
  $priceURL = json_decode(file_get_contents("http://steamcommunity.com/market/priceoverview/?country=IT&currency=3&appid=730&market_hash_name=%E2%98%85%20".rawurlencode($insert)), true);
  $response = $utils->getWeapon($weaponURL, $priceURL);
  if($weaponURL["total_count"] == 0){

    $utils->send("<b>Error!</b>\nThis knife doesn't exist\n<b>Example of correct syntax</b>: /knife Karambit | Blue Steel (Field-Tested)\n<b>Remember to fill in with the exact item's market name.</b>", $chatid, $url);
    die();

  }
  $image = $response["icon_url"];
  $price = $response["median_price"];
  $id = $response["id"];
  $total = $response["total"];
  $coll = $response["collection"];
  $wName = $response["weapon_name"];

$utils->send("<b> == $wName == </b>

".

$response["description"]

.
"

Total count: <b>$total</b>
Weapon ID: <b>$id</b>
Median price: <b>$price</b>


<a href='http://cdn.steamcommunity.com/economy/image/$image'>Image</a>", $chatid, $url);

$logging->logEvent($message, $time, $username, $chatid);


}

if(0 === strpos($message, '/case')){

  $time = microtime(true);

  $insert = substr($message, strpos($message, "/case") + 6);

  if(strpos($message, '@csgoskins_bot') !== false){
    $insert = substr($message, strpos($message, "/case@csgoskins_bot") + 20);
  }


  $caseURL = json_decode(file_get_contents("http://steamcommunity.com/market/listings/730/".rawurlencode($insert)."/render?start=0&count=1&currency=3&language=english&format=json"), true);
  $priceURL = json_decode(file_get_contents("http://steamcommunity.com/market/priceoverview/?country=IT&currency=3&appid=730&market_hash_name=".rawurlencode($insert)), true);
  $response = $utils->getCase($caseURL, $priceURL);
  if($caseURL["total_count"] == 0){

    $utils->send("<b>Error!</b>\nThis case doesn't exist\n<b>Example of correct syntax</b>: /case Chroma 3 Case\n<b>Remember to fill in with the exact item's market name.</b>", $chatid, $url);
    die();

  }
  $caseID = $response["id"];
  $price = $response["price"];
  $image = $response["icon_url"];
  if(!file_exists("cases/".$response["name"].".json")){
    $utils->send("Generating case file...", $chatid, $url);
      $utils->writeCase($response, $size);
  }
    $a = file_get_contents("cases/".$response["name"].".json");
    $j = json_decode($a, true);
    $caseContent = implode(" " . "\n", $j);
    $utils->send("<b> == " . $response["name"] . " == </b>" . "<i>" . substr($caseContent, strpos($caseContent, "Array") + 6) . "</i>

Case ID: <b>$caseID</b>
Median Price: <b>$price</b>
<a href='http://cdn.steamcommunity.com/economy/image/$image'>Image</a>", $chatid, $url);

$logging->logEvent($message, $time, $username, $chatid);


}

?>
