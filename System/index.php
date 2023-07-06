<?php
  //HEADERS
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Credentials: true');

  $data = file_get_contents('php://input');
  $request = $data['request'];
  $action = $data['action'];
  
  // REQUIRES
  require '../System/db/Conn.php';
  require '../System/model/UserModel.php';
  require '../System/service/UserService.php';
  require '../System/controller/UserController.php';

  // NAMESPACES
  use System\Database\Conn as Conn;
  use System\Model\UserModel as UserModel;
  use System\Service\UserService as UserService;
  use System\Controller\UserController as UserController;

  $conn = Conn::getInstance();
?>