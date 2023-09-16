<?php

namespace System\Controller;

use System\Model\AgendamentoModel;
use System\Service\AgendamentoService;

require_once './controller/CheckFields.php';
class AgendamentoController
{
  private AgendamentoModel $model;
  private AgendamentoService $service;

  public function __construct(array $data, AgendamentoModel $model, AgendamentoService $service)
  {
    foreach ($data as $chave => $valor) {
      $this->$chave = $valor;
    }
    $this->model = $model;
    $this->service = $service;
  }

  private function colocarDadosModel($data)
  {
    foreach ($data as $chave => $valor) {
      $this->model->__set($chave, $valor);
    }
  }

  public function getAgendamentosData()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO)
    ];
    if (!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data inválida');
    $this->colocarDadosModel($data);
    echo json_encode($this->service->getTodosAgendamentosData());
    exit();
  }

  public function realizarAgendamento()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO),
      'HORARIO_AGENDAMENTO' => limparDados($this->HORARIO_AGENDAMENTO),
      'SERVICOS_AGENDAMENTO' => limparDados($this->SERVICOS_AGENDAMENTO)
    ];
    $data['SERVICOS_AGENDAMENTO'] = json_decode($data['SERVICOS_AGENDAMENTO']);

    if (temDadosVazios($data['SERVICOS_AGENDAMENTO'])) respostaHost('error', 'Serviços de agendamento inválido');
    if (count($data['SERVICOS_AGENDAMENTO']) <= 0) respostaHost('error', 'Quantidade de serviços inválida');
    if (!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data agendamento inválida');
    if (ehDataPassado($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data agendamento do passado');
    if (!ehHoraValida($data['HORARIO_AGENDAMENTO'])) respostaHost('error', 'Hora agendamento inválida');
    if (ehDataHoje($data['DATA_AGENDAMENTO']) && ehHoraPassado($data['HORARIO_AGENDAMENTO'], '12:00')) respostaHost('error', 'Tarde demais...');
    if (!ehHoraPossivelIntervalo($data['HORARIO_AGENDAMENTO'], 30)) respostaHost('error', 'Hora mal formada');

    $this->colocarDadosModel($data);
    $agendamentos = $this->service->getTodosAgendamentosData();
    if (in_array($data['HORARIO_AGENDAMENTO'], $agendamentos)) respostaHost('error', 'Agendamento já existe, por favor atualize a página!');
    if ($this->service->ehDataRestrita()) respostaHost('error', 'Horário em restrição');
    if ($this->service->existeAgendamento()) respostaHost('error', 'Horário já em uso');

    echo json_encode($this->service->save());
    exit();
  }

  public function realizarAgendamentoEmNomeCliente()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO),
      'HORARIO_AGENDAMENTO' => limparDados($this->HORARIO_AGENDAMENTO),
      'ID_USER' => limparDados($this->ID_USER),
      'SERVICOS_AGENDAMENTO' => limparDados($this->SERVICOS_AGENDAMENTO)
    ];
    $data['ID_USER'] = (int)$data['ID_USER'];
    $data['SERVICOS_AGENDAMENTO'] = json_decode($data['SERVICOS_AGENDAMENTO']);

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if ($data['ID_USER'] < 0) respostaHost('error', 'Cliente inválido');
    if (temDadosVazios($data['SERVICOS_AGENDAMENTO'])) respostaHost('error', 'Serviços de agendamento inválido');
    if (count($data['SERVICOS_AGENDAMENTO']) <= 0) respostaHost('error', 'Quantidade de serviços inválida');
    if (!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data agendamento inválida');
    if (ehDataPassado($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data agendamento do passado');
    if (!ehHoraValida($data['HORARIO_AGENDAMENTO'])) respostaHost('error', 'Hora agendamento inválida');
    if (ehDataHoje($data['DATA_AGENDAMENTO']) && ehHoraPassado($data['HORARIO_AGENDAMENTO'], '12:00')) respostaHost('error', 'Tarde demais...');
    if (!ehHoraPossivelIntervalo($data['HORARIO_AGENDAMENTO'], 30)) respostaHost('error', 'Hora mal formada');

    $this->colocarDadosModel($data);
    $agendamentos = $this->service->getTodosAgendamentosData();
    if (in_array($data['HORARIO_AGENDAMENTO'], $agendamentos)) respostaHost('error', 'Agendamento já existe, por favor atualize a página!');
    if ($this->service->ehDataRestrita()) respostaHost('error', 'Horário em restrição');
    if ($this->service->existeAgendamento()) respostaHost('error', 'Horário já em uso');

    echo json_encode($this->service->save());
    exit();
  }

  public function getAgendamentosRealizados()
  {
    $agendamentosRealizados = $this->service->getAgendamentosRealizados();

    foreach ($agendamentosRealizados as $agendamento) {
      $agendamento->HORARIO_AGENDAMENTO = substr($agendamento->HORARIO_AGENDAMENTO, 0, -3);
    }

    echo json_encode($agendamentosRealizados);
    exit();
  }

  public function deleteAgendamento()
  {
    $data = [
      'ID_AGENDAMENTO' => (int)$this->ID_AGENDAMENTO
    ];

    if ($this->model->__get('AUTOR') !== 'User') respostaHost('error', 'Sem permissão');

    if (!ehDadoValido($data['ID_AGENDAMENTO'])) respostaHost('error', 'Algo deu errado :(');

    $this->colocarDadosModel($data);
    $agendamento = $this->service->getAgendamentoId();
    if (!$agendamento) respostaHost('error', 'Agendamento inválido');
    if (ehDataPassado($agendamento->DATA_AGENDAMENTO) || calcIntervaloData($agendamento->DATA_AGENDAMENTO, $agendamento->HORARIO_AGENDAMENTO) < 1) respostaHost('error', 'Agendamento só pode ser cancelado com 1 dia de antecedência');

    echo json_encode($this->service->deleteAgendamento());
    exit();
  }


  public function deleteAgendamentoComercio()
  {
    $data = [
      'ID_AGENDAMENTO' => (int)$this->ID_AGENDAMENTO
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if (!ehDadoValido($data['ID_AGENDAMENTO'])) respostaHost('error', 'Algo deu errado :(');

    $this->colocarDadosModel($data);
    echo json_encode($this->service->deleteAgendamentoComercio());
    exit();
  }

  public function ehDataRestrita()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO)
    ];

    if (!ehDadoValido($this->DATA_AGENDAMENTO)) respostaHost('error', 'Dados inválidos');
    if (!ehDataValida($this->DATA_AGENDAMENTO)) respostaHost('error', 'Data inválida');

    $this->colocarDadosModel($data);

    if ($this->service->ehDataRestrita()) respostaHost('error', 'É data restrita');

    respostaHost('success', 'Não é data restrita');
  }

  public function getAgendamentoInfos()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO),
      'HORARIO_AGENDAMENTO' => limparDados($this->HORARIO_AGENDAMENTO)
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if (temDadosVazios($data)) respostaHost('error', 'Dados vazios');
    if (!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data inválida');
    if (!ehHoraValida($data['HORARIO_AGENDAMENTO'])) respostaHost('error', 'Horário inválido');

    $this->colocarDadosModel($data);

    echo (json_encode($this->service->getAgendamentoInfos()));
    exit();
  }
}
