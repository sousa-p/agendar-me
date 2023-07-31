<?php
namespace System\Model;

class AgendamentoModel  {
  private $ID_AGENDAMENTO;
  private $ID_USER;
  private $DATA_CRIACAO_AGENDAMENTO;
  private $DATA_AGENDAMENTO;
  private $HORARIO_AGENDAMENTO;
  
  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function __set($atributo, $valor)
  {
    $this->$atributo = $valor;
  }
}