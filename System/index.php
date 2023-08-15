<?php
//HEADERS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST');

require_once '../System/controller/CheckFields.php';

$data = file_get_contents('php://input');
$data = json_decode($data, true);

if (!isset($data['route']) || !ehDadoValido($data['route']))
  respostaHost('error', 'Route inválido');
if (!isset($data['action']) || !ehDadoValido($data['action']))
  respostaHost('error', 'Action inválido');
if (!isset($data['autor']) || !ehDadoValido($data['autor']))
  respostaHost('error', 'Autor inválido');

$route = $data['route'];
$action = $data['action'];
$autor = $data['autor'];

require_once './imports/RouteClassImports.php';
require_once './imports/UserImports.php';
require_once './imports/ComercioImports.php';

// AÇÕES QUE NÃO NECESSITAM DE VALIDAÇÃO
if ($action === 'cadastrar' || $action === 'login') {
  $classController->$action();
  exit();
}

// VALIDAÇÃO TOKEN JWT
if (!isset($data['Authorization']) || !ehDadoValido($data['Authorization']))
  respostaHost('error', 'Algo deu errado :(');

$bearer = explode(' ', $data['Authorization'])[1];

if ($autor === 'User') {
  $userController->validarToken($bearer);
  $classModel->__set('ID_USER', $userModel->ID_USER);
} else if ($autor === 'Comercio') {
  $comercioController->validarToken($bearer);
  $classModel->__set('ID_COMERCIO', $comercioModel->ID_COMERCIO);
} else {
  respostaHost('error', 'Autor inválido');
  exit();
}

if ($action === 'validarToken') {
  respostaHost('success', 'Token Válido');
  exit();
}

$classModel->__set('AUTOR', $autor);
$classController->$action();
