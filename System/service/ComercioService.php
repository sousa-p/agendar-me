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

  public function gerarTokenJwt()
  {
    $secret = $this->model->__get('SECRET_COMERCIO');
    $header = $this->base64url_encode('{"alg": "HS256", "type": "JWT"}');
    $exp = strtotime('+15 days');
    $payload = $this->base64url_encode('{"ID_COMERCIO": "' . (int)$this->model->__get('ID_COMERCIO') . '", "IP": "' . password_hash($this->getIp(), PASSWORD_DEFAULT) . '", "exp": "' . $exp . '"}');
    $signature = hash_hmac('sha256', $header . '.' . $payload, $secret);
    return $header . '.' . $payload . '.' . $signature;
  }

  public function base64url_encode($data)
  {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
  }

  public function getIp()
  {
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      // Caso o usuário possua proxy
      $listaIp = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
      $ip = $listaIp[0];
    } else {
      $ip = $_SERVER['REMOTE_ADDR'];
    }
    return password_hash($ip, PASSWORD_DEFAULT);
  }

  public function getSecret()
  {
    $select = 'SELECT SECRET_COMERCIO FROM COMERCIO WHERE ID_COMERCIO = :ID_COMERCIO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_COMERCIO', (int)$this->model->__get('ID_COMERCIO'));
    $stmt->execute();
    return $stmt->fetch()->SECRET_COMERCIO;
  }

  public function getComercioInfos()
  {
    $select = 'SELECT * FROM COMERCIO WHERE TEL_COMERCIO = :TEL_COMERCIO AND CNPJ_COMERCIO = :CNPJ_COMERCIO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':TEL_COMERCIO', $this->model->__get('TEL_COMERCIO'));
    $stmt->bindValue(':CNPJ_COMERCIO', $this->model->__get('CNPJ_COMERCIO'));
    $stmt->execute();
    return $stmt->fetch();
  }
}