<?php

namespace System\Service;

use PDO;

class AgendamentoService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function getTodosAgendamentosData()
  {
    $select = 'SELECT HORARIO_AGENDAMENTO FROM AGENDAMENTO WHERE DATA_AGENDAMENTO = :DATA_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function save()
  {
    $insert = 'INSERT INTO AGENDAMENTO (ID_USER, DATA_AGENDAMENTO, HORARIO_AGENDAMENTO) VALUES (:ID_USER, :DATA_AGENDAMENTO, :HORARIO_AGENDAMENTO)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':ID_USER', $this->model->ID_USER);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->bindValue(':HORARIO_AGENDAMENTO', $this->model->HORARIO_AGENDAMENTO);
    $stmt->execute();

    $this->model->__set('ID_AGENDAMENTO', $this->getIdUltimoAgendamento());

    foreach ($this->model->__get('SERVICOS_AGENDAMENTO') as $servico) {
      $insert = 'INSERT INTO SERVICOS_AGENDAMENTO VALUES (:ID_SERVICO, :ID_AGENDAMENTO)';
      $stmt = $this->conn->prepare($insert);
      $stmt->bindValue(':ID_SERVICO', (int)$servico->ID_SERVICO);
      $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
      $stmt->execute();
    }
  }

  public function getIdUltimoAgendamento()
  {
    $select = 'SELECT ID_AGENDAMENTO FROM AGENDAMENTO WHERE ID_USER = :ID_USER ORDER BY DATA_CRIACAO_AGENDAMENTO DESC LIMIT 1';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', $this->model->ID_USER);
    $stmt->execute();
    return $stmt->fetch()->ID_AGENDAMENTO;
  }
}
