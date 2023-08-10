import { Servicos } from "./Servicos";

export interface Agendamento {
  ID_AGENDAMENTO?: number;
  DATA_CRIACAO_AGENDAMENTO?: string;
  DATA_AGENDAMENTO?: string;
  HORARIO_AGENDAMENTO: string;
  TIPO_PAGAMENTO?: string;
  SERVICOS?: Servicos[];
  NOME_USER?: string;
  TEL_USER?: string;
}
