import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { Restricao } from 'src/app/core/interface/Restricao';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/controller/date.service';
import { RestricaoService } from 'src/app/core/service/restricao.service';

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
    private Restricao: RestricaoService
  ) {}

  intervalo: number = 30;
  restricoes: any = [];
  agendamentos: any = [];
  horariosLivres: string[] = [];
  horariosLivresPagina: string[] = [];
  horarioAtual: number = 0;

  date?: string;
  horario?: string;

  isModalOpen: boolean = false;
  loading: boolean = true;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
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
            response.retorno === 'error'
              ? this.router.navigate(['/home'])
              : this.carregarPagina();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  carregarPagina() {
    this.Agendamento.getTodosAgendamentosData(this.date!).subscribe(
      (response: Agendamento[]) => {
        this.agendamentos = response;
        this.Restricao.getTodasRestricoesData(this.date!).subscribe(
          (response: Restricao[]) => {
            this.restricoes = response;
            this.horariosLivres = this.Date.gerarHorarios(
              this.intervalo,
              this.restricoes,
              this.agendamentos
            );
            this.loading = false;
            this.mostrarItens();
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

  mostrarItens() {
    this.horarioAtual += 15;
    this.horariosLivresPagina = this.horariosLivres?.slice(
      0,
      this.horarioAtual
    );
  }

  onIonInfinite(ev: any) {
    this.mostrarItens();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
