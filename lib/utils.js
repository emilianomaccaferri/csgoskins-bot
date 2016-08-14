const request = require("request");
const fs = require("fs");

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("It seems that Node couldn't handle that, btw it's all good (unhandledException) :D");
  console.log("Node.js > Hey there! I'm alive!");
});

module.exports.getWeapon = function(wURL, callback){

  var weaponOptions = {

    url: wURL,
    method: 'GET'

  };

  request(weaponOptions, function(error, response, requestBody){
    if(!error && response.statusCode == 200){

      var weaponJSON = null;
      try {

          weaponJSON = JSON.parse(requestBody);
          var toScan;

      } catch (error) {

        callback(error);
        return false;

      }

        toScan = weaponJSON["assets"]["730"]["2"];

      var deeperInfos;
      for(var key in toScan){

        if(toScan.hasOwnProperty(key)){
          deeperInfos = toScan[key];
          break;
        }

      }
      var weaponInfos = {

        "name": deeperInfos["name"],
        "total_count": weaponJSON["total_count"],
        "id": deeperInfos["id"],
        "icon": deeperInfos["icon_url"],
        "description": deeperInfos["descriptions"][2]["value"],
        "collection": deeperInfos["descriptions"][4]["value"],

      };

      callback(null, weaponInfos);

    }

  });
}

module.exports.getKnife = function(knifeURL, callback){

  var weaponOptions = {

    url: knifeURL,
    method: 'GET'

  };

  request(weaponOptions, function(error, response, requestBody){
    if(!error && response.statusCode == 200){

      var knifeJSON = null;
      try {

          knifeJSON = JSON.parse(requestBody);
          var knifeScan;

      } catch (error) {

        callback(error);
        return false;

      }

        knifeScan = knifeJSON["assets"]["730"]["2"];

      var knifeInfos;
      for(var key in knifeScan){

        if(knifeScan.hasOwnProperty(key)){
          knifeInfos = knifeScan[key];
          break;
        }

      }
      var knife = {

        "name": knifeInfos["name"],
        "total_count": knifeJSON["total_count"],
        "id": knifeInfos["id"],
        "icon": knifeInfos["icon_url"],

      };

      callback(null, knife);

    }

  });
}

module.exports.getPrice = function(pURL, callback){

  var priceOptions = {

    url: pURL,
    method: 'GET'

  }

  request(priceOptions, function(err, response, priceBody){

    var priceJSON = null;

    try{

      priceJSON = JSON.parse(priceBody);
      var median_price = null;

    }catch(err){

      callback(err);
      return false;

    }

    median_price = priceJSON["median_price"];

    var priceInfos = {

      "median_price": median_price

    }

    callback(null, priceInfos);

  });


}

module.exports.getCase = function(caseURL, callback){

  var caseOptions = {

    url: caseURL,
    method: 'GET'

  }

  request(caseOptions, function(error, response, caseBody){

    var caseJSON;
    try{

      caseJSON = JSON.parse(caseBody);
      var caseScan;

    }catch(error){

      callback(error);
      return false;

    }

    caseScan = caseJSON["assets"]["730"]["2"];
    var caseInfos;
    for(var key in caseScan){

      if(caseScan.hasOwnProperty(key)){
        caseInfos = caseScan[key];
        break;
      }

    }

    var case_response = {

      "items": caseInfos["descriptions"],
      "name": caseInfos["name"],
      "id": caseInfos["id"],
      "total_count": caseJSON["total_count"],
      "icon": caseInfos["icon_url"]

    };

    callback(null, case_response);

  });

}
