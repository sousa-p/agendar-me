import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-horario-livre',
  templateUrl: './modal-horario-livre.component.html',
  styleUrls: ['./modal-horario-livre.component.scss'],
})
export class ModalHorarioLivreComponent  implements OnInit {

  constructor() { }
  @Input() horario?: any;
  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {}

}
