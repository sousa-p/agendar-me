<?php
//HEADERS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST');

require_once '../System/controller/CheckFields.php';

$data = file_get_contents('php://input');
$data = json_decode($data, true);

if (!isset($data['route']) || !ehDadoValido($data['route']))
  respostaHost('error', 'Rota inválido');
if (!isset($data['action']) || !ehDadoValido($data['action']))
  respostaHost('error', 'Action inválido');

$route = $data['route'];
$action = $data['action'];

require_once './imports/RouteClassImports.php';
require_once './imports/UserImports.php';
require_once './imports/ComercioImports.php';

// AÇÕES QUE NÃO NECESSITAM DE VALIDAÇÃO
if ($action === 'cadastrar' || $action === 'login') {
  $classController->$action();
  exit();
}

// VALIDAÇÃO TOKEN JWT
$httpHeader = apache_request_headers();
if (!isset($httpHeader['Authorization']) || !ehDadoValido($httpHeader['Authorization']))
  respostaHost('error', 'Algo deu errado :(');

$bearer = explode(' ', $httpHeader['Authorization'])[1];

if ($route !== 'Comercio')
  $userController->validarToken($bearer);
else if ($route === 'Comercio')
  $comercioController->validarToken($bearer);

if ($action === 'validarToken') {
  respostaHost('success', 'Token Válido');
  exit();
}

$classModel->__set('ID_USER', $userModel->ID_USER);
$classController->$action();
