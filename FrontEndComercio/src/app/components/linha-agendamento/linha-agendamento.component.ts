import { Component, Input, OnInit } from '@angular/core';
import { DateService } from 'src/app/core/controller/date.service';

@Component({
  selector: 'app-linha-agendamento',
  templateUrl: './linha-agendamento.component.html',
  styleUrls: ['./linha-agendamento.component.scss'],
})
export class LinhaAgendamentoComponent implements OnInit {
  constructor(public Date: DateService) {}

  @Input() public horario?: string;

  ngOnInit() {
  }
}
