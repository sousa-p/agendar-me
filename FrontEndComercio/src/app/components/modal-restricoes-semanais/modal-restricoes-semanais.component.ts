import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/controller/toast.service';
import { Restricao } from 'src/app/core/interface/Restricao';
import { RestricaoService } from 'src/app/core/service/restricao.service';

@Component({
  selector: 'app-modal-restricoes-semanais',
  templateUrl: './modal-restricoes-semanais.component.html',
  styleUrls: ['./modal-restricoes-semanais.component.scss'],
})
export class ModalRestricoesSemanaisComponent implements OnInit {
  constructor(
    private Restricao: RestricaoService,
    private Toast: ToastService
  ) {}

  @Input() public isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  public restricoesSemanais: Restricao[] = [];

  public diasRestantes: number[] = [0, 1, 2, 3, 4, 5, 6];

  public diasSemana: string[] = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  public loading: boolean = true;

  ngOnInit() {
    this.carregarPagina();
  }

  private carregarPagina() {
    this.loading = true;
    this.restricoesSemanais = [];
    this.diasRestantes = [0, 1, 2, 3, 4, 5, 6];

    this.Restricao.getRestricoesSemanais().subscribe(
      (response: Restricao[]) => {
        this.restricoesSemanais = response;
        const idsRestricoesSemanais = this.restricoesSemanais.map((dia) => {
          return Number(dia.DIA_SEMANA);
        });

        this.diasRestantes = this.diasRestantes.filter((dia: number) => {
          return !idsRestricoesSemanais.includes(dia);
        });

        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public restringirDiaSemana(ev: any) {
    this.Restricao.retringirDiaSemana(Number(ev.detail.value)).subscribe(
      (response) => {
        this.Toast.mostrarToast(response.retorno, 1000, response.mensagem);
        if (response.retorno === 'success') {
          this.carregarPagina();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public tirarRestricaoDiaSemana(diaSemana: number) {
    this.Restricao.tirarRestricaoDiaSemana(diaSemana).subscribe(
      (response) => {
        this.Toast.mostrarToast(response.retorno, 1000, response.mensagem);
        if (response.retorno === 'success') {
          this.carregarPagina();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
