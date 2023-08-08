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

}