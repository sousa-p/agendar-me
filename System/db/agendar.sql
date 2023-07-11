CREATE DATABASE AGENDAR;
USE AGENDAR;

DROP TABLE IF EXISTS COMERCIO;
CREATE TABLE COMERCIO (
  ID_COMERCIO PRIMARY KEY INT AUTO_INCREMENT,
  CNPJ CHAR (14) UNIQUE,
  NOME_COMERCIO VARCHAR (75) NOT NULL,
  EMAIL_COMERCIO VARCHAR (150) NOT NULL UNIQUE,
  SENHA_COMERCIO CHAR (64) NOT NULL,
  ULTIMA_DATA_DOACAO DATE
  INFORMACAO TEXT,
  LOGO TEXT
);

DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
  ID_USER INT AUTO_INCREMENT PRIMARY KEY,
  NOME_USER VARCHAR (75),
  TEL_USER CHAR (11) NOT NULL UNIQUE,
  EMAIL_USER VARCHAR (150) UNIQUE,
  SENHA_USER CHAR (64) NOT NULL,
  SECRET_USER VARCHAR(44) NOT NULL
);

DROP TABLE IF EXISTS AGENDAMENTO;
CREATE TABLE AGENDAMENTO (
  ID_AGENDAMENTO INT AUTO_INCREMENT PRIMARY KEY,
  ID_USER INT NOT NULL REFERENCES COMERCIO (ID_USER_COMERCIO),
  DATA_CRIACAO_AGENDAMENTO DATE,
  DATA_AGENDAMENTO DATE,
  STATUS_AGENDAMENTO ENUM("FINALIZADO", "EM ANDAMENTO", "PROCESSANDO", "CANCELADO"),
  TIPO_PAGAMENTO ENUM("PIX", "CRÉDITO", "DÉBITO", "DINHEIRO VIVO")
);

DROP TABLE IF EXISTS RESTRICOES;
CREATE TABLE RESTRICOES (
  ID_RESTRICOES INT AUTO_INCREMENT PRIMARY KEY,
  INTERVALO_TEMPO INT DEFAULT 0,
  DATA_INICIO DATE NOT NULL,
  DATA_FIM DATE
);

DROP TABLE iF EXISTS SERVICO;
CREATE TABLE SERVICO (
  ID_SERVICO INT AUTO_INCREMENT PRIMARY KEY,
  NOME_SERVICO VARCHAR(75) NOT NULL,
  DESC_SERVICO TEXT,
  PRECO DECIMAL(11,2) DEFAULT 0,
  DURACAO INT NOT NULL
);

DROP TABLE iF EXISTS SERVICO_AGENDAMENTOS;
CREATE TABLE SERVICO_AGENDAMENTOS (
  ID_SERVICO INT NOT NULL REFERENCES SERVICO(ID_SERVICO),
  ID_AGENDAMENTO INT NOT NULL REFERENCES AGENDAMENTO(ID_AGENDAMENTO)
);