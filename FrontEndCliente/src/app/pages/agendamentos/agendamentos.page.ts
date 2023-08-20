import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/controller/date.service';
import { ServicosService } from 'src/app/core/service/servicos.service';
import { Location } from '@angular/common';

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
    private location: Location
  ) {}

  public agendamentoSelecionado?: Agendamento;
  public agendamentosRealizados?: Agendamento[];

  public agendamentosRealizadosPagina?: Agendamento[] = [];
  public agendamentoAtual: number = 0;

  public isModalOpen = false;

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public clicarAgendamento(agendamento: Agendamento) {
    this.setOpen(true);
    this.agendamentoSelecionado = agendamento;

    this.Servicos.getServicosAgendamento(agendamento.ID_AGENDAMENTO).subscribe(
      (response) => {
        agendamento.SERVICOS = response;
        this.agendamentoSelecionado = agendamento;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      if (this.isModalOpen) location.reload();
    });

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

  private mostrarItens() {
    this.agendamentoAtual += 15;
    this.agendamentosRealizadosPagina = this.agendamentosRealizados?.slice(
      0,
      this.agendamentoAtual
    );
  }

  public onIonInfinite(ev: any) {
    this.mostrarItens();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
