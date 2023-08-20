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

  public getISOTodayDate(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  public isValideDate(dateString: string): boolean {
    return isValid(parseISO(dateString));
  }

  public isPastDate(dateString: string, considerarHoras: boolean=false): boolean {
    const now = new Date();
    const date = new Date(dateString);

    if (!considerarHoras) {
      now.setHours(0, 0, 0, 0);
      date.setHours(24, 0, 0, 0);
    }
    return isBefore(date, now);
  }

  public getUltimaDataAgendamento(): string {
    const now = new Date();
    return format(addDays(now, 30), 'yyyy-MM-dd');
  }

  public estaIntervaloData(
    date: Date,
    inicio: Date | null,
    fim: Date | null
  ): boolean {
    return (
      inicio != null && isAfter(date, inicio) && (!fim || isBefore(fim, date))
    );
  }

  private estaIntervaloHorario(horario: Date, inicio: Date, fim: Date | null): boolean {
    return (
      (isEqual(horario, inicio) || isAfter(horario, inicio)) &&
      (!fim || isEqual(horario, fim) || isBefore(horario, fim))
    );
  }

  public horaStringToDate(horario: string): Date {
    const [hora, minuto] = horario.split(':');
    return setMinutes(
      setHours(startOfDay(new Date()), parseInt(hora)),
      parseInt(minuto)
    );
  }

  private getQtddMaxHorarios(intervalo: number): number {
    return (24 * 60) / intervalo;
  }

  public gerarHorarios(
    intervalo: number,
    restricoes: any,
    horasEspeciais: string[],
    agendamentos: any
  ): string[] {
    const horarios: string[] = [];
    let ultimoHorario = addMinutes(startOfDay(new Date()), -intervalo);

    for (let i = 0; i < this.getQtddMaxHorarios(intervalo); i++) {
      const horario = addMinutes(ultimoHorario, intervalo);

      const ehValido = restricoes.every((res: any) => {
        const hInicio = res.HORARIO_INICIO;
        const hFim = res.HORARIO_FIM;

        const inicio = this.horaStringToDate(hInicio);
        const fim = hFim ? this.horaStringToDate(hFim) : null;

        return !this.estaIntervaloHorario(horario, inicio, fim);
      }) || horasEspeciais.includes(format(horario, 'HH:mm') + ':00');
      
      const estaAgendado = agendamentos.includes(
        format(horario, 'HH:mm') + ':00'
      );

      if (ehValido && !estaAgendado) horarios.push(format(horario, 'HH:mm'));

      ultimoHorario = horario;
    }

    return horarios;
  }

  public formatarDataString(dateString: string | undefined, formatString: string): string {
    if (typeof(dateString) === 'undefined')
      return 'errorToParse';
    return format(parseISO(dateString), formatString);
  }

  public ehDepois (date: Date, dateCompare: Date): boolean {
    return isAfter(date, dateCompare);
  }
}
