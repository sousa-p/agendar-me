<?php

namespace System\Controller;

require_once './controller/CheckFields.php';

class RestricaoController
{
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
      'DATAS' => $this->service->getTodasDatas(),
      'DATAS_ESPECIAIS' => $this->service->getTodasDatasEspeciais()
    ];
    echo json_encode($response);
    exit();
  }
}
