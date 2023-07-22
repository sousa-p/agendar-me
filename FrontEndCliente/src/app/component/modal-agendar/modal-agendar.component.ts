import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-agendar',
  templateUrl: './modal-agendar.component.html',
  styleUrls: ['./modal-agendar.component.scss'],
})
export class ModalAgendarComponent  implements OnInit {

  constructor() { }
  @Input() isModalOpen: boolean = false;
  @Input() horario?: string;

  @Output() fechar = new EventEmitter();
  ngOnInit() {}
}
