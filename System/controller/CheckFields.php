<?php
function limparDados($data)
{
  return strip_tags(stripcslashes(trim($data)));
}

function ehDadoValido($data)
{
  return !empty($data) && !is_null($data) && $data !== 'null';
}

function ehTelefoneValido($tel)
{
  $charsEspeciais = ['.', '/', '(', ')', '-', '+', ' '];
  $tel = str_replace($charsEspeciais, '', $tel);
  $regexTel = '/^[1-9]{2}9?[0-9]{8}/';
  return preg_match($regexTel, $tel);
}

function ehEmailValido($email)
{
  return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function ehStrValida($str)
{
  $regexStr = '/^[a-zA-Z áéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÎÔÛçÇ]*$/';
  return is_string($str) && preg_match($regexStr, $str);
}

function respostaHost($tipo, $mensagem)
{
  echo json_encode([
    'retorno' => $tipo,
    'mensagem' => $mensagem
  ]);
  exit();
}

function verificarDadosVazios($data)
{
  foreach ($data as $valor) {
    if (!ehDadoValido($valor)) return true;
  }
  return false;
}

function ehDataValida($data) {
  $explodedData = explode('-', $data);
  $mes = $explodedData[1];
  $dia = $explodedData[2];
  $ano = $explodedData[0];
  return checkdate($mes, $ano, $dia);
}

function ehHoraValida($hora) {
  return DateTime::createFromFormat('!H:i', $hora) === $hora;
}