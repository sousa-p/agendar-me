import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Servicos } from 'src/app/core/interface/Servicos';
import { AgendamentoService } from 'src/app/core/service/agendamento.service';
import { ServicosService } from 'src/app/core/service/servicos.service';
import { ToastService } from 'src/app/core/controller/toast.service';
import { DateService } from 'src/app/core/controller/date.service';
import { WhatsappService } from 'src/app/core/service/whatsapp.service';

@Component({
  selector: 'app-modal-agendar',
  templateUrl: './modal-agendar.component.html',
  styleUrls: ['./modal-agendar.component.scss'],
})
export class ModalAgendarComponent implements OnInit {
  constructor(
    private Servicos: ServicosService,
    private Agendamento: AgendamentoService,
    private Toast: ToastService,
    private Date: DateService,
    private Whatsapp: WhatsappService
  ) {}

  @Input() public isModalOpen: boolean = false;
  @Input() public dataAgendamento?: string;
  @Input() public horario?: string;

  @Output() fechar = new EventEmitter();

  @ViewChild('agendarForm') agendarForm!: NgForm;

  public servicos: Servicos[] = [];
  public servicosSelecionados: Servicos[] = [];
  public total: number = 0;
  public loading: boolean = true;

  ngOnInit() {
    this.carregarPagina();
  }

  private carregarPagina() {
    this.loading = true;
    this.servicos = [];
    this.servicosSelecionados = [];
    this.total = 0;

    this.Servicos.getServicos().subscribe(
      (response) => {
        this.servicos = response;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  attServicosSelecionados(event: any) {
    const servico: any = event.detail.value;
    if (event.detail.checked) {
      this.servicosSelecionados.push(servico);
      this.total += Number(servico.PRECO_SERVICO);
    } else {
      const id = this.servicosSelecionados.indexOf(servico);
      this.total -= Number(this.servicosSelecionados[id].PRECO_SERVICO);
      if (id !== -1) this.servicosSelecionados.splice(id, 1);
    }
  }

  agendar() {
    this.Agendamento.realizarAgendamento(
      this.dataAgendamento!,
      this.horario!,
      this.servicosSelecionados
    ).subscribe(
      (response) => {
        const tempo = 1000;
        this.Toast.mostrarToast(response.retorno, tempo, response.mensagem);
        if (response.retorno === 'success') {
          const mensagem = this.gerarMensagem();
          setTimeout(() => {
            location.reload();
            this.Whatsapp.mandarMensagem(mensagem);
          }, tempo);
        }
        this.servicosSelecionados = [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  gerarMensagem() {
    let mensagem = `🗓️ *AGENDAMENTO*\n📆 Data: ${this.Date.formatarDataString(
      this.dataAgendamento,
      'dd/MM/yyyy'
    )}\n⏰ Horário: ${this.horario}\n\n💼 *SERVIÇOS*  \n`;

    this.servicosSelecionados!.forEach((servico) => {
      mensagem += `📌 ${servico.NOME_SERVICO}: R$ ${servico.PRECO_SERVICO}\n`;
    });

    mensagem += `💵 *Total:* R$ ${this.total.toFixed(2).replace('-', '')}`;

    return mensagem;
  }
}
