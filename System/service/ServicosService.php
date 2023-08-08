<?php

namespace System\Service;

use PDO;

class ServicosService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function getTodosServicos()
  {
    $select = 'SELECT * FROM SERVICOS';
    $stmt = $this->conn->query($select);
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function saveServicoAgendamento()
  {
    $insert = 'INSERT INTO SERVICO_AGENDAMENTOS VALUES (:ID_SERVICO, :ID_AGENDAMENTO)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':ID_SERVICO', (int)$this->model->ID_SERVICO);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->ID_SERVICO);
    $stmt->execute();
  }

  public function getTodosServicosAgendamento()
  {
    $select = 'SELECT SERVICOS.ID_SERVICO, NOME_SERVICO, PRECO_SERVICO FROM SERVICOS
    INNER JOIN SERVICOS_AGENDAMENTO
    ON SERVICOS_AGENDAMENTO.ID_SERVICO = SERVICOS.ID_SERVICO
    INNER JOIN AGENDAMENTO
    ON AGENDAMENTO.ID_AGENDAMENTO = SERVICOS_AGENDAMENTO.ID_AGENDAMENTO
    INNER JOIN USER
    ON USER.ID_USER = AGENDAMENTO.ID_USER
    WHERE USER.ID_USER = :ID_USER AND AGENDAMENTO.ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', (int)$this->model->ID_USER);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->ID_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }
}
