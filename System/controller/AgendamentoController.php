<?php

namespace System\Controller;

require_once './controller/CheckFields.php';
class AgendamentoController
{
  private $model;
  private $service;
  
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


  public function realizarAgendamento()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO),
      'HORARIO_AGENDAMENTO' => limparDados($this->HORARIO_AGENDAMENTO),
      'SERVICOS_AGENDAMENTO' => limparDados($this->SERVICOS_AGENDAMENTO)
    ];
    $data['SERVICOS_AGENDAMENTO'] = json_decode($data['SERVICOS_AGENDAMENTO']);
    
    if(temDadosVazios($data['SERVICOS_AGENDAMENTO'])) respostaHost('error', 'Serviços de agendamento inválido');
    if(count($data['SERVICOS_AGENDAMENTO']) <= 0) respostaHost('error', 'Quantidade de serviços inválida');
    if(!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data agendamento inválida');
    if(!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data agendamento inválida');
    if(ehDataPassado($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data agendamento inválida');
    if(!ehHoraValida($data['HORA_AGENDAMENTO'])) respostaHost('error', 'Hora agendamento inválida');
  }
}
