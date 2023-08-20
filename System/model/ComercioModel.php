<?php

namespace System\Model;

class ComercioModel
{
  private int $ID_COMERCIO;
  private String $NOME_COMERCIO;
  private String $TEL_COMERCIO;
  private String $CNPJ_COMERCIO;
  private String $ULTIMA_DATA_DOACAO;
  private String $SENHA_COMERCIO;
  private String $SECRET_COMERCIO;

  public function __get(String $atributo)
  {
    return $this->$atributo;
  }

  public function __set(String $atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
