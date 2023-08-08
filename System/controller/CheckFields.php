<?php
date_default_timezone_set('America/Sao_Paulo');

function limparDados($data)
{
  return strip_tags(stripcslashes(trim((string)$data)));
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
  $regexStr = '/^[a-zA-Z 0-9 áéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÎÔÛçÇ]*$/';
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

function temDadosVazios($data)
{
  foreach ($data as $valor) {
    if (!ehDadoValido($valor)) return true;
  }
  return false;
}

function ehDataValida($data)
{
  $explodedData = explode('-', $data);
  $mes = $explodedData[1];
  $dia = $explodedData[2];
  $ano = $explodedData[0];
  return checkdate($mes, $dia, $ano);
}

function ehDataPassado($data)
{
  $now = date('Y-m-d');
  return strtotime($now) > strtotime($data);
}

function ehDataHoje($data)
{
  $now = date('Y-m-d');
  return strtotime($now) === strtotime($data);
}

function ehHoraPassado($hora, $dataMax)
{
  return strtotime($hora) < $dataMax;
}

function ehHoraValida($hora)
{
  return date('H:i', strtotime($hora)) === $hora;
}

function ehHoraPossivelIntervalo($hora, $intervaloMin)
{
  $hora = strtotime($hora) / 60;
  $intervaloMin = (int)$intervaloMin;
  return ($hora % $intervaloMin) === 0;
}

function calcIntervaloData($data, $hora = '00:00:00', $formato = 'days')
{
  $now = new DateTime();
  $intervalo = $now->diff(new DateTime("$data $hora"));

  return $intervalo->$formato;
}

function ehCnpjValido($cnpj)
{
  $regexCnpj = "/^\d{14}$/";
  return preg_match($regexCnpj, $cnpj);
}
