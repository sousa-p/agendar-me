<?php
require_once './model/UserModel.php';
require_once './service/UserService.php';
require_once './controller/UserController.php';

use System\Model\UserModel as UserModel;
use System\Service\UserService as UserService;
use System\Controller\UserController as UserController;

$userModel = new UserModel();
$userService = new UserService($conn, $userModel);
$userController = new UserController($data, $userModel, $userService);
