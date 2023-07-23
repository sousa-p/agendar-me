import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Agendamento } from '../interface/Agendamento';
import { DateService } from './date.service';
import { Observable } from 'rxjs';
import { Servicos } from '../interface/Servicos';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  constructor(private Server: ServerService, private Date: DateService) {}

  getTodosAgendamentosData(date: string): Observable<Agendamento[]> {
    if (this.Date.isValideDate(date)) {
      const data = {
        route: 'Agendamento',
        action: 'getAgendamentosData',
        DATA_AGENDAMENTO: date,
      };
      return this.Server.request(data);
    }
    return new Observable<Agendamento[]>((observer) => {
      observer.next([]);
      observer.complete();
    });
  }

  realizarAgendamento(
    dataAgendamento: string,
    horarioAgendamento: string,
    servicosAgendamento: Servicos[]
  ) {
    const data = {
      router: 'agendamento',
      action: 'realizarAgendamento',
      DATA_AGENDAMENTO: dataAgendamento,
      HORARIO_AGENDAMENTO: horarioAgendamento,
      SERVICOS_AGENDAMENTO: JSON.stringify(servicosAgendamento),
    };

    return this.Server.request(data);
  }
}
