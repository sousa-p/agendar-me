<?php

namespace System\Model;

class ServicosModel
{
  private $ID_SERVICO;
  private $NOME_SERVICO;
  private $PRECO_SERVICO;
  private $ID_USER;

  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
