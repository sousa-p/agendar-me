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
$data = json_decode($data, true);

if (!isset($data['route']) || !ehDadoValido($data['route']))
  respostaHost('error', 'Rota inválido');
else if (!isset($data['action']) || !ehDadoValido($data['action']))
  respostaHost('error', 'Action inválido');

$route = $data['route'];
$action = $data['action'];

$conn = Conn::getInstance();
$userModel = new UserModel();
$userService = new UserService($conn, $userModel);
$userController = new UserController($data, $userModel, $userService);

if ($route === 'user' && ($action === 'cadastrar' || $action === 'login'))
  $userController->$action();
