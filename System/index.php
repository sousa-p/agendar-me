<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Credentials: true');

  $JSON = file_get_contents('php://input');
  echo $JSON;
?>