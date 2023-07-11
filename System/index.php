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

// AÇÕES QUE NÃO NECESSITAM DE VALIDAÇÃO
if ($route === 'User' && ($action === 'cadastrar' || $action === 'login')) {
  $classController->$action();
  exit();
}

// VALIDAÇÃO TOKEN JWT
$httpHeader = apache_request_headers();
if (!isset($httpHeader['Authorization']) || !ehDadoValido($httpHeader['Authorization']))
  respostaHost('error', 'Algo deu errado :(');

$bearer = explode(' ', $httpHeader['Authorization'])[1];
$bearer = limparDados($bearer);
if (!ehDadoValido($bearer))
  respostaHost('error', 'Algo deu errado :(');

$parts = explode('.', $bearer);
if (count($parts) != 3)
  respostaHost('access_error', 'Algo deu errado :(');

$header = $parts[0];
$payload = $parts[1];
$infosToken = json_decode(base64_decode(limparDados($payload)));

require_once './imports/UserImports.php';

if (!isset($infosToken->ID_USER)|| !ehDadoValido($infosToken->ID_USER))
  respostaHost('error', 'Token de acesso inválido');

$idUser = (int)$infosToken->ID_USER;
$userModel->__set('ID_USER', (int)$idUser);
$userModel->__set('SECRET_USER', $userService->getSecret());
$signature = hash_hmac('sha256', $header . '.' . $payload, $userModel->__get('SECRET_USER'));

if ($parts[2] != $signature)
  respostaHost('access_error', 'Token de acesso inválido');

$infosToken = json_decode(base64_decode(limparDados($payload)));

if (time() > (int)$infosToken->exp)
  respostaHost('access_error', 'Token de acesso expirou');

$classController->$action();
