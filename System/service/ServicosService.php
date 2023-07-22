<?php

namespace System\Service;

class ServicosService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }
}
