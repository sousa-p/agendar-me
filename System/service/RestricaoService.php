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

  public function getTodasRestricoesNaData() {
    $select = 'SELECT HORARIO_INICIO, HORARIO_FIM FROM RESTRICAO WHERE DATA_INICIO <= :DATA_AGENDAMENTO AND (:DATA_AGENDAMENTO <= DATA_FIM OR DATA_FIM IS NULL)';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getTodosDiasSemana() {
    $select = 'SELECT DIA_SEMANA FROM RESTRICAO WHERE DIA_SEMANA IS NOT NULL';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
  }

  public function getTodasDatas() {
    $select = 'SELECT DATA_INICIO, DATA_FIM FROM RESTRICAO WHERE DATA_INICIO IS NOT NULL';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getTodasDatasEspeciais() {
    $select = 'SELECT DATA FROM DATAS_ESPECIAIS';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }
}
