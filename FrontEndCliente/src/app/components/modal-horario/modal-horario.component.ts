import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/controller/date.service';
import { ToastService } from 'src/app/core/controller/toast.service';
@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.component.html',
  styleUrls: ['./modal-horario.component.scss'],
})
export class ModalHorarioComponent implements OnInit {
  constructor(
    public Date: DateService,
    private Agendamento: AgendamentoService,
    private Toast: ToastService
  ) {}

  @Input() agendamento?: Agendamento;

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
        this.deleteAgendamento();
      },
    },
  ];

  deleteAgendamento() {
    this.Agendamento.deleteAgendamento(
      this.agendamento?.ID_AGENDAMENTO
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
        console.error(error);
      }
    );
  }
}
