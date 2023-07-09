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

  public function colocarDadosModel($data)
  {
    foreach ($data as $atributo => $valor) {
      $this->model->__set($atributo, $valor);
    }
  }

  public function cadastrar()
  {
    $data = [
      'NOME_USER' => limparDados($this->NOME_USER),
      'TEL_USER' => limparDados($this->TEL_USER),
      'EMAIL_USER' => limparDados($this->EMAIL_USER),
      'SENHA_USER' => limparDados($this->SENHA_USER)
    ];

    // Validação de dados
    if (verificarDadosVazios($data)) respostaHost('error', 'Verifique se todos os campos de cadastro estão preenchidos');
    if (!ehStrValida($data['NOME_USER'])) respostaHost('error', 'Nome de úsuario inválido');
    if (!ehTelefoneValido($data['TEL_USER'])) respostaHost('error', 'Formato de telefone de úsuario inválido');
    if (!ehEmailValido($data['EMAIL_USER'])) respostaHost('error', 'Formato de email de úsuario inválido');
    if (!ehStrValida($data['SENHA_USER'])) respostaHost('error', 'Formato de senha inválido');

    $data['SENHA_USER'] = password_hash($data['SENHA_USER'], PASSWORD_DEFAULT);
    $this->colocarDadosModel($data);

    if (!$this->service->telDisponivel()) respostaHost('error', 'Telefone ja esta em uso');
    if (!$this->service->emailDisponivel()) respostaHost('error', 'Email já esta em uso');

    $this->service->save();
    respostaHost('success', 'Cadastro realizado com sucesso');
  }

  public function login()
  {
    $data = [
      'TEL_USER' => limparDados($this->TEL_USER),
      'EMAIL_USER' => limparDados($this->EMAIL_USER),
      'SENHA_USER' => limparDados($this->SENHA_USER)
    ];
    if (verificarDadosVazios($data)) respostaHost('error', 'Verifique se todos os campos de login estão preenchidos');
    $this->colocarDadosModel($data);
    if ($this->service->telDisponivel()) respostaHost('error', 'Telefone não cadastrado');
    if ($this->service->emailDisponivel()) respostaHost('error', 'Email não cadastrado');
    
    echo json_encode($this->service->checarLogin());
    exit();
  }
}
