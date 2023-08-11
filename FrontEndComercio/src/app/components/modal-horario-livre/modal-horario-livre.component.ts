import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastService } from 'src/app/core/controller/toast.service';
import { RestricaoService } from 'src/app/core/service/restricao.service';

@Component({
  selector: 'app-modal-horario-livre',
  templateUrl: './modal-horario-livre.component.html',
  styleUrls: ['./modal-horario-livre.component.scss'],
})
export class ModalHorarioLivreComponent implements OnInit {
  constructor(
    private Restricao: RestricaoService,
    private Toast: ToastService
  ) {}
  @Input() data?: string;
  @Input() horario?: any;
  @Input() isModalOpen?: boolean;
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
        this.toggleRestringir();
      },
    },
  ];

  toggleRestringir() {
    if (this.horario.restrito) {
      this.Restricao.tirarRestricaoHorario(
        this.data!,
        this.horario.horas
      ).subscribe(
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
          console.log(error);
        }
      );
    } else {
      this.Restricao.restringirHorario(
        this.data!,
        this.horario.horas
      ).subscribe(
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
          console.log(error);
        }
      );
    }
  }
}
