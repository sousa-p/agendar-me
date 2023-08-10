import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Servicos } from '../interface/Servicos';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  constructor(private Server: ServerService) {}

  getServicos(): Observable<Servicos[]> {
    const data = {
      route: 'Servicos',
      action: 'getServicos',
    };

    return this.Server.request(data);
  }

  getServicosAgendamentoCliente(idAgendamento: number | undefined): Observable<Servicos[]> {
    const data = {
      route: 'Servicos',
      action: 'getServicosAgendamentoCliente',
      ID_AGENDAMENTO: idAgendamento,
    };

    return this.Server.request(data);
  }
}
