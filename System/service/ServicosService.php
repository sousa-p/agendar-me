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

  public function saveServicoAgendamento () {
    $insert = 'INSERT INTO SERVICO_AGENDAMENTOS VALUES (:ID_SERVICO, :ID_AGENDAMENTO)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':ID_SERVICO', (int)$this->model->ID_SERVICO);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->ID_SERVICO);
    $stmt->execute();
  }
}
