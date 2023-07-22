<?php

namespace System\Controller;

class ServicosController
{
  private $model;
  private $service;

  public function __construct($data, $model, $service) {
    foreach($data as $chave => $value) {
      $this->$chave = $value;
    }
    $this->model = $model;
    $this->service = $service;
  }
}
