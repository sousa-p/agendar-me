<?php

namespace System\Service;

use PDO;

class RestricaoService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function getTodasRestricoesNaData()
  {
    $select = 'SELECT HORARIO_INICIO, HORARIO_FIM FROM RESTRICAO WHERE (DATA_INICIO <= :DATA_AGENDAMENTO) AND (:DATA_AGENDAMENTO <= DATA_FIM OR DATA_FIM IS NULL) AND HORARIO_INICIO IS NOT NULL';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getTodosDiasSemana()
  {
    $select = 'SELECT DIA_SEMANA FROM RESTRICAO WHERE DIA_SEMANA IS NOT NULL';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
  }

  public function getTodasDatas()
  {
    $select = 'SELECT DATA_INICIO, DATA_FIM FROM RESTRICAO WHERE DATA_INICIO IS NOT NULL AND DATA_FIM IS NOT NULL AND (HORARIO_INICIO IS NULL OR HORARIO_FIM IS NULL)';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getTodasDatasEspeciais()
  {
    $select = 'SELECT DATA_ESPECIAL FROM DATAS_ESPECIAIS';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
  }

  public function restringirHorario()
  {
    $delete = 'DELETE FROM DATAS_ESPECIAIS WHERE DATA_ESPECIAL = :DATA AND HORARIO_ESPECIAL = :HORARIO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':DATA', $this->model->__get('DATA'));
    $stmt->bindValue(':HORARIO', $this->model->__get('HORARIO'));
    $stmt->execute();

    $insert = 'INSERT INTO RESTRICAO (HORARIO_INICIO, HORARIO_FIM, DATA_INICIO, DATA_FIM) VALUES (:HORARIO, :HORARIO, :DATA, :DATA)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':HORARIO', $this->model->__get('HORARIO'));
    $stmt->bindValue(':HORARIO', $this->model->__get('HORARIO'));
    $stmt->bindValue(':DATA', $this->model->__get('DATA'));
    $stmt->bindValue(':DATA', $this->model->__get('DATA'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Horário restrito com sucesso'
    ];
  }

  public function tirarRestricaoHorario()
  {
    $delete = 'DELETE FROM RESTRICAO WHERE DATA_INICIO = :DATA AND DATA_FIM = :DATA AND HORARIO_INICIO = :HORARIO AND HORARIO_FIM = :HORARIO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':DATA', $this->model->__get('DATA'));
    $stmt->bindValue(':HORARIO', $this->model->__get('HORARIO'));
    $stmt->execute();

    $insert = 'INSERT INTO DATAS_ESPECIAIS (DATA_ESPECIAL, HORARIO_ESPECIAL) VALUES (:DATA, :HORARIO)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':DATA', $this->model->__get('DATA'));
    $stmt->bindValue(':HORARIO', $this->model->__get('HORARIO'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Horário remoção da restrição realizado com sucesso'
    ];
  }
}
