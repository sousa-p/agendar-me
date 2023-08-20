<?php

namespace System\Model;

class AgendamentoModel
{
  private int $ID_AGENDAMENTO;
  private int $ID_USER;
  private String $DATA_CRIACAO_AGENDAMENTO;
  private String $DATA_AGENDAMENTO;
  private String $HORARIO_AGENDAMENTO;

  public function __get(String $atributo)
  {
    return $this->$atributo;
  }

  public function __set(String $atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}
