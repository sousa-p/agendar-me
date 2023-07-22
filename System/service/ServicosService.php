<?php

namespace System\Service;

use PDO;

class ServicosService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function getTodosServicos()
  {
    $select = 'SELECT * FROM SERVICOS';
    $stmt = $this->conn->query($select);
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }
}
