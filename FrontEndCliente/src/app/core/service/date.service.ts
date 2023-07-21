import { Injectable } from '@angular/core';
import {
  addDays,
  format,
  parseISO,
  isValid,
  differenceInDays,
  parse,
  isAfter,
  isBefore,
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
}
