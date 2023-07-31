import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-configuracao',
  templateUrl: './modal-configuracao.component.html',
  styleUrls: ['./modal-configuracao.component.scss'],
})
export class ModalConfiguracaoComponent  implements OnInit {

  constructor() { }

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {}

}
