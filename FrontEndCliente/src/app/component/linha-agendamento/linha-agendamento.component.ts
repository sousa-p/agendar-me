import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linha-agendamento',
  templateUrl: './linha-agendamento.component.html',
  styleUrls: ['./linha-agendamento.component.scss'],
})
export class LinhaAgendamentoComponent  implements OnInit {

  constructor() { }
  @Input() data?: string;
  @Input() horas?: string;
  @Input() status?: string;



  ngOnInit() {}

}
