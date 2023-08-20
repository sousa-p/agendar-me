<?php

namespace System\Service;

use PDO;
use System\Model\UserModel;

class UserService
{
  private PDO $conn;
  private UserModel $model;

  public function __construct(PDO $conn, UserModel $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function save()
  {
    $insert = 'INSERT INTO USER (NOME_USER, TEL_USER, EMAIL_USER, SENHA_USER, SECRET_USER) VALUES (:NOME_USER, :TEL_USER, :EMAIL_USER, :SENHA_USER, :SECRET_USER)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':NOME_USER', $this->model->__get('NOME_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':SENHA_USER', $this->model->__get('SENHA_USER'));
    $this->model->__set('SECRET_USER', base64_encode(random_bytes(32)));
    $stmt->bindValue(':SECRET_USER', $this->model->__get('SECRET_USER'));
    $stmt->execute();
  }

  public function gerarTokenJwt()
  {
    $secret = $this->model->__get('SECRET_USER');
    $header = $this->base64url_encode('{"alg": "HS256", "type": "JWT"}');
    $exp = strtotime('+15 days');
    $payload = $this->base64url_encode('{"ID_USER": "' . (int)$this->model->__get('ID_USER') . '", "IP": "' . password_hash($this->getIp(), PASSWORD_DEFAULT) . '", "exp": "' . $exp . '"}');
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
    $select = 'SELECT SECRET_USER FROM USER WHERE ID_USER = :ID_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();
    return $stmt->fetch()->SECRET_USER;
  }

  public function checarInfosLogin()
  {
    $userInfos = $this->getUserInfos();
    if ($userInfos && password_verify($this->model->__get('SENHA_USER'), $userInfos->SENHA_USER)) {
      $this->model->__set('ID_USER', (int)$userInfos->ID_USER);
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

  public function getUserInfos()
  {
    $select = 'SELECT * FROM USER WHERE EMAIL_USER = :EMAIL_USER AND TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return $stmt->fetch();
  }


  public function getUserInfosId()
  {
    $select = 'SELECT NOME_USER, EMAIL_USER, TEL_USER FROM USER WHERE ID_USER = :ID_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_OBJ);
  }

  
  public function getId()
  {
    $select = 'SELECT ID_USER FROM USER WHERE EMAIL_USER = :EMAIL_USER AND TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return (int)$stmt->fetch()->ID_USER;
  }

  public function getSenha()
  {
    $select = 'SELECT SENHA_USER FROM USER WHERE EMAIL_USER = :EMAIL_USER AND TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return $stmt->fetch()->SENHA_USER;
  }

  public function getSenhaID()
  {
    $select = 'SELECT SENHA_USER FROM USER WHERE ID_USER = :ID_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', $this->model->__get('ID_USER'));
    $stmt->execute();
    return $stmt->fetch()->SENHA_USER;
  }

  public function alterarNOME()
  {
    $update = 'UPDATE USER SET NOME_USER = :NOME_USER WHERE ID_USER = :ID_USER';
    $stmt = $this->conn->prepare($update);
    $stmt->bindValue(':NOME_USER', $this->model->__get('NOME_USER'));
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();
    return [
      'retorno' => 'success',
      'mensagem' => 'Nome alterado com sucesso!'
    ];
  }

  public function alterarEMAIL()
  {

    if ($this->emailDisponivel()) {
      $update = 'UPDATE USER SET EMAIL_USER = :EMAIL_USER WHERE ID_USER = :ID_USER';
      $stmt = $this->conn->prepare($update);
      $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
      $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
      $stmt->execute();
      return [
        'retorno' => 'success',
        'mensagem' => 'Email alterado com sucesso!'
      ];
    }
    return [
      'retorno' => 'error',
      'mensagem' => 'Email não esta disponível'
    ];
  }

  public function emailDisponivel()
  {
    $select = 'SELECT * FROM USER WHERE EMAIL_USER = :EMAIL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->execute();
    return !$stmt->fetch();
  }

  public function alterarTEL()
  {
    if ($this->telDisponivel()) {
      $update = 'UPDATE USER SET TEL_USER = :TEL_USER WHERE ID_USER = :ID_USER';
      $stmt = $this->conn->prepare($update);
      $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
      $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
      $stmt->execute();
      return [
        'retorno' => 'success',
        'mensagem' => 'Telefone alterado com sucesso!'
      ];
    }
    return [
      'retorno' => 'error',
      'mensagem' => 'Telefone não esta disponível'
    ];
  }

  public function alterarSENHA()
  {
    if (password_verify($this->model->__get('SENHA_USER')['ANTIGA_SENHA_USER'], $this->getSenhaID())) {
      $update = 'UPDATE USER SET SENHA_USER = :NOVA_SENHA_USER WHERE ID_USER = :ID_USER';
      $stmt = $this->conn->prepare($update);
      $stmt->bindValue(':NOVA_SENHA_USER', password_hash($this->model->__get('SENHA_USER')['NOVA_SENHA_USER'], PASSWORD_DEFAULT));
      $stmt->bindValue(':ID_USER', $this->model->__get('ID_USER'));
      $stmt->execute();
      return [
        'retorno' => 'success',
        'mensagem' => 'Senha alterada com sucesso!'
      ];
    }
    return [
      'retorno' => 'error',
      'mensagem' => 'Senha antiga não corresponde'
    ];
  }
  public function telDisponivel()
  {
    $select = 'SELECT * FROM USER WHERE TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return !$stmt->fetch();
  }
}
