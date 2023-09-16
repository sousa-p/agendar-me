import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ToastService } from 'src/app/core/controller/toast.service';
import { Servicos } from 'src/app/core/interface/Servicos';
import { User } from 'src/app/core/interface/User';
import { ComercioService } from 'src/app/core/service/comercio.service';
import { RestricaoService } from 'src/app/core/service/restricao.service';
import { ServicosService } from 'src/app/core/service/servicos.service';

@Component({
  selector: 'app-modal-horario-livre',
  templateUrl: './modal-horario-livre.component.html',
  styleUrls: ['./modal-horario-livre.component.scss'],
})
export class ModalHorarioLivreComponent implements OnInit {
  constructor(
    private Restricao: RestricaoService,
    private Toast: ToastService,
    private Servicos: ServicosService,
    private Comercio: ComercioService
  ) {}

  @ViewChild('agendarForm') private agendarForm!: NgForm;
  @Input() public data?: string;
  @Input() public horario?: any;
  @Input() public isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {
    this.carregarPagina();
  }

  public agendando: boolean = false;
  public servicos: Servicos[] = [];
  public servicosSelecionados: Servicos[] = [];

  public clientes: User[] = [];
  public clientesFiltrados: User[] = [];
  public clientesPagina: any = [];
  public clienteSelecionado?: number;
  public clienteAtual = 0;

  public total: number = 0;
  public loading: boolean = true;

  private resetarValores() {
    this.servicosSelecionados = [];
    this.clienteSelecionado = undefined;
    this.clienteAtual = 0;
    this.total = 0;
  }

  private carregarPagina() {
    this.loading = true;
    this.resetarValores();

    this.Servicos.getServicos().subscribe(
      (response) => {
        this.servicos = response;
        this.Comercio.getClientes().subscribe(
          (response) => {
            console.log(response)
            this.clientes = response;
            this.clientesFiltrados = response;
            this.mostrarItensClientes();
          },
          (error) => {
            console.error(error);
          }
        )
      },
      (error) => {
        console.error(error);
      }
    );
  }

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

  private toggleRestringir() {
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

  public agendar() {}

  public alertButtonsCancelar = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        this.cancelarAgendamento();
      },
    },
  ];

  public cancelarAgendamento() {
    this.agendarForm.reset();
    this.agendando = false;
    this.resetarValores();
  }

  public carregarClientesPagina(ev: any) {
    this.mostrarItensClientes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  private mostrarItensClientes() {
    this.clienteAtual += 15;
    this.clientesPagina = this.clientesFiltrados?.slice(0, this.clienteAtual);
  }

  public filtrar(event: any) {
    const pesquisa = event.target.value.toLowerCase();
    this.clientesFiltrados = this.clientes!.filter((cliente) => {
      const nomeLimpado = cliente.NOME_USER.toLocaleLowerCase().trim();
      const telLimpado = cliente.TEL_USER.trim();
      const regex = /[+]?55[ ]?/;
      const pesquisaLimpada = pesquisa
        .trim()
        .toLowerCase()
        .replace(regex, '')
        .replace();
      return (
        nomeLimpado.startsWith(pesquisaLimpada) ||
        telLimpado.startsWith(pesquisaLimpada)
      );
    });
    this.clienteAtual = 0;
    this.mostrarItensClientes();
  }

  public selecionarCliente(event: any) {
    this.clienteSelecionado = event.detail.value;
  }
}
