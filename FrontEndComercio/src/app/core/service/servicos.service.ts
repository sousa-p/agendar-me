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

  getServicosAgendamentoCliente(
    idAgendamento: number | undefined
  ): Observable<Servicos[]> {
    const data = {
      route: 'Servicos',
      action: 'getServicosAgendamentoCliente',
      ID_AGENDAMENTO: idAgendamento,
    };

    return this.Server.request(data);
  }

  deletarServico(idServico: number) {
    const data = {
      route: 'Servicos',
      action: 'deletarServico',
      ID_SERVICO: idServico,
    };

    return this.Server.request(data);
  }

  adicionarServico(data: any) {
    data['route'] = 'Servicos';
    data['action'] = 'adicionarServico';


    return this.Server.request(data);
  }

  editarServico(data: any, idServico: number) {
    data['route'] = 'Servicos';
    data['action'] = 'editarServico';
    data['ID_SERVICO'] = idServico;


    return this.Server.request(data);
  }
}
