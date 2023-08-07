<?php

namespace System\Controller;

require_once './controller/CheckFields.php';
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
    if (temDadosVazios($data)) respostaHost('error', 'Verifique se todos os campos de cadastro estão preenchidos');
    if (!ehStrValida($data['NOME_USER'])) respostaHost('error', 'Nome de úsuario inválido');
    if (strlen($data['NOME_USER'] < 75)) respostaHost('error', 'Nome muito longo :(');
    if (!ehTelefoneValido($data['TEL_USER'])) respostaHost('error', 'Formato de telefone de úsuario inválido');
    if (strlen($data['EMAIL_USER'] < 150)) respostaHost('error', 'Email muito longo :(');
    if (!ehEmailValido($data['EMAIL_USER'])) respostaHost('error', 'Formato de email de úsuario inválido');
    if (strlen($data['SENHA_USER']) < 8) respostaHost('error', 'Senha deve conter 8 caracteres');

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
    if (temDadosVazios($data)) respostaHost('error', 'Verifique se todos os campos de login estão preenchidos');
    $this->colocarDadosModel($data);
    if (!ehTelefoneValido($data['TEL_USER'])) respostaHost('error', 'Formato de telefone de úsuario inválido');
    if (strlen($data['EMAIL_USER'] < 150)) respostaHost('error', 'Email muito longo :(');
    if (!ehEmailValido($data['EMAIL_USER'])) respostaHost('error', 'Formato de email de úsuario inválido');
    if ($this->service->telDisponivel()) respostaHost('error', 'Telefone não cadastrado');
    if ($this->service->emailDisponivel()) respostaHost('error', 'Email não cadastrado');

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


    if (!isset($dataToken->ID_USER) || !ehDadoValido($dataToken->ID_USER))
      respostaHost('error', 'Token de acesso inválido');

    $this->model->__set('ID_USER', (int)$dataToken->ID_USER);
    $this->model->__set('SECRET_USER', $this->service->getSecret());

    if(!ehDadoValido($this->model->__get('SECRET_USER')) || !$this->model->__get('SECRET_USER')) respostaHost('access_error', 'Token de acesso inválido');

    $signature = hash_hmac('sha256', $header . '.' . $payload, $this->model->__get('SECRET_USER'));

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

  public function getUserInfosId() {
    echo json_encode($this->service->getUserInfosId());
    exit();
  }

  public function alterarInfo() {
    $data = [
      'INFORMACAO' => limparDados($this->INFORMACAO),
      'VALOR' => $this->VALOR
    ];

    $infosValidas = ['NOME', 'EMAIL', 'TEL', 'SENHA'];
    if (!in_array($data['INFORMACAO'], $infosValidas)) respostaHost('error', 'Informação inválida');
    if ($data['INFORMACAO'] !== 'SENHA') $data['VALOR'] = limparDados($data['VALOR']);
    if ($data['INFORMACAO'] !== 'SENHA' && temDadosVazios($data)) respostaHost('error', 'Verifique se todos os campos estão preenchidos');
    if ($data['INFORMACAO'] === 'SENHA' && temDadosVazios($data['VALOR'])) respostaHost('error', 'Verifique se todos os campos estão preenchidos');
    if ($data['INFORMACAO'] === 'NOME' && !ehStrValida($data['VALOR'])) respostaHost('error', 'Nome de úsuario inválido');
    if ($data['INFORMACAO'] === 'TEL' && !ehTelefoneValido($data['VALOR'])) respostaHost('error', 'Formato de telefone de úsuario inválido');
    if ($data['INFORMACAO'] === 'EMAIL' && !ehEmailValido($data['VALOR'])) respostaHost('error', 'Formato de email de úsuario inválido');
    if ($data['INFORMACAO'] === 'SENHA' && strlen($data['VALOR']['ANTIGA_SENHA_USER']) < 8) respostaHost('error', 'Senha antiga deve conter 8 caracteres');
    if ($data['INFORMACAO'] === 'SENHA' && strlen($data['VALOR']['NOVA_SENHA_USER']) < 8) respostaHost('error', 'Senha nova deve conter 8 caracteres');

    $this->colocarDadosModel($data);
    $this->model->__set($data['INFORMACAO'].'_USER', $data['VALOR']);
    $metodo = 'alterar'.$data['INFORMACAO'];
    echo json_encode($this->service->$metodo());
    exit();
  } 
}