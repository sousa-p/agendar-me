import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Restricao } from '../interface/Restricao';
import { DateService } from '../controller/date.service';

@Injectable({
  providedIn: 'root'
})
export class RestricaoService {

  constructor(private Server: ServerService, private Date: DateService) { }
  
  public getTodasRestricoesData(date: string): Observable<Restricao[]> {
    if(this.Date.isValideDate(date)) {
      const data = {
        route: 'Restricao',
        action: 'getRestricoesData',
        DATA_AGENDAMENTO: date
      }
      return this.Server.request(data);
    }
    return new Observable<Restricao[]>(observer => {
      observer.next([]);
      observer.complete();
    });
  }

  public getDiasRestricoes(): Observable<Restricao[]> {
    const data = {
      route: 'Restricao',
      action: 'getDiasRestricoes'
    }
    return this.Server.request(data);
  }
}
