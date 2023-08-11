<?php

namespace System\Controller;

require_once './controller/CheckFields.php';

class RestricaoController
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

  public function colocarDadosModel($data)
  {
    foreach ($data as $chave => $valor) {
      $this->model->__set($chave, $valor);
    }
  }

  public function getRestricoesData()
  {
    $data = [
      'DATA_AGENDAMENTO' => limparDados($this->DATA_AGENDAMENTO),
    ];

    if (!ehDataValida($data['DATA_AGENDAMENTO'])) respostaHost('error', 'Data inválida');

    $this->colocarDadosModel($data);
    echo json_encode($this->service->getTodasRestricoesNaData());
    exit();
  }

  public function getDiasRestricoes()
  {
    $response = [
      'DIAS_SEMANA' => $this->service->getTodosDiasSemana(),
      'INTERVALOS' => $this->service->getTodasDatas(),
      'DATAS_ESPECIAIS' => $this->service->getTodasDatasEspeciais()
    ];
    echo json_encode($response);
    exit();
  }

  public function restringirHorario()
  {
    $data = [
      'DATA' => limparDados($this->DATA),
      'HORARIO' => limparDados($this->HORARIO)
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if (!ehDataValida($data['DATA'])) respostaHost('error', 'Data inválida');
    if (!ehHoraValida($data['HORARIO'])) respostaHost('error', 'Horário inválido');

    $this->colocarDadosModel($data);
    echo json_encode($this->service->restringirHorario());
    exit();
  }

  public function tirarRestricaoHorario ()
  {
    $data = [
      'DATA' => limparDados($this->DATA),
      'HORARIO' => limparDados($this->HORARIO)
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if (!ehDataValida($data['DATA'])) respostaHost('error', 'Data inválida');
    if (!ehHoraValida($data['HORARIO'])) respostaHost('error', 'Horário inválido');

    $this->colocarDadosModel($data);
    echo json_encode($this->service->tirarRestricaoHorario());
    exit();
  }
}
