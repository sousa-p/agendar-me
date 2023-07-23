<?php
// DB CONNECTION
require_once './db/Conn.php';
use System\Database\Conn as Conn;
$conn = Conn::getInstance();

// MODEL IMPORT
$classModelPath = './model/' . $route . 'Model.php';
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
