<?php

namespace System\Model;

class RestricaoModel
{
  private $ID_RESTRICAO;
  private $INTERVALO_TEMPO;
  private $DIA_SEMANA;
  private $DATA_INICIO;
  private $DATA_FIM;

  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
