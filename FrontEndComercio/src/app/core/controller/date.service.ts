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

  getISOTodayDate(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  isValideDate(dateString: string): boolean {
    return isValid(parseISO(dateString));
  }

  isValidateHour(horaString: string): boolean {
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return regex.test(horaString);
  }

  isPastDate(dateString: string, considerarHoras: boolean=false): boolean {
    const now = new Date();
    const date = new Date(dateString);

    if (!considerarHoras) {
      now.setHours(0, 0, 0, 0);
      date.setHours(24, 0, 0, 0);
    }
    return isBefore(date, now);
  }

  getUltimaDataAgendamento(): string {
    const now = new Date();
    return format(addDays(now, 30), 'yyyy-MM-dd');
  }

  estaIntervaloData(
    date: Date,
    inicio: Date | null,
    fim: Date | null
  ): boolean {
    return (
      inicio != null && isAfter(date, inicio) && (!fim || isBefore(fim, date))
    );
  }

  estaIntervaloHorario(horario: Date, inicio: Date, fim: Date | null): boolean {
    return (
      (isEqual(horario, inicio) || isAfter(horario, inicio)) &&
      (!fim || isEqual(horario, fim) || isBefore(horario, fim))
    );
  }

  horaStringToDate(horario: string): Date {
    const [hora, minuto] = horario.split(':');
    return setMinutes(
      setHours(startOfDay(new Date()), parseInt(hora)),
      parseInt(minuto)
    );
  }

  getQtddMaxHorarios(intervalo: number): number {
    return (24 * 60) / intervalo;
  }

  gerarHorarios(
    intervalo: number,
    restricoes: any,
    agendamentos: any
  ): string[] {
    const horarios: any = [];
    let ultimoHorario = addMinutes(startOfDay(new Date()), -intervalo);

    for (let i = 0; i < this.getQtddMaxHorarios(intervalo); i++) {
      const horario = addMinutes(ultimoHorario, intervalo);

      const ehValido = restricoes.every((res: any) => {
        const hInicio = res.HORARIO_INICIO;
        const hFim = res.HORARIO_FIM;

        const inicio = this.horaStringToDate(hInicio);
        const fim = hFim ? this.horaStringToDate(hFim) : null;

        return !this.estaIntervaloHorario(horario, inicio, fim);
      });
      
      const estaAgendado = agendamentos.includes(
        format(horario, 'HH:mm') + ':00'
      );

      if (!estaAgendado) {
        horarios.push({
          horas: format(horario, 'HH:mm'),
          restrito: !ehValido
        })
      }

      ultimoHorario = horario;
    }

    return horarios;
  }

  formatarDataString(dateString: string | undefined, formatString: string): string {
    if (typeof(dateString) === 'undefined')
      return 'errorToParse';
    return format(parseISO(dateString), formatString);
  }

  ehDepois (date: Date, dateCompare: Date): boolean {
    return isAfter(date, dateCompare);
  }
}
