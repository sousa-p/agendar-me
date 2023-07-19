import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getISOTodayDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  }

  isValideDate(dateString: string): boolean {
    const date = new Date(dateString);
    return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime());
  }

  isPastDate(dateString: string): boolean {
    const now = new Date();
    const date = new Date(dateString);
    now.setHours(0, 0, 0, 0);
    date.setHours(24, 0, 0, 0);
    return now.getTime() > date.getTime();
  }
}
