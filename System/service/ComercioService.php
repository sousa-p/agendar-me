<?php

namespace System\Service;

use PDO;
use System\Model\ComercioModel;

class ComercioService
{
  private PDO $conn;
  private ComercioModel $model;

  public function __construct(PDO $conn, ComercioModel $model)
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

  public function getClientes()
  {
    $select = 'SELECT
        USER.ID_USER,
        NOME_USER,
        EMAIL_USER,
        TEL_USER,
        CANCELAMENTOS,
        (SELECT COUNT(ID_AGENDAMENTO)
            FROM AGENDAMENTO
            WHERE AGENDAMENTO.ID_USER = USER.ID_USER
              AND (DATA_AGENDAMENTO < CURDATE()
              OR ( DATA_AGENDAMENTO = CURDATE() AND HORARIO_AGENDAMENTO <= CURTIME()))
        ) AS AGENDAMENTOS
    FROM
        USER';
    $stmt = $this->conn->query($select);
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function deleteCliente()
  {
    $delete = 'DELETE SERVICOS_AGENDAMENTO
    FROM SERVICOS_AGENDAMENTO
    INNER JOIN AGENDAMENTO ON AGENDAMENTO.ID_AGENDAMENTO = SERVICOS_AGENDAMENTO.ID_AGENDAMENTO
    INNER JOIN USER ON AGENDAMENTO.ID_USER = USER.ID_USER
    WHERE USER.ID_USER = :ID_USER';

    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();

    $delete = 'DELETE FROM AGENDAMENTO WHERE ID_USER = :ID_USER';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();

    $delete = 'DELETE FROM USER WHERE ID_USER = :ID_USER';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Cliente removido com sucesso!'
    ];
  }
}

