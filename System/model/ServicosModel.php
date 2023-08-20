<?php

namespace System\Model;

class ServicosModel
{
  private int $ID_SERVICO;
  private String $NOME_SERVICO;
  private float $PRECO_SERVICO;

  public function __get(String $atributo)
  {
    return $this->$atributo;
  }

  public function __set(String $atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
