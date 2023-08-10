import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Agendamento } from '../interface/Agendamento';
import { DateService } from '../controller/date.service';
import { Observable } from 'rxjs';
import { Servicos } from '../interface/Servicos';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  constructor(private Server: ServerService, private Date: DateService) {}

  getTodosAgendamentosData(date: string): Observable<string[]> {
    if (this.Date.isValideDate(date)) {
      const data = {
        route: 'Agendamento',
        action: 'getAgendamentosData',
        DATA_AGENDAMENTO: date,
      };
      return this.Server.request(data);
    }
    return new Observable<string[]>((observer) => {
      observer.next([]);
      observer.complete();
    });
  }

  getAgendamentosRealizados(): Observable<Agendamento[]> {
    const data = {
      route: 'Agendamento',
      action: 'getAgendamentosRealizados',
    };

    return this.Server.request(data);
  }

  deleteAgendamento(idAgendamento: number | undefined) {
    const data = {
      route: 'Agendamento',
      action: 'deleteAgendamentoComercio',
      ID_AGENDAMENTO: idAgendamento,
    };

    return this.Server.request(data);
  }

  ehDataRestrita(dataString: string) {
    const data = {
      route: 'Agendamento',
      action: 'ehDataRestrita',
      DATA_AGENDAMENTO: dataString,
    };

    return this.Server.request(data);
  }

  getAgendamentoInfos(dataString: string, horarioString: string): Observable<Agendamento> {
    if (this.Date.isValideDate(dataString) && this.Date.isValidateHour(horarioString)) {
      const data = {
        route: 'Agendamento',
        action: 'getAgendamentoInfos',
        DATA_AGENDAMENTO: dataString,
        HORARIO_AGENDAMENTO: horarioString
      };
      return this.Server.request(data);
    }
    return new Observable<Agendamento>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
