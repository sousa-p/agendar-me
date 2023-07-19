<?php

namespace System\Controller;

require_once './controller/CheckFields.php';
class AgendamentoController
{
  public function __construct($data, $model, $service)
  {
    foreach ($data as $chave => $valor) {
      $this->$chave = $valor;
    }
    $this->model = $model;
    $this->service = $service;
  }

  public function colocarDadosModel($data) {
    foreach ($data as $chave => $valor) {
      $this->model->__set($chave, $valor);
    }
  }

  public function getAgendamentosData()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO)
    ];
    if(!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data inválida');
    $this->colocarDadosModel($data);
    echo json_encode($this->service->getTodosAgendamentosData());
    exit();
  }
}
