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
  
  getTodasRestricoesData(date: string): Observable<Restricao[]> {
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

  getDiasRestricoes(): Observable<Restricao[]> {
    const data = {
      route: 'Restricao',
      action: 'getDiasRestricoes'
    }
    return this.Server.request(data);
  }

  restringirHorario(dataString: string, horarioString: string) {
    const data = {
      route: 'Restricao',
      action: 'restringirHorario',
      DATA: dataString,
      HORARIO: horarioString
    };
    return this.Server.request(data);
  }

  tirarRestricaoHorario(dataString: string, horarioString: string) {
    const data = {
      route: 'Restricao',
      action: 'tirarRestricaoHorario',
      DATA: dataString,
      HORARIO: horarioString
    };
    return this.Server.request(data);
  }
}
