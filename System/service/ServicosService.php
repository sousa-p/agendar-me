<?php

namespace System\Service;

use PDO;
use System\Model\ServicosModel;

class ServicosService
{
  private PDO $conn;
  private ServicosModel $model;

  public function __construct(PDO $conn, ServicosModel $model)
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

  public function saveServicoAgendamento()
  {
    $insert = 'INSERT INTO SERVICO_AGENDAMENTOS VALUES (:ID_SERVICO, :ID_AGENDAMENTO)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':ID_SERVICO', (int)$this->model->ID_SERVICO);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->ID_SERVICO);
    $stmt->execute();
  }

  public function getTodosServicosAgendamento()
  {
    $select = 'SELECT SERVICOS.ID_SERVICO, NOME_SERVICO, PRECO_SERVICO FROM SERVICOS
    INNER JOIN SERVICOS_AGENDAMENTO
    ON SERVICOS_AGENDAMENTO.ID_SERVICO = SERVICOS.ID_SERVICO
    INNER JOIN AGENDAMENTO
    ON AGENDAMENTO.ID_AGENDAMENTO = SERVICOS_AGENDAMENTO.ID_AGENDAMENTO
    INNER JOIN USER
    ON USER.ID_USER = AGENDAMENTO.ID_USER
    WHERE USER.ID_USER = :ID_USER AND AGENDAMENTO.ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_USER', (int)$this->model->ID_USER);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->ID_AGENDAMENTO);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function getTodosServicosAgendamentoCliente()
  {
    $select = 'SELECT SERVICOS.ID_SERVICO, NOME_SERVICO, PRECO_SERVICO FROM SERVICOS
    INNER JOIN SERVICOS_AGENDAMENTO
    ON SERVICOS_AGENDAMENTO.ID_SERVICO = SERVICOS.ID_SERVICO
    INNER JOIN AGENDAMENTO
    ON AGENDAMENTO.ID_AGENDAMENTO = SERVICOS_AGENDAMENTO.ID_AGENDAMENTO
    WHERE AGENDAMENTO.ID_AGENDAMENTO = :ID_AGENDAMENTO';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':ID_AGENDAMENTO', (int)$this->model->__get('ID_AGENDAMENTO'));
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }

  public function deletarServico() {
    $delete = 'DELETE FROM SERVICOS_AGENDAMENTO WHERE ID_SERVICO = :ID_SERVICO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_SERVICO', (int)$this->model->__get('ID_SERVICO'));
    $stmt->execute();

    $delete = 'DELETE FROM SERVICOS WHERE ID_SERVICO = :ID_SERVICO';
    $stmt = $this->conn->prepare($delete);
    $stmt->bindValue(':ID_SERVICO', (int)$this->model->__get('ID_SERVICO'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Serviço removido com sucesso!'
    ];
  }

  public function adicionarServico() {
    $insert =  'INSERT INTO SERVICOS VALUES (0, :NOME_SERVICO, :PRECO_SERVICO)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':NOME_SERVICO', $this->model->__get('NOME_SERVICO'));
    $stmt->bindValue(':PRECO_SERVICO', (float)$this->model->__get('PRECO_SERVICO'));
    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Serviço adicionado com sucesso!'
    ];
  }

  public function editarServico() {
    $insert =  'UPDATE SERVICOS SET NOME_SERVICO = :NOME_SERVICO, PRECO_SERVICO = :PRECO_SERVICO WHERE ID_SERVICO = :ID_SERVICO';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':NOME_SERVICO', $this->model->__get('NOME_SERVICO'));
    $stmt->bindValue(':PRECO_SERVICO', (float)$this->model->__get('PRECO_SERVICO'));
    $stmt->bindValue(':ID_SERVICO', (int)$this->model->__get('ID_SERVICO'));

    $stmt->execute();

    return [
      'retorno' => 'success',
      'mensagem' => 'Serviço editado com sucesso!'
    ];
  }
}
