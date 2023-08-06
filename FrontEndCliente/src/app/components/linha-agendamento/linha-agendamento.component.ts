import { Component, Input, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { DateService } from 'src/app/core/controller/date.service';

@Component({
  selector: 'app-linha-agendamento',
  templateUrl: './linha-agendamento.component.html',
  styleUrls: ['./linha-agendamento.component.scss'],
})
export class LinhaAgendamentoComponent implements OnInit {
  constructor(public Date: DateService) {}
  @Input() agendamento?: Agendamento;

  tipoAgendamento: string = '';

  ngOnInit() {
    const ISOdataAgendamento = `${this.agendamento?.DATA_AGENDAMENTO}T${this.agendamento?.HORARIO_AGENDAMENTO}:00`;

    if (this.Date.isPastDate(ISOdataAgendamento, true))
      this.tipoAgendamento = 'invalido'
  }
}
