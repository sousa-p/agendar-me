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

if (!isset($data['route']) || !ehDadoValido($data['route'])) respostaHost('error', 'Rota inválido');
if (!isset($data['action']) || !ehDadoValido($data['action'])) respostaHost('error', 'Action inválido');

$route = $data['route'];
$action = $data['action'];

// DB CONNECTION
require_once './db/Conn.php';
use System\Database\Conn as Conn;
$conn = Conn::getInstance();

// MODEL IMPORT
$classModelPath = '../System/model/' . $route . 'Model.php';
require_once $classModelPath;
$classModelNamespace = 'System\Model\\' . ucfirst($route) . 'Model';
$classModel = new $classModelNamespace;

// SERVICE IMPORT
$classServicePath = './service/' . $route . 'Service.php';
require_once $classServicePath;
$classServiceNamespace = 'System\\Service\\' . ucfirst($route) . 'Service';
$classService = new $classServiceNamespace($conn, $classModel);

// CONTROLLER IMPORT
$classControllerPath =  './controller/' . $route . 'Controller.php';
require_once $classControllerPath;
$classControllerNamespace = 'System\\Controller\\' . ucfirst($route) . 'Controller';
$classController = new $classControllerNamespace($data, $classModel, $classService);

// AÇÕES QUE NÃO NECESSITAM DE VALIDAÇÃO
if ($route === 'User' && ($action === 'cadastrar' || $action === 'login'))
  $classController->$action();

// VALIDAÇÃO TOKEN JWT
if (!isset($data['Authorization']) || !ehDadoValido($data['Authorization'])) respostaHost('error', 'Algo deu errado :(');

$bearer = explode(' ', $data['Authorization'])[1];
$parts = explode('.', $bearer);
// Implementar lógica
if ($parts != 3) respostaHost('access_error', 'Algo deu errado :(');
$header = $parts[0];
$payload = $parts[1];
$signature = hash_hmac('sha256', $header . '.' . $payload, $secret);
if ($parts[2] === $signature) {
  $infos_token = json_decode(base64_decode($payload));
  return time() < (int)$infos_token->exp;
}