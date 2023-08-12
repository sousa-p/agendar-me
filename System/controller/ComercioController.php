<?php
namespace System\Controller;

require_once './controller/CheckFields.php';
class ComercioController
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
    foreach ($data as $atributo => $valor) {
      $this->model->__set($atributo, $valor);
    }
  }

  public function login()
  {
    $data = [
      'TEL_COMERCIO' => limparDados($this->TEL_COMERCIO),
      'CNPJ_COMERCIO' => limparDados($this->CNPJ_COMERCIO),
      'SENHA_COMERCIO' => limparDados($this->SENHA_COMERCIO)
    ];
    if (temDadosVazios($data)) respostaHost('error', 'Verifique se todos os campos de login estão preenchidos');
    $this->colocarDadosModel($data);
    if (!ehTelefoneValido($data['TEL_COMERCIO'])) respostaHost('error', 'Formato de telefone de úsuario inválido');
    if (!ehCnpjValido($data['CNPJ_COMERCIO'])) respostaHost('error', 'Formato de Cnpj inválido');

    echo json_encode($this->service->checarInfosLogin());
    exit();
  }

  public function validarToken($bearer)
  {
    $bearer = limparDados($bearer);
    if (!ehDadoValido($bearer))
      respostaHost('error', 'Algo deu errado :(');

    $parts = explode('.', $bearer);
    if (count($parts) != 3)
      respostaHost('access_error', 'Algo deu errado :(');

    $header = $parts[0];
    $payload = $parts[1];
    $dataToken = json_decode(base64_decode(limparDados($payload)));

    if (!isset($dataToken->ID_COMERCIO) || !ehDadoValido($dataToken->ID_COMERCIO))
      respostaHost('error', 'Token de acesso inválido');

    $this->model->__set('ID_COMERCIO', (int)$dataToken->ID_COMERCIO);
    $this->model->__set('SECRET_COMERCIO', $this->service->getSecret());

    if (!ehDadoValido($this->model->__get('SECRET_COMERCIO')) || !$this->model->__get('SECRET_COMERCIO')) respostaHost('access_error', 'Token de acesso inválido');

    $signature = hash_hmac('sha256', $header . '.' . $payload, $this->model->__get('SECRET_COMERCIO'));

    if ($parts[2] != $signature)
      respostaHost('access_error', 'Token de acesso inválido');

    $dataToken = json_decode(base64_decode(limparDados($payload)));
    if (!isset($dataToken->exp) || !ehDadoValido($dataToken->exp))
      respostaHost('access_error', 'Token de acesso inválido');
    if (!isset($dataToken->IP) || !ehDadoValido($dataToken->IP))
      respostaHost('access_error', 'Token de acesso inválido');

    $exp = (int)$dataToken->exp;
    $ipToken = limparDados($dataToken->IP);
    unset($dataToken->exp);
    unset($dataToken->IP);

    if (time() > (int)$exp)
      respostaHost('access_error', 'Token de acesso expirou');
    if (password_verify($ipToken, $this->service->getIp()))
      respostaHost('access_error', 'Token de acesso negado');
    $this->colocarDadosModel($dataToken);
  }

  public function getClientes() {
    if ($this->model->__get('AUTOR') !== 'Comercio') respostaHost('error', 'Sem permissão');
    
    echo json_encode($this->service->getClientes());
    exit();
  }
}