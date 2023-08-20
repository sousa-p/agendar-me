<?php

namespace System\Model;

class UserModel
{
  private int $ID_USER;
  private String $NOME_USER;
  private String $TEL_USER;
  private String $EMAIL_USER;
  private String | Array $SENHA_USER;
  private String $SECRET_USER;

  public function __get(String $atributo)
  {
    return $this->$atributo;
  }

  public function __set(String $atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
