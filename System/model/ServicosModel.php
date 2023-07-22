<?php

namespace System\Model;

class ServicosModal
{
  private $ID_SERVICO;
  private $NOME_SERVICO;
  private $DESC_SERVICO;
  private $PRECO_SERVICO;
  private $DURACAO_SERVICO;

  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
