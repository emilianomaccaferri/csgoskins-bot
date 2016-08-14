<?php

class Logging{

  public function logEvent($message, $time, $sender, $chatid){

    $date = date("d-m-y");
    $logFile = fopen("logfile.log", "a");
    $elapsedTime = microtime(true) - $time;

    fwrite($logFile, "- \n[$sender, ($chatid) on $date]: $message\nFunction completed in: $elapsedTime\n-\n\n");

    fclose($logFile);

  }

}

?>
