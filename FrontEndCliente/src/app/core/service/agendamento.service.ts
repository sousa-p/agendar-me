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

  public getTodosAgendamentosData(date: string): Observable<Agendamento[]> {
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

  public realizarAgendamento(
    dataAgendamento: string,
    horarioAgendamento: string,
    servicosAgendamento: Servicos[]
  ) {
    const data = {
      route: 'Agendamento',
      action: 'realizarAgendamento',
      DATA_AGENDAMENTO: dataAgendamento,
      HORARIO_AGENDAMENTO: horarioAgendamento,
      SERVICOS_AGENDAMENTO: JSON.stringify(servicosAgendamento),
    };

    return this.Server.request(data);
  }

  public getAgendamentosRealizados(): Observable<Agendamento[]> {
    const data = {
      route: 'Agendamento',
      action: 'getAgendamentosRealizados',
    };

    return this.Server.request(data);
  }

  public deleteAgendamento(idAgendamento: number | undefined) {
    const data = {
      route: 'Agendamento',
      action: 'deleteAgendamento',
      ID_AGENDAMENTO: idAgendamento,
    };

    return this.Server.request(data);
  }

  public ehDataRestrita(dataString: string) {
    const data = {
      route: 'Agendamento',
      action: 'ehDataRestrita',
      DATA_AGENDAMENTO: dataString,
    };

    return this.Server.request(data);
  }
}
