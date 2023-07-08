<?php

namespace System\Model;

class UserModel
{
  private $ID_USER;
  private $NOME_USER;
  private $TEL_USER;
  private $EMAIL_USER;
  private $SENHA_USER;

  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
