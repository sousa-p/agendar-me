<?php

namespace System\Controller;

class ServicosController
{
  private $model;
  private $service;

  public function __construct($data, $model, $service)
  {
    foreach ($data as $chave => $value) {
      $this->$chave = $value;
    }
    $this->model = $model;
    $this->service = $service;
  }

  public function colocarDadosModel($data)
  {
    foreach ($data as $chave => $valor) {
      $this->model->__set($chave, $valor);
    }
  }

  public function getServicos()
  {
    echo json_encode($this->service->getTodosServicos());
    exit();
  }


  public function getServicosAgendamento()
  {
    $data = [
      'ID_USER' => $this->model->ID_USER,
      'ID_AGENDAMENTO' => $this->ID_AGENDAMENTO
    ];

    if (!ehDadoValido($data['ID_USER'])) respostaHost('error', 'Algo deu errado :(');
    if (!ehDadoValido($data['ID_AGENDAMENTO'])) respostaHost('error', 'Algo deu errado :(');

    $this->model->__set('ID_AGENDAMENTO', (int)$data['ID_AGENDAMENTO']);

    echo json_encode($this->service->getTodosServicosAgendamento());
    exit();
  }

  public function getServicosAgendamentoCliente()
  {
    $data = [
      'ID_AGENDAMENTO' => $this->ID_AGENDAMENTO
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if (!ehDadoValido($data['ID_AGENDAMENTO'])) respostaHost('error', 'Algo deu errado :(');

    $this->model->__set('ID_AGENDAMENTO', (int)$data['ID_AGENDAMENTO']);

    echo json_encode($this->service->getTodosServicosAgendamentoCliente());
    exit();
  }
}
