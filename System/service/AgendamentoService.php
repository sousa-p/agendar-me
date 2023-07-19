<?php

namespace System\Service;

class AgendamentoService
{
  public function __construct($model, $conn)
  {
    $this->model = $model;
    $this->conn = $conn;
  }

  public function getTodosAgendamentosData() {
    $select = 'SELECT HORARIO_AGENDAMENTO FROM AGENDAMENTO WHERE DATA_AGENDAMENTO = :DATA_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetch();
  }
}
