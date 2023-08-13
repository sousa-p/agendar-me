import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restricao } from 'src/app/core/interface/Restricao';
import { RestricaoService } from 'src/app/core/service/restricao.service';

@Component({
  selector: 'app-modal-restricoes-datas',
  templateUrl: './modal-restricoes-datas.component.html',
  styleUrls: ['./modal-restricoes-datas.component.scss'],
})
export class ModalRestricoesDatasComponent  implements OnInit {

  constructor(private Restricao: RestricaoService) { }

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {}

  restricoesDatas?: Restricao[];

}
