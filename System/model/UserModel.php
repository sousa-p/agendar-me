<?php
  namespace System\Controller;

  class UserModel {
    private $ID_USER;
    private $NOME_USER;
    private $TEL_USER;
    private $EMAIL_USER;
    private $SENHA_USER;

    public function __get($atribute){
      return $this->$atribute;
    }

    public function __set($atribute, $value){
        $this->$atribute = $value;
    }
  }
?>