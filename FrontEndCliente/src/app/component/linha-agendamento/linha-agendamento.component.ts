import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linha-agendamento',
  templateUrl: './linha-agendamento.component.html',
  styleUrls: ['./linha-agendamento.component.scss'],
})
export class LinhaAgendamentoComponent  implements OnInit {

  constructor() { }
  @Input() horas?: string;


  ngOnInit() {}

}
