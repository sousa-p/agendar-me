import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { Servicos } from 'src/app/core/interface/Servicos';
import { DateService } from 'src/app/core/service/date.service';
import { ServicosService } from 'src/app/core/service/servicos.service';
@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.component.html',
  styleUrls: ['./modal-horario.component.scss'],
})
export class ModalHorarioComponent implements OnInit {
  constructor(public Date: DateService) {}

  @Input() agendamento?: Agendamento;

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {}

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        alert('cancelou')
      },
    },
  ]
}
