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

  public function save() {

  }
}
