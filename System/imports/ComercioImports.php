<?php
require_once './model/ComercioModel.php';
require_once './service/ComercioService.php';
require_once './controller/ComercioController.php';

use System\Model\ComercioModel as ComercioModel;
use System\Service\ComercioService as ComercioService;
use System\Controller\ComercioController as ComercioController;

$comercioModel = new ComercioModel();
$comercioService = new ComercioService($conn, $comercioModel);
$comercioController = new ComercioController($data, $comercioModel, $comercioService);
