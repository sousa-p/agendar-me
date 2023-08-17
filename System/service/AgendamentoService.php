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
    $select = 'SELECT HORARIO_AGENDAMENTO FROM AGENDAMENTO WHERE DATA_AGENDAMENTO = :DATA_AGENDAMENTO ORDER BY HORARIO_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->__get('DATA_AGENDAMENTO'));
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
  }
  public function ehDataEspecial()
  {
    $select = 'SELECT * FROM DATAS_ESPECIAIS WHERE DATA_ESPECIAL = :DATA_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->__get('DATA_AGENDAMENTO'));
    $stmt->execute();
    return $stmt->rowCount() > 0;
  }
  public function ehDataRestrita()
  {
    if (!$this->ehDataEspecial()) {
      $DIA_SEMANA = date('N', strtotime($this->model->__get('DATA_AGENDAMENTO')));
      $DIA_SEMANA = (int)$DIA_SEMANA;

      $select = 'SELECT * FROM RESTRICAO
      WHERE
        HORARIO_INICIO IS NULL AND HORARIO_FIM IS NULL
      AND
        (RESTRICAO.DIA_SEMANA = :DIA_SEMANA
      OR 
        (RESTRICAO.DATA_INICIO <= :DATA_AGENDAMENTO AND RESTRICAO.DATA_FIM >= :DATA_AGENDAMENTO))';    
  
      $stmt = $this->conn->prepare($select);
      $stmt->bindValue(':DIA_SEMANA', $DIA_SEMANA);
      $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->__get('DATA_AGENDAMENTO'));
      $stmt->execute();
      return $stmt->rowCount() > 0;
    }
    return false;
  }
  
  public function existeAgendamento()
  {
    $select = 'SELECT * FROM AGENDAMENTO WHERE DATA_AGENDAMENTO = :DATA_AGENDAMENTO AND HORARIO_AGENDAMENTO = :HORARIO_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->__get('DATA_AGENDAMENTO'));
    $stmt->bindValue(':HORARIO_AGENDAMENTO', $this->model->__get('HORARIO_AGENDAMENTO'));
    $stmt->execute();
    return $stmt->rowCount() > 0;
  }
  public function save()
  {
    $insert = 'INSERT INTO AGENDAMENTO (ID_USER, DATA_AGENDAMENTO, HORARIO_AGENDAMENTO) VALUES (:ID_USER, :DATA_AGENDAMENTO, :HORARIO_AGENDAMENTO)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':ID_USER', $this->model->__get('ID_USER'));
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->__get('DATA_AGENDAMENTO'));
    $stmt->bindValue(':HORARIO_AGENDAMENTO', $this->model->__get('HORARIO_AGENDAMENTO'));
    $stmt->execute();
    $this->model->__set('ID_AGENDAMENTO', $this->getIdUltimoAgendamento());
    foreach ($this->model->__get('SERVICOS_AGENDAMENTO') as $servico) {
      $insert = 'INSERT INTO SERVICOS_AGENDAMENTO VALUES (:ID_SERVICO, :ID_AGENDAMENTO)';
      $stmt = $this->conn->prepare($insert);
      $stmt->bindValue(':ID_SERVICO', (int)$servico->ID_SERVICO);
      $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
      $stmt->execute();
    }
    return ['retorno' => 'success', 'mensagem' => 'Agendamento realizado com sucesso'];
  }
  public function getIdUltimoAgendamento()
  {
    $select = 'SELECT ID_AGENDAMENTO FROM AGENDAMENTO WHERE ID_USER = :ID_USER ORDER BY DATA_CRIACAO_AGENDAMENTO DESC LIMIT 1';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();
    return $stmt->fetch()->ID_AGENDAMENTO;
  }

  public function getAgendamentosRealizados()
  {
    $select = 'SELECT DATA_AGENDAMENTO, HORARIO_AGENDAMENTO, ID_AGENDAMENTO FROM AGENDAMENTO WHERE ID_USER = :ID_USER ORDER BY DATA_AGENDAMENTO DESC';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getAgendamentoId()
  {
    $select = 'SELECT * FROM AGENDAMENTO WHERE ID_USER = :ID_USER AND ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
    $stmt->execute();
    return $stmt->fetch();
  }

  public function deleteAgendamento()
  {
    $delete = 'DELETE FROM SERVICOS_AGENDAMENTO WHERE ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
    $stmt->execute(); 

    $delete = 'DELETE FROM AGENDAMENTO WHERE ID_USER = :ID_USER AND ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_USER', (int)$this->model->__get('ID_USER'));
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
    $stmt->execute();
    return [
      'retorno' => 'success',
      'mensagem' => 'Agendamento removido com sucesso!'
    ];
  }

  public function deleteAgendamentoComercio()
  {
    $delete = 'DELETE FROM SERVICOS_AGENDAMENTO WHERE ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
    $stmt->execute();

    $delete = 'DELETE FROM AGENDAMENTO WHERE ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
    $stmt->execute();
    return [
      'retorno' => 'success',
      'mensagem' => 'Agendamento removido com sucesso!'
    ];
  }

  public function getAgendamentoInfos()
  {
    $select = 'SELECT ID_AGENDAMENTO, NOME_USER, TEL_USER, DATA_CRIACAO_AGENDAMENTO, DATA_AGENDAMENTO, HORARIO_AGENDAMENTO FROM AGENDAMENTO
    INNER JOIN USER
    ON AGENDAMENTO.ID_USER = USER.ID_USER
    WHERE DATA_AGENDAMENTO = :DATA_AGENDAMENTO AND HORARIO_AGENDAMENTO = :HORARIO_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':DATA_AGENDAMENTO', $this->model->DATA_AGENDAMENTO);
    $stmt->bindValue(':HORARIO_AGENDAMENTO', $this->model->HORARIO_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetch();
  }
}
