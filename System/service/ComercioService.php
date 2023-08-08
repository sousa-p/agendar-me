<?php

namespace System\Service;

use PDO;

class ComercioService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function checarInfosLogin()
  {
    $comercioInfos = $this->getComercioInfos();
    if ($comercioInfos && password_verify($this->model->__get('SENHA_COMERCIO'), $comercioInfos->SENHA_COMERCIO)) {
      $this->model->__set('ID_COMERCIO', $comercioInfos->ID_COMERCIO);
      $this->model->__set('SECRET_COMERCIO', $comercioInfos->SECRET_COMERCIO);
      return [
        'retorno' => 'success',
        'mensagem' => 'Login realizado com sucesso',
        'JWT' => $this->gerarTokenJwt()
      ];
    }

    return [
      'retorno' => 'error',
      'mensagem' => 'Informações de login incorretas!'
    ];
  }

  public function getComercioInfos() {}

  public function gerarTokenJwt() {}
}