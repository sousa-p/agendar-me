import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/service/date.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  constructor(private Agendamento: AgendamentoService, public Date: DateService) {}

  agendamentosRealizados?: Agendamento[];

  ngOnInit() {
    this.Agendamento.getAgendamentosRealizados().subscribe(
      (response) => {
        this.agendamentosRealizados = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
