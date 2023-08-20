<?php
date_default_timezone_set('America/Sao_Paulo');

function limparDados($data): String
{
  return strip_tags(stripcslashes(trim((String)$data)));
}

function ehDadoValido($data): bool
{
  return !empty($data) && !is_null($data) && $data !== 'null';
}

function ehTelefoneValido(String $tel): bool
{
  $charsEspeciais = ['.', '/', '(', ')', '-', '+', ' '];
  $tel = str_replace($charsEspeciais, '', $tel);
  $regexTel = '/^[1-9]{2}9?[0-9]{8}/';
  return preg_match($regexTel, $tel) && strlen($tel) === 11;
}

function ehEmailValido(String $email): bool
{
  return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function ehStrValida($str): bool
{
  $regexStr = '/^[a-zA-Z 0-9 àáèéìíòóùúÀÁÈÉÌÍÒÓÙÚãõÃÕâêîôûÂÊÎÔÛçÇ]*$/';
  return is_string($str) && preg_match($regexStr, $str);
}

function respostaHost(String $tipo, String $mensagem): void
{
  echo json_encode([
    'retorno' => $tipo,
    'mensagem' => $mensagem
  ]);
  exit();
}

function temDadosVazios(Array $data): bool
{
  foreach ($data as $valor) {
    if (!ehDadoValido($valor)) return true;
  }
  return false;
}

function ehDataValida(String $data): bool
{
  $explodedData = explode('-', $data);
  $mes = $explodedData[1];
  $dia = $explodedData[2];
  $ano = $explodedData[0];
  return checkdate($mes, $dia, $ano);
}

function ehDataPassado(String $data): bool
{
  $now = date('Y-m-d');
  return strtotime($now) > strtotime($data);
}

function ehDataDepois(String $data, String $dataCompare): bool
{
  return strtotime($data) > strtotime($dataCompare);
}

function ehDataHoje(String $data): bool
{
  $now = date('Y-m-d');
  return strtotime($now) === strtotime($data);
}

function ehHoraPassado(String $hora, int $dataMax): bool
{
  return strtotime($hora) < $dataMax;
}

function ehHoraValida(String $hora): bool
{
  return date('H:i', strtotime($hora)) === $hora;
}

function ehHoraPossivelIntervalo(String $hora, int $intervaloMin): bool
{
  $hora = strtotime($hora) / 60;
  $intervaloMin = (int)$intervaloMin;
  return ($hora % $intervaloMin) === 0;
}

function calcIntervaloData(String $data, String $hora = '00:00:00', String $formato = 'days'): int
{
  $now = new DateTime();
  $intervalo = $now->diff(new DateTime("$data $hora"));

  return $intervalo->$formato;
}

function ehCnpjValido(String $cnpj): bool
{
  $regexCnpj = "/^\d{14}$/";
  return preg_match($regexCnpj, $cnpj);
}
