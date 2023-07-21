import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { Restricao } from 'src/app/core/interface/Restricao';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/service/date.service';
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
    private Date: DateService,
    private Agendamento: AgendamentoService,
    private Restricao: RestricaoService
  ) {}

  intervalo: number = 60;
  restricoes?: any;
  agendamentos?: any;
  horariosLivres?: string[];

  date?: string;
  presentingElement?: any;
  isOpen: boolean = false;
  horario?: string;

  ngOnInit() {
    this.presentingElement = document.querySelector('.section');
    this.route.params.subscribe((params) => {
      this.date = params['date'];
      if (
        this.date === undefined ||
        this.date === null ||
        !this.Date.isValideDate(this.date) ||
        this.Date.isPastDate(this.date)
      )
        this.router.navigate(['/home']);

      this.Agendamento.getTodosAgendamentosData(this.date!).subscribe(
        (response: Agendamento[]) => {
          this.agendamentos = response;
          this.Restricao.getTodasRestricoesData(this.date!).subscribe(
            (response: Restricao[]) => {
              this.restricoes = response;
              console.log(this.restricoes);
              this.horariosLivres = this.Date.gerarHorarios(
                this.intervalo,
                this.restricoes,
                this.agendamentos
              );
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
    });
  }
  agendar(horas: string) {
    this.isOpen = true;
    this.horario = horas;
  }
}
