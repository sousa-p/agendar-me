import { Injectable } from '@angular/core';
import {
  addDays,
  format,
  parseISO,
  isValid,
  isAfter,
  isBefore,
  addMinutes,
  setMinutes,
  setHours,
  startOfDay,
  isEqual,
} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getISOTodayDate() {
    return format(new Date(), 'yyyy-MM-dd');
  }

  isValideDate(dateString: string): boolean {
    return isValid(parseISO(dateString));
  }

  isPastDate(dateString: string): boolean {
    const now = new Date();
    const date = new Date(dateString);
    now.setHours(0, 0, 0, 0);
    date.setHours(24, 0, 0, 0);
    return now.getTime() > date.getTime();
  }

  getUltimaDataAgendamento() {
    const now = new Date();
    return format(addDays(now, 30), 'yyyy-MM-dd');
  }

  estaIntervalo(date: string, inicio?: string, fim?: string) {
    return (
      inicio &&
      isAfter(parseISO(date), parseISO(inicio)) &&
      (!fim || isBefore(parseISO(fim), parseISO(date)))
    );
  }
  gerarHorarios(
    intervalo: number,
    restricoes: any,
    agendamentos: any
  ): string[] {
    const horarios: string[] = [];
    const inicio = startOfDay(new Date());
    const qtddMaxHorarios = (24 * 60) / intervalo;

    for (let i = 0; i < qtddMaxHorarios; i++) {
      const horario = addMinutes(inicio, i * intervalo);
      let ehValido = true;
      restricoes.forEach((restricao: any) => {
        const [iH, iM] = restricao.HORARIO_INICIO.split(':');
        const inicio = setMinutes(
          setHours(startOfDay(new Date()), parseInt(iH)),
          parseInt(iM)
        );
        const [fH, fM] = (restricao.HORARIO_FIM)
          ? restricao.HORARIO_FIM.split(':')
          : [null, null];
        const fim = setMinutes(
          setHours(startOfDay(new Date()), parseInt(fH)),
          parseInt(fM)
        );

        if (
          agendamentos.includes(horario) ||
          ((isEqual(horario, inicio) || isAfter(horario, inicio)) &&
            (!restricao.HORARIO_FIM ||
              isEqual(horario, inicio) ||
              isBefore(horario, fim)))
        )
          ehValido = false;
      });

      if (ehValido) horarios.push(format(horario, 'HH:mm'));
    }

    return horarios;
  }
}
