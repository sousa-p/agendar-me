<?php

namespace System\Service;

class UserService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function save()
  {
    $insert = 'INSERT INTO USER VALUES (0, :NOME_USER, :TEL_USER, :EMAIL_USER, :SENHA_USER, :SECRET_USER)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':NOME_USER', $this->model->__get('NOME_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':SENHA_USER', $this->model->__get('SENHA_USER'));
    $this->model->__set('SECRET_USER', base64_encode(random_bytes(32)));
    $stmt->bindValue(':SECRET_USER', $this->model->__get('SECRET_USER'));
    $stmt->execute();
  }

  public function base64url_encode($data)
  {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
  }

  public function gerarTokenJwt()
  {
    $secret = $this->model->__get('SECRET_USER');
    $header = $this->base64url_encode('{"alg": "HS256", "type": "JWT"}');
    $exp = strtotime('+15 days');
    $payload = $this->base64url_encode('{"ID_USER": "' . $this->model->__get('ID_USER') . '", "EMAIL_USER": "' . $this->model->__get('EMAIL_USER') . '", "TEL_USER": "' . $this->model->__get('TEL_USER') . '", "exp": "' . $exp . '"}');
    $signature = hash_hmac('sha256', $header . '.' . $payload, $secret);

    return $header . '.' . $payload . '.' . $signature;
  }

  function JwtValido()
  {
    $parts = explode('.', $this->model->__get('JWT_TOKEN'));
    if (count($parts) === 3) {
      $secret = $this->model->get('SENHA_USER');
      $header = $parts[0];
      $payload = $parts[1];
      $signature = hash_hmac('sha256', $header . '.' . $payload, $secret);
      if ($parts[2] === $signature) {
        $infos_token = json_decode(base64_decode($payload));
        return time() < (int)$infos_token->exp;
      }
    }
    return false;
  }

  public function getId()
  {
    $select = 'SELECT ID_USER FROM USER WHERE EMAIL_USER = :EMAIL_USER AND TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return $stmt->fetch();
  }

  public function emailDisponivel()
  {
    $select = 'SELECT * FROM USER WHERE EMAIL_USER = :EMAIL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->execute();
    return !$stmt->fetch();
  }

  public function getSenha()
  {
    $select = 'SELECT SENHA_USER FROM USER WHERE EMAIL_USER = :EMAIL_USER AND TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return $stmt->fetch()['SENHA_USER'];
  }

  public function telDisponivel()
  {
    $select = 'SELECT * FROM USER WHERE TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return !$stmt->fetch();
  }

  public function getUserInfos()
  {
    $select = 'SELECT * FROM USER wHERE EMAIL_USER = :EMAIL_USER AND TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return $stmt->fetch();
  }

  public function checarInfosLogin()
  {
    $userInfos = $this->getUserInfos();
    if ($userInfos && password_verify($this->model->__get('SENHA_USER'), $userInfos->SENHA_USER)) {
      $this->model->__set('ID_USER', $userInfos->ID_USER);
      $this->model->__set('SECRET_USER', $userInfos->SECRET_USER);
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
}
