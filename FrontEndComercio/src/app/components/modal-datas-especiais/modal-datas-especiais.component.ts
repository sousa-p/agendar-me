import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restricao } from 'src/app/core/interface/Restricao';

@Component({
  selector: 'app-modal-datas-especiais',
  templateUrl: './modal-datas-especiais.component.html',
  styleUrls: ['./modal-datas-especiais.component.scss'],
})
export class ModalDatasEspeciaisComponent implements OnInit {
  constructor() {}

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {}

  datasEspeciais?: Restricao[];
}
