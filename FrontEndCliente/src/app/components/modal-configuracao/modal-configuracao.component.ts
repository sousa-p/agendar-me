import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interface/User';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-modal-configuracao',
  templateUrl: './modal-configuracao.component.html',
  styleUrls: ['./modal-configuracao.component.scss'],
})
export class ModalConfiguracaoComponent  implements OnInit {

  constructor(private User: UserService) { }

  @Input() isModalOpen?: boolean;
  @Input() informacaoSelecionada?: string;

  @Output() fechar = new EventEmitter();

  infosUser?: any;
  ngOnInit() {
    this.User.getInfos().subscribe(
      (response) => {
        this.infosUser! = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
