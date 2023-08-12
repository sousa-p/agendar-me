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
        const mensagem = this.gerarMensagemDeleteAgendamento  ();
        this.Toast.mostrarToast(response.retorno, tempo, response.mensagem);
        if (response.retorno === 'success') {
          setTimeout(() => {
            location.reload();
            this.Whatsapp.mandarMensagem(mensagem, '55'+this.agendamento!.TEL_USER);
          }, tempo);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  gerarMensagemDeleteAgendamento(): string {
    return `🚫 *AGENDAMENTO CANCELADO*\n📆 Data: ${this.Date.formatarDataString(this.agendamento?.DATA_AGENDAMENTO, 'dd/MM/yyyy')}\n⏰ Horário: ${this.agendamento?.HORARIO_AGENDAMENTO.slice(0,5)}`;
  }

  lembrarCliente() {
    const mensagem = this.gerarMensagemLembrarCliente();
    this.Whatsapp.mandarMensagem(mensagem, '55'+this.agendamento!.TEL_USER);
  }

  gerarMensagemLembrarCliente() {
    let total: number = 0;
    let mensagem = `*🚨 LEMBRETE 🚨*\nVocê tem um agendamento comigo 😉\n\n📆 Data: ${this.Date.formatarDataString(this.agendamento?.DATA_AGENDAMENTO,'dd/MM/yyyy')}\n⏰ Horário: ${this.agendamento?.HORARIO_AGENDAMENTO.slice(0,5)}\n\n💼 *SERVIÇOS*  \n`;

    this.agendamento?.SERVICOS!.forEach((servico) => {
      mensagem += `📌 ${servico.NOME_SERVICO}: R$ ${servico.PRECO_SERVICO}\n`;
      total += Number(servico.PRECO_SERVICO);
    });

    mensagem += `💵 *Total:* R$ ${total.toFixed(2).replace('-', '')}`;

    return mensagem;
  }

}
