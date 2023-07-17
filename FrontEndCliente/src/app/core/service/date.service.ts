import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getISOTodayDate() {
    return new Date().toISOString().split('T')[0];
  }
}
