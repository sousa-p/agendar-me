<?php

namespace System\Service;

use PDO;

class RestricaoService
{
  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function getTodasRestricoesData() {
    $select = 'SELECT HORARIO_INICIO, HORARIO_FIM FROM RESTRICAO WHERE DATA_INICIO <= :DATA_AGENDAMENTO AND (:DATA_AGENDAMENTO <= DATA_FIM OR DATA_FIM IS NULL)';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getDiasRestricoes() {
    $select = 'SELECT DATA_INICIO, DATA_FIM, DIA_SEMANA FROM RESTRICAO WHERE HORA_INICIO == NULL OR HORA_FIM == NULL';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetch();
  }
}
