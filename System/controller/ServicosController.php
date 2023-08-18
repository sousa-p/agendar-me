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

  public function deletarServico()
  {
    $data = [
      'ID_SERVICO' => $this->ID_SERVICO
    ];

    if (!ehDadoValido($data['ID_SERVICO'])) respostaHost('error', 'Dados inválidos');
    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');

    $this->model->__set('ID_SERVICO', (int)$data['ID_SERVICO']);

    echo json_encode($this->service->deletarServico());
    exit();
  }

  public function adicionarServico()
  {
    $data = [
      'NOME_SERVICO' => limparDados($this->NOME_SERVICO),
      'PRECO_SERVICO' => (float)$this->PRECO_SERVICO
    ];

    if (!ehDadoValido($data['PRECO_SERVICO'])) respostaHost('error', 'Dados inváldos');
    if (($this->model->__get('AUTOR')!== 'Comercio')) respostaHost('error', 'Sem permissão');
    if (strlen($data['NOME_SERVICO']) > 75) respostaHost('error', 'Nome de serviço muito longo');
    if (!ehStrValida($data['NOME_SERVICO'])) respostaHost('error', 'Nome inválido');
    if ((float)$data['PRECO_SERVICO'] < 0) respostaHost('error', 'Preço de serviço inválido');
    if ((float)$data['PRECO_SERVICO'] > 999999999) respostaHost('error', 'Preço de serviço inválido');


    $data['NOME_SERVICO'] = ucwords(strtolower($data['NOME_SERVICO']));

    $this->colocarDadosModel($data);

    echo json_encode($this->service->adicionarServico());
    exit();
  }

  public function editarServico() {
    $data = [
      'NOME_SERVICO' => limparDados($this->NOME_SERVICO),
      'PRECO_SERVICO' => (float)$this->PRECO_SERVICO,
      'ID_SERVICO' => (int)$this->ID_SERVICO
    ];

    if (!ehDadoValido($data['ID_SERVICO'])) respostaHost('error', 'Dados inválidos');
    if (!ehDadoValido($data['PRECO_SERVICO'])) respostaHost('error', 'Dados inválidos');
    if (($this->model->__get('AUTOR')!== 'Comercio')) respostaHost('error', 'Sem permissão');
    if (strlen($data['NOME_SERVICO']) > 75) respostaHost('error', 'Nome de serviço muito longo');
    if (!ehStrValida($data['NOME_SERVICO'])) respostaHost('error', 'Nome inválido');
    if ((float)$data['PRECO_SERVICO'] < 0) respostaHost('error', 'Preço de serviço inválido');
    if ((float)$data['PRECO_SERVICO'] > 999999999) respostaHost('error', 'Preço de serviço inválido');


    $data['NOME_SERVICO'] = ucwords(strtolower($data['NOME_SERVICO']));

    $this->colocarDadosModel($data);

    echo json_encode($this->service->editarServico());
    exit();
  }
}
