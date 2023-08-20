import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Restricao } from 'src/app/core/interface/Restricao';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/controller/date.service';
import { RestricaoService } from 'src/app/core/service/restricao.service';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { ServicosService } from 'src/app/core/service/servicos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public Date: DateService,
    private Agendamento: AgendamentoService,
    private Restricao: RestricaoService,
    private Servicos: ServicosService,
    private location: Location
  ) {}
  
    paginaEstaRestrita: boolean = false;

  intervalo: number = 30;
  restricoes: any = [];
  horariosEspeciais: string[] = [];
  horarios: string[] = [];
  horariosPagina: string[] = [];
  horarioAtual: number = 0;

  date?: string;
  horarioSelecionado?: any;

  isModalHorarioOpen: boolean = false;
  isModalAgendamentoOpen: boolean = false;

  loading: boolean = true;

  agendamentosRealizados: string[] = [];
  agendamentosRealizadosPagina?: string[] = [];
  agendamentoSelecionado?: Agendamento;
  agendamentoAtual: number = 0;

  setHorarioOpen(isOpen: boolean) {
    this.isModalHorarioOpen = isOpen;
  }

  setAgendamentoOpen(isOpen: boolean) {
    this.isModalAgendamentoOpen = isOpen;
  }

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      if (this.isModalHorarioOpen || this.isModalAgendamentoOpen) location.reload();
    });

    this.route.params.subscribe((params) => {
      this.date = params['date'];
      if (
        this.date === undefined ||
        this.date === null ||
        !this.Date.isValideDate(this.date) ||
        this.Date.isPastDate(this.date) ||
        this.Date.ehDepois(new Date(this.date), new Date(this.Date.getUltimaDataAgendamento()))
      )
        this.router.navigate(['/home']);
      else {
        this.Agendamento.ehDataRestrita(this.date).subscribe(
          (response) => {
            if (response.retorno === 'error') this.router.navigate(['/home']);
            this.paginaEstaRestrita = true;
            this.carregarPagina();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  carregarPagina() {
    this.loading = true;
    this.agendamentosRealizados = [];
    this.restricoes = [];
    this.horariosEspeciais = [];
    this.horarios = [];

    this.Agendamento.getTodosAgendamentosData(this.date!).subscribe(
      (response: string[]) => {
        this.agendamentosRealizados = response;
        this.Restricao.getTodasRestricoesData(this.date!).subscribe(
          (response: any) => {
            this.restricoes = response.RESTRICOES;
            this.horariosEspeciais = response.HORARIOS_ESPECIAIS;

            this.horarios = this.Date.gerarHorarios(
              this.intervalo,
              this.restricoes,
              this.horariosEspeciais,
              this.agendamentosRealizados
            );
            this.loading = false;
            this.mostrarItensHorario();
            this.mostrarItensAgendamentos();
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  mostrarItensHorario() {
    this.horarioAtual += 15;
    this.horariosPagina = this.horarios?.slice(0, this.horarioAtual);
  }

  carregarHorarioPagina(ev: any) {
    this.mostrarItensHorario();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  mostrarItensAgendamentos() {
    this.agendamentoAtual += 15;
    this.agendamentosRealizadosPagina = this.agendamentosRealizados?.slice(
      0,
      this.agendamentoAtual
    );
  }

  carregarAgendamentosPagina(ev: any) {
    this.mostrarItensAgendamentos();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  clicarAgendamento(agendamento: string, horario: string) {
    this.setAgendamentoOpen(true);

    this.Agendamento.getAgendamentoInfos(
      agendamento,
      horario.slice(0, 5)
    ).subscribe(
      (response) => {
        this.agendamentoSelecionado = response;
        this.Servicos.getServicosAgendamentoCliente(
          response.ID_AGENDAMENTO
        ).subscribe(
          (response) => {
            this.agendamentoSelecionado!.SERVICOS = response;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clicarHorario(horario: any) {
    this.horarioSelecionado = horario;
    this.setHorarioOpen(true);
  }
}
