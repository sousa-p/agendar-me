import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/controller/toast.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-modal-configuracao',
  templateUrl: './modal-configuracao.component.html',
  styleUrls: ['./modal-configuracao.component.scss'],
})
export class ModalConfiguracaoComponent implements OnInit {
  constructor(private User: UserService, private Toast: ToastService) {}

  @Input() public isModalOpen?: boolean;
  @Input() public informacaoSelecionada?: string;

  @Output() fechar = new EventEmitter();

  public infosUser?: any;

  ngOnInit() {
    this.carregarPagina();
  }

  private carregarPagina() {
    this.User.getInfos().subscribe(
      (response) => {
        this.infosUser! = response;
        this.infosUser['SENHA_USER'] = {
          NOVA_SENHA_USER: '',
          ANTIGA_SENHA_USER: '',
        };
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public alterarInfo() {
    const informacao = this.informacaoSelecionada?.toUpperCase();
    const valor = this.infosUser[informacao + '_USER'];
    this.User.alterarInfo(informacao!, valor).subscribe(
      (response) => {
        if (response.retorno === 'success') {
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
        this.Toast.mostrarToast(response.retorno, 1500, response.mensagem);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
