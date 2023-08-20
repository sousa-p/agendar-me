<?php

namespace System\Model;

class RestricaoModel
{
  private int $ID_RESTRICAO;
  private int $INTERVALO_TEMPO;
  private int $DIA_SEMANA;
  private String $DATA_INICIO;
  private String $DATA_FIM;

  public function __get(String $atributo)
  {
    return $this->$atributo;
  }

  public function __set(String $atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
