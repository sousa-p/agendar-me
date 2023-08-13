import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restricao } from 'src/app/core/interface/Restricao';
import { RestricaoService } from 'src/app/core/service/restricao.service';

@Component({
  selector: 'app-modal-restricoes-horarios',
  templateUrl: './modal-restricoes-horarios.component.html',
  styleUrls: ['./modal-restricoes-horarios.component.scss'],
})
export class ModalRestricoesHorariosComponent  implements OnInit {

  constructor(private Restricao: RestricaoService) { }

  @Input() isModalOpen?:boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {}

  restricoesHorarios?: Restricao[];
}
