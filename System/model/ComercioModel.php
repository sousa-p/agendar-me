<?php

namespace System\Model;

class ComercioModel
{
  private $ID_COMERCIO;
  private $NOME_COMERCIO;
  private $TEL_COMERCIO;
  private $CNPJ_COMERCIO;
  private $ULTIMA_DATA_DOACAO;
  private $SENHA_COMERCIO;
  private $SECRET_COMERCIO;

  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
