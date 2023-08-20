import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Agendamento } from 'src/app/core/interface/Agendamento';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { DateService } from 'src/app/core/controller/date.service';
import { ToastService } from 'src/app/core/controller/toast.service';
import { WhatsappService } from 'src/app/core/service/whatsapp.service';
@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.component.html',
  styleUrls: ['./modal-horario.component.scss'],
})
export class ModalHorarioComponent implements OnInit {
  constructor(
    public Date: DateService,
    private Agendamento: AgendamentoService,
    private Toast: ToastService,
    private Whatsapp: WhatsappService
  ) {}

  @Input() public agendamento?: Agendamento;

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
        this.deleteAgendamento();
      },
    },
  ];

  private deleteAgendamento() {
    this.Agendamento.deleteAgendamento(
      this.agendamento?.ID_AGENDAMENTO
    ).subscribe(
      (response) => {
        const tempo = 1000;
        if (response.retorno === 'success') {
          setTimeout(() => {
            location.reload();
            this.Whatsapp.mandarMensagem(this.gerarMensagem());
          }, tempo);
        }
        this.Toast.mostrarToast(response.retorno, tempo, response.mensagem);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private gerarMensagem(): string {
    return `🚫 *AGENDAMENTO CANCELADO*\n📆 Data: ${this.Date.formatarDataString(
      this.agendamento?.DATA_AGENDAMENTO,
      'dd/MM/yyyy'
    )}\n⏰ Horário: ${this.agendamento?.HORARIO_AGENDAMENTO}`;
  }
}
