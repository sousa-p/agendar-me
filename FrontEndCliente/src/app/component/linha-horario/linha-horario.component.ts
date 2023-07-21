import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linha-horario',
  templateUrl: './linha-horario.component.html',
  styleUrls: ['./linha-horario.component.scss'],
})
export class LinhaHorarioComponent  implements OnInit {

  constructor() { }
  @Input() horas?: string;
  @Input() status?: string;

  ngOnInit() {}

}