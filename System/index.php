<?php
//HEADERS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

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

$data = file_get_contents('php://input');
$data = json_decode($data);

if (!isset($data['request']) || !ehDadoValido($data['request']))
  respostaHost('error', 'Request inválido');
else if (!isset($data['action']) || !ehDadoValido($data['action']))
  respostaHost('error', 'Action inválido');

$request = $data['request'];
$action = $data['action'];

$conn = Conn::getInstance();
$userModel = new UserModel();
$userService = new UserService($conn, $userModel);
$userController = new UserController($data, $userModel, $userService);
