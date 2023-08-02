import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interface/User';
import { ToastService } from 'src/app/core/service/toast.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-modal-configuracao',
  templateUrl: './modal-configuracao.component.html',
  styleUrls: ['./modal-configuracao.component.scss'],
})
export class ModalConfiguracaoComponent  implements OnInit {

  constructor(private User: UserService, private Toast: ToastService) { }

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

  alterarInfo () {
    const informacao = this.informacaoSelecionada?.toUpperCase + '_USER';
    this.User.alterarInfo(informacao, this.infosUser[informacao]).subscribe(
      (response) => {
        if (response.retorno === 'success') {
          setTimeout(() => {
            location.reload();
          }, 1500)
        }
        this.Toast.mostrarToast(response.retorno, 1500 ,response.mensagem);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
