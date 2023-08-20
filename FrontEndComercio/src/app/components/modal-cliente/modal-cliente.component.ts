import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/controller/toast.service';
import { User } from 'src/app/core/interface/User';
import { ComercioService } from 'src/app/core/service/comercio.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss'],
})
export class ModalClienteComponent implements OnInit {
  constructor(private Comercio: ComercioService, private Toast: ToastService) {}

  @Input() public cliente?: User;
  @Input() public isModalOpen?: boolean;
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
        this.deleteCliente();
      },
    },
  ];

  private deleteCliente() {
    this.Comercio.deleteCliente(this.cliente?.ID_USER!).subscribe(
      (response) => {
        const tempo = 1000;
        this.Toast.mostrarToast(response.retorno, tempo, response.mensagem);
        if (response.retorno === 'success') {
          setTimeout(() => {
            location.reload();
          }, tempo);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
