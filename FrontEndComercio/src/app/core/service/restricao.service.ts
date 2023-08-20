import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Restricao } from '../interface/Restricao';
import { DateService } from '../controller/date.service';

@Injectable({
  providedIn: 'root',
})
export class RestricaoService {
  constructor(private Server: ServerService, private Date: DateService) {}

  public getTodasRestricoesData(date: string): Observable<Restricao[]> {
    if (this.Date.isValideDate(date)) {
      const data = {
        route: 'Restricao',
        action: 'getRestricoesData',
        DATA_AGENDAMENTO: date,
      };
      return this.Server.request(data);
    }
    return new Observable<Restricao[]>((observer) => {
      observer.next([]);
      observer.complete();
    });
  }

  public getDiasRestricoes(): Observable<Restricao[]> {
    const data = {
      route: 'Restricao',
      action: 'getDiasRestricoes',
    };
    return this.Server.request(data);
  }

  public restringirHorario(dataString: string, horarioString: string) {
    const data = {
      route: 'Restricao',
      action: 'restringirHorario',
      DATA: dataString,
      HORARIO: horarioString,
    };
    return this.Server.request(data);
  }

  public tirarRestricaoHorario(dataString: string, horarioString: string) {
    const data = {
      route: 'Restricao',
      action: 'tirarRestricaoHorario',
      DATA: dataString,
      HORARIO: horarioString,
    };
    return this.Server.request(data);
  }

  public getRestricoesSemanais(): Observable<Restricao[]> {
    const data = {
      route: 'Restricao',
      action: 'getRestricoesSemanais',
    };
    return this.Server.request(data);
  }

  public retringirDiaSemana(diaSemana: number) {
    const data = {
      route: 'Restricao',
      action: 'restringirDiaSemana',
      DIA_SEMANA: diaSemana,
    };
    return this.Server.request(data);
  }

  public tirarRestricaoDiaSemana(diaSemana: number) {
    const data = {
      route: 'Restricao',
      action: 'tirarRestricaoDiaSemana',
      DIA_SEMANA: diaSemana,
    };
    return this.Server.request(data);
  }

  public getTodasDatasEspeciais() {
    const data = {
      route: 'Restricao',
      action: 'getTodasDatasEspeciais',
    };

    return this.Server.request(data);
  }

  public adicionarDataEspecial(dataString: string) {
    const data = {
      route: 'Restricao',
      action: 'adicionarDataEspecial',
      DATA_ESPECIAL: dataString,
    };

    return this.Server.request(data);
  }

  public removerDataEspecial(dataString: string) {
    const data = {
      route: 'Restricao',
      action: 'removerDataEspecial',
      DATA_ESPECIAL: dataString,
    };

    return this.Server.request(data);
  }

  public getTodasRestricoesDeData() {
    const data = {
      route: 'Restricao',
      action: 'getTodasRestricoesDeData',
    };

    return this.Server.request(data);
  }

  public removerRestricao(idRestricao: number) {
    const data = {
      route: 'Restricao',
      action: 'removerRestricao',
      ID_RESTRICAO: idRestricao,
    };

    return this.Server.request(data);
  }

  public adicionarRestricaoData(dataInicio: string, dataFim: string) {
    const data = {
      route: 'Restricao',
      action: 'adicionarRestricaoData',
      DATA_INICIO: dataInicio,
      DATA_FIM: dataFim,
    };

    return this.Server.request(data);
  }

  public getTodasRestricoesDeHorarios() {
    const data = {
      route: 'Restricao',
      action: 'getTodasRestricoesDeHorario',
    };

    return this.Server.request(data);
  }

  public adicionarRestricaoHorario(
    dataInicio: string,
    dataFim: string,
    horarioInicio: string,
    horarioFim: string
  ) {
    const data = {
      route: 'Restricao',
      action: 'adicionarRestricaoHorario',
      DATA_INICIO: dataInicio,
      DATA_FIM: dataFim,
      HORARIO_INICIO: horarioInicio,
      HORARIO_FIM: horarioFim,
    };

    return this.Server.request(data);
  }
}
