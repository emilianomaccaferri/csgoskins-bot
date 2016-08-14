<?php

  class Utils{

    public function send($msg, $chatid, $url){

      $sendURL = $url."/sendMessage?chat_id=".$chatid."&text=".urlencode($msg)."&parse_mode=HTML";
      file_get_contents($sendURL);

      }

      public function getWeapon($weaponURL, $priceURL){

        $total = $weaponURL["total_count"];
        $success = $priceURL["success"];
        $mPrice = $priceURL["median_price"];
        $infos = array_keys($weaponURL["assets"]["730"]["2"]);
        $deeper = $infos[0];
        $id = $weaponURL["assets"]["730"]["2"][$deeper]["id"];
        $icon = $weaponURL["assets"]["730"]["2"][$deeper]["icon_url"];
        $description = $weaponURL["assets"]["730"]["2"][$deeper]["descriptions"][2]["value"];
        $collection = $weaponURL["assets"]["730"]["2"][$deeper]["descriptions"][4]["value"];
        $name = $weaponURL["assets"]["730"]["2"][$deeper]["name"];

        return array(

          "total" => $total,
          "id" => $id,
          "icon_url" => $icon,
          "description" => $description,
          "median_price" => $mPrice,
          "collection" => $collection,
          "weapon_name" => $name,
          "success" => $success,

        );

      }

      public function getCase($caseURL, $casePriceURL){

        $success = $caseURL["success"];
        $casePrice = $casePriceURL["median_price"];
        $infos = array_keys($caseURL["assets"]["730"]["2"]);
        $deeper = $infos[0];
        $id = $caseURL["assets"]["730"]["2"][$deeper]["id"];
        $icon = $caseURL["assets"]["730"]["2"][$deeper]["icon_url"];
        $name = $caseURL["assets"]["730"]["2"][$deeper]["name"];
        $arrInfos = array($caseURL["assets"]["730"]["2"][$deeper]["descriptions"]);

        return array(

          "items" => $arrInfos,
          "name" => $name,
          "id" => $id,
          "price" => $casePrice,
          "icon_url" => $icon,
          "success" => $success

        );


      }

      public function writeCase($response){

          $size = sizeof($response["items"][0]);
            $caseFile[] = array();
        for ($i = 0; $i <= $size - 1; $i++) {
            $itemInCase = $response["items"][0][$i]["value"];
            array_push($caseFile, $itemInCase);
        }
        $fp = fopen("cases/".$response["name"].".json", "w");
        fwrite($fp, json_encode($caseFile));
        fclose($fp);

      }

  }

?>
