<?php

namespace System\Service;

class UserService
{
  private $conn;
  private $model;

  public function __construct($conn, $model)
  {
    $this->conn = $conn;
    $this->model = $model;
  }

  public function save()
  {
    $insert = 'INSERT INTO USER VALUES (0, :NOME_USER, :TEL_USER, :EMAIL_USER, :SENHA_USER)';
    $stmt = $this->conn->prepare($insert);
    $stmt->bindValue(':NOME_USER', $this->model->__get('NOME_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':SENHA_USER', $this->model->__get('SENHA_USER'));
    $stmt->execute();
  }

  public function getId()
  {
    $select = 'SELECT ID_USER FROM USER WHERE EMAIL_USER = :EMAIL_USER AND TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return $stmt->fetch();
  }

  public function emailDisponivel()
  {

    $select = 'SELECT * FROM USER WHERE EMAIL_USER = :EMAIL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':EMAIL_USER', $this->model->__get('EMAIL_USER'));
    $stmt->execute();
    return !$stmt->fetch();
  }

  public function telDisponivel()
  {
    $select = 'SELECT * FROM USER WHERE TEL_USER = :TEL_USER';
    $stmt = $this->conn->prepare($select);
    $stmt->bindValue(':TEL_USER', $this->model->__get('TEL_USER'));
    $stmt->execute();
    return !$stmt->fetch();
  }

  public function checkLogin()
  {
    return true;
  }
}
