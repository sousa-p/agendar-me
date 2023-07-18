<?php

namespace System\Service;

use PDO;

class RestricaoService
{
  public function __construct($model, $conn)
  {
    $this->model = $model;
    $this->conn = $conn;
  }

  public function getTodasaRestricoesData() {
    $restricoes = [];
    $select = 'SELECT HORARIO_INICIO, HORARIO_FIM FROM RESTRICAO WHERE DATA_INICIO >= :DATA_AGENDAMENTO AND :DATA_AGENDAMENTO <= DATA_FIM';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValues(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->execute();
    $restricoes['INTERVALOS'] = $stmt->fetch_all(PDO::FETCH_OBJ);
  }

  public function getDiasRestricoes() {
    $select = 'SELECT DATA_INICIO, DATA_FIM, DIA_SEMANA FROM RESTRICAO WHERE HORA_INICIO == NULL OR HORA_FIM == NULL';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetch();
  }
}
