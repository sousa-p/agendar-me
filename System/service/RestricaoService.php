<?php

namespace System\Service;

use PDO;
use System\Model\RestricaoModel;

class RestricaoService
{
  private PDO $conn;
  private RestricaoModel $model;

  public function __construct(PDO $conn, RestricaoModel $model)
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

    $restricoes = $stmt->fetchAll(PDO::FETCH_OBJ);

    $select = 'SELECT HORARIO_ESPECIAL FROM DATAS_ESPECIAIS WHERE HORARIO_ESPECIAL IS NOT NULL AND DATA_ESPECIAL = :DATA_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->execute();
    
    $horariosEspeciais = $stmt->fetchAll(PDO::FETCH_COLUMN);

    return [
      'RESTRICOES' => $restricoes,
      'HORARIOS_ESPECIAIS' => $horariosEspeciais
    ];
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
    $select = 'SELECT DATA_INICIO, DATA_FIM, ID_RESTRICAO FROM RESTRICAO WHERE DATA_INICIO IS NOT NULL AND DATA_FIM IS NOT NULL AND (HORARIO_INICIO IS NULL OR HORARIO_FIM IS NULL)';
    $stmt = $this->conn->query($select);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getTodasDatasEspeciais()
  {
    $select = 'SELECT DATA_ESPECIAL FROM DATAS_ESPECIAIS';
    $stmt = $this->conn->query($select);

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
      'mensagem' => 'Horário remoção da restrição realizado com sucesso!'
    ];
  }

  public function getRestricoesSemanais()
  {
    $select = 'SELECT * FROM RESTRICAO WHERE DIA_SEMANA IS NOT NULL';
    $stmt = $this->conn->query($select);

    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function restringirDiaSemana()
  {
    $insert = 'INSERT INTO RESTRICAO (DIA_SEMANA) VALUES (:DIA_SEMANA)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':DIA_SEMANA', (int)$this->model->__get('DIA_SEMANA'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Dia da semana restringido com sucesso!'
    ];
  }

  public function tirarRestricaoDiaSemana()
  {
    $insert = 'DELETE FROM RESTRICAO WHERE DIA_SEMANA = :DIA_SEMANA';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':DIA_SEMANA', (int)$this->model->__get('DIA_SEMANA'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Restrição removida com sucesso!'
    ];
  }

  public function ehDataEspecial()
  {
    $select = 'SELECT * FROM DATAS_ESPECIAIS WHERE DATA_ESPECIAL = :DATA_ESPECIAL';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_ESPECIAL', $this->model->__get('DATA_ESPECIAL'));
    $stmt->execute();

    return $stmt->rowCount() > 0;
  }

  public function adicionarDataEspecial()
  {
    $insert = 'INSERT INTO DATAS_ESPECIAIS (DATA_ESPECIAL) VALUES (:DATA_ESPECIAL)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':DATA_ESPECIAL', $this->model->__get('DATA_ESPECIAL'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Data especial adicionada com sucesso!'
    ];
  }

  public function removerDataEspecial()
  {
    $delete = 'DELETE FROM DATAS_ESPECIAIS WHERE DATA_ESPECIAL = :DATA_ESPECIAL';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':DATA_ESPECIAL', $this->model->__get('DATA_ESPECIAL'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Data especial removida com sucesso!'
    ];
  }

  public function removerRestricao()
  {
    $delete = 'DELETE FROM RESTRICAO WHERE ID_RESTRICAO = :ID_RESTRICAO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_RESTRICAO', (int)$this->model->__get('ID_RESTRICAO'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Restrição removida com sucesso'
    ];
  }

  public function adicionarRestricaoData()
  {
    $insert = 'INSERT INTO RESTRICAO (ID_RESTRICAO, DATA_INICIO, DATA_FIM) VALUES (0, :DATA_INICIO, :DATA_FIM)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':DATA_INICIO', $this->model->__get('DATA_INICIO'));
    $stmt->bindValue(':DATA_FIM', $this->model->__get('DATA_FIM'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Restrição adicionada com sucesso'
    ];
  }

  public function getTodasRestricoesDeHorario()
  {
    $select = 'SELECT ID_RESTRICAO, HORARIO_INICIO, HORARIO_FIM, DATA_INICIO, DATA_FIM FROM RESTRICAO WHERE HORARIO_INICIO IS NOT NULL AND HORARIO_FIM IS NOT NULL AND DATA_INICIO IS NOT NULL';
    $stmt = $this->conn->query($select);

    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function adicionarRestricaoHorario()
  {
    $insert = 'INSERT INTO RESTRICAO (ID_RESTRICAO, DATA_INICIO, DATA_FIM, HORARIO_INICIO, HORARIO_FIM) VALUES (0, :DATA_INICIO, :DATA_FIM, :HORARIO_INICIO, :HORARIO_FIM)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':DATA_INICIO', $this->model->__get('DATA_INICIO'));

    $DATA_FIM = ($this->model->__get('DATA_FIM') !== null) ? $this->model->__get('DATA_FIM') : null;

    $stmt->bindValue(':DATA_FIM', $DATA_FIM);
    $stmt->bindValue(':HORARIO_INICIO', $this->model->__get('HORARIO_INICIO'));
    $stmt->bindValue(':HORARIO_FIM', $this->model->__get('HORARIO_FIM'));

    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Restrição adicionada com sucesso'
    ];
  }
}
