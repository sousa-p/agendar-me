<?php

namespace System\Controller;

use System\Model\RestricaoModel;
use System\Service\RestricaoService;

require_once './controller/CheckFields.php';

class RestricaoController
{
  private RestricaoModel $model;
  private RestricaoService $service;

  public function __construct(Array $data, RestricaoModel $model, RestricaoService $service)
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

  public function tirarRestricaoHorario()
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

  public function getRestricoesSemanais()
  {
    echo json_encode($this->service->getRestricoesSemanais());
    exit();
  }

  public function restringirDiaSemana()
  {
    $data = [
      'DIA_SEMANA' => $this->DIA_SEMANA
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if ((int)$data['DIA_SEMANA'] < 0 && (int)$data['DIA_SEMANA'] > 6) respostaHost('error', 'Dia da semana inválida');

    $this->model->__set('DIA_SEMANA', (int)$data['DIA_SEMANA']);

    echo json_encode($this->service->restringirDiaSemana());
    exit();
  }

  public function tirarRestricaoDiaSemana()
  {
    $data = [
      'DIA_SEMANA' => $this->DIA_SEMANA
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if ((int)$data['DIA_SEMANA'] < 0 && (int)$data['DIA_SEMANA'] > 6) respostaHost('error', 'Dia da semana inválida');

    $this->model->__set('DIA_SEMANA', (int)$data['DIA_SEMANA']);

    echo json_encode($this->service->tirarRestricaoDiaSemana());
    exit();
  }

  public function getTodasDatasEspeciais()
  {
    echo json_encode($this->service->getTodasDatasEspeciais());
    exit();
  }

  public function adicionarDataEspecial()
  {
    $data = [
      'DATA_ESPECIAL' => limparDados($this->DATA_ESPECIAL)
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if (!ehDataValida($data['DATA_ESPECIAL'])) respostaHost('error', 'Data inválida');
    if (ehDataPassado($data['DATA_ESPECIAL'])) respostaHost('error', 'Data inválida');

    $this->colocarDadosModel($data);

    if ($this->service->ehDataEspecial()) respostaHost('error', 'Data especial já cadastrada!');

    echo json_encode($this->service->adicionarDataEspecial());
    exit();
  }

  public function removerDataEspecial()
  {
    $data = [
      'DATA_ESPECIAL' => limparDados($this->DATA_ESPECIAL)
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');

    $this->model->__set('DATA_ESPECIAL', $data['DATA_ESPECIAL']);

    echo json_encode($this->service->removerDataEspecial());
    exit();
  }

  public function getTodasRestricoesDeData()
  {
    echo json_encode($this->service->getTodasDatas());
    exit();
  }

  public function removerRestricao()
  {
    $data = [
      'ID_RESTRICAO' => (int)$this->ID_RESTRICAO
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');

    $this->model->__set('ID_RESTRICAO', $data['ID_RESTRICAO']);

    echo json_encode($this->service->removerRestricao());
    exit();
  }

  public function adicionarRestricaoData()
  {
    $data = [
      'DATA_INICIO' => limparDados($this->DATA_INICIO),
      'DATA_FIM' => limparDados($this->DATA_FIM)
    ];

    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    if (!ehDataValida($data['DATA_INICIO'])) respostaHost('error', 'Data de início inválido');
    if (!ehDataValida($data['DATA_FIM'])) respostaHost('error', 'Data de fim inválido');
    if (ehDataPassado($data['DATA_INICIO'])) respostaHost('error', 'Data inválida');
    if (ehDataDepois($data['DATA_INICIO'], $data['DATA_FIM'])) respostaHost('error', 'Data de início deve ser anterior a data de fim');

    $this->colocarDadosModel($data);

    echo json_encode($this->service->adicionarRestricaoData());
    exit();
  }

  public function getTodasRestricoesDeHorario()
  {
    echo json_encode($this->service->getTodasRestricoesDeHorario());
    exit();
  }

  public function adicionarRestricaoHorario()
  {
    $data = [
      'DATA_INICIO' => limparDados($this->DATA_INICIO),
      'HORARIO_INICIO' => limparDados($this->HORARIO_INICIO),
      'HORARIO_FIM' => limparDados($this->HORARIO_FIM),
    ];

    if (temDadosVazios($data)) respostaHost('error', 'Dados inválidos');
    if (!ehDataValida($data['DATA_INICIO'])) respostaHost('error', 'Data de início é inválida');

    if (isset($this->DATA_FIM)) {
      $data['DATA_FIM'] = limparDados($this->DATA_FIM);
      if (!ehDadoValido($data['DATA_FIM'])) respostaHost('error', 'Dados inválidos');
      if (!ehDataValida($data['DATA_FIM'])) respostaHost('error', 'Data de fim inválida');
      if (ehDataDepois($data['DATA_INICIO'], $data['DATA_FIM'])) respostaHost('error', 'Data início tem que ser anterior a de fim');
    } else {
      $data['DATA_FIM'] = null;
    }

    if (!ehHoraValida($data['HORARIO_INICIO'])) respostaHost('error', 'Hora de início inválida');
    if (!ehHoraValida($data['HORARIO_FIM'])) respostaHost('error', 'Hora de fim inválida');
    if (ehDataDepois($data['HORARIO_INICIO'], $data['HORARIO_FIM'])) respostaHost('error', 'Hora de início deve ser anterior a de fim');

    $this->colocarDadosModel($data);

    echo json_encode($this->service->adicionarRestricaoHorario());
    exit();
  }
}
