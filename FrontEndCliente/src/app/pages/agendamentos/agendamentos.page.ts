import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/service/date.service';
import { ServicosService } from 'src/app/core/service/servicos.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  constructor(
    private Agendamento: AgendamentoService,
    public Date: DateService,
    private Servicos: ServicosService,
  ) {}
  
  agendamentoSelecionado?: Agendamento;
  agendamentosRealizados?: Agendamento[];

  agendamentosRealizadosPagina?: Agendamento[]= [];
  agendamentoAtual: number = 0;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  clicarAgendamento(agendamento: Agendamento) {
    this.setOpen(true)
    
    this.Servicos.getServicosAgendamento(agendamento.ID_AGENDAMENTO).subscribe(
      (response) => {
        agendamento.SERVICOS = response;
        this.agendamentoSelecionado = agendamento;
      },
      (error) => {
        console.error(error);
      }
    )

    this.agendamentoSelecionado = agendamento;
  }

  ngOnInit() {
    this.Agendamento.getAgendamentosRealizados().subscribe(
      (response) => {
        this.agendamentosRealizados = response;
        this.mostrarItens();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  mostrarItens() {
    this.agendamentoAtual += 15;
    this.agendamentosRealizadosPagina = this.agendamentosRealizados?.slice(
      0,
      this.agendamentoAtual
    );
  }

  onIonInfinite(ev: any) {
    this.mostrarItens();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
