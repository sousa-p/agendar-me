<?php

namespace System\Controller;

require './controller/CheckFields.php';
class UserController
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

  public function cadastrar()
  {
    $data = [
      'NOME_USER' => $this->NOME_USER,
      'TEL_USER' => $this->TEL_USER,
      'EMAIL_USER' => $this->EMAIL_USER,
      'SENHA_USER' => $this->SENHA_USER
    ];
    $dadosVazios = false;
    foreach ($data as $chave => $valor) {
      if (!ehDadoValido($valor)) {
        $aux = ($dadosVazios) ? ', ' : '';
        $dadosVazios .=  $aux . $chave . ' é inválido';
      }
    }
    if (!$dadosVazios) {
      if (!ehStrValida($data['NOME_USER']))
        respostaHost('error', 'Nome de úsuario inválido');
      if (!ehTelefoneValido($data['TEL_USER']))
        respostaHost('error', 'Formato de telefone de úsuario inválido');
      if (!ehEmailValido($data['EMAIL_USER']))
        respostaHost('error', 'Formato de email de úsuario inválido');
      if (!ehStrValida($data['SENHA_USER']))
        respostaHost('error', 'Formato de senha inválido');
    } else {
      respostaHost('error', $dadosVazios);
    }
    $data['SENHA_USER'] = password_hash($data['SENHA_USER'], PASSWORD_DEFAULT);
    foreach ($data as $atributo => $valor) {
      $this->model->__set($atributo, $valor);
    }
    if (!$this->service->emailDisponivel())
      respostaHost('error', 'Email já esta em uso');
    if (!$this->service->telDisponivel())
      respostaHost('error', 'Telefone ja esta em uso');
    $this->service->save();
    respostaHost('success', 'Cadastro realizado com sucesso');
  }

  public function login()
  {
    return true;
  }
}
