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

  private intervalo: number = 30;
  public restricoes: any = [];
  public horariosEspeciais: string[] = [];
  public horarios: string[] = [];
  public horariosPagina: string[] = [];
  public horarioAtual: number = 0;

  public date?: string;
  public horarioSelecionado?: any;

  public isModalHorarioOpen: boolean = false;
  public isModalAgendamentoOpen: boolean = false;

  public loading: boolean = true;

  public agendamentosRealizados: string[] = [];
  public agendamentosRealizadosPagina?: string[] = [];
  public agendamentoSelecionado?: Agendamento;
  public agendamentoAtual: number = 0;

  public setHorarioOpen(isOpen: boolean) {
    this.isModalHorarioOpen = isOpen;
  }

  public setAgendamentoOpen(isOpen: boolean) {
    this.isModalAgendamentoOpen = isOpen;
  }

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      if (this.isModalHorarioOpen || this.isModalAgendamentoOpen)
        location.reload();
    });

    this.route.params.subscribe((params) => {
      this.date = params['date'];
      if (
        this.date === undefined ||
        this.date === null ||
        !this.Date.isValideDate(this.date) ||
        this.Date.isPastDate(this.date) ||
        this.Date.ehDepois(
          new Date(this.date),
          new Date(this.Date.getUltimaDataAgendamento())
        )
      )
        this.router.navigate(['/home']);
      else {
        this.Agendamento.ehDataRestrita(this.date).subscribe(
          (response) => {
            if (response.retorno === 'error') this.router.navigate(['/home']);
            this.carregarPagina();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  private carregarPagina() {
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
            this.mostrarItensHorario();
            this.mostrarItensAgendamentos();
            this.loading = false;
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

  public carregarHorarioPagina(ev: any) {
    this.mostrarItensHorario();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  private mostrarItensHorario() {
    this.horarioAtual += 15;
    this.horariosPagina = this.horarios?.slice(0, this.horarioAtual);
  }

  public carregarAgendamentosPagina(ev: any) {
    this.mostrarItensAgendamentos();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  private mostrarItensAgendamentos() {
    this.agendamentoAtual += 15;
    this.agendamentosRealizadosPagina = this.agendamentosRealizados?.slice(
      0,
      this.agendamentoAtual
    );
  }

  public clicarAgendamento(agendamento: string, horario: string) {
    this.setAgendamentoOpen(true);

    this.Agendamento.getAgendamentoInfos(agendamento,horario.slice(0, 5)).subscribe(
      (response) => {
        this.agendamentoSelecionado = response;
        this.Servicos.getServicosAgendamentoCliente(response.ID_AGENDAMENTO).subscribe(
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

  public clicarHorario(horario: any) {
    this.horarioSelecionado = horario;
    this.setHorarioOpen(true);
  }
}
