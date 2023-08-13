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

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  restricoesSemanais?: Restricao[];

  diasRestantes: number[] = [0, 1, 2, 3, 4, 5, 6];

  diasSemana: string[] = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  ngOnInit() {
    this.Restricao.getRestricoesSemanais().subscribe(
      (response: Restricao[]) => {
        this.restricoesSemanais = response;
        const idsRestricoesSemanais = this.restricoesSemanais.map((dia) => {
          return dia.DIA_SEMANA;
        });

        this.diasRestantes = this.diasRestantes.filter((dia) => {
          return !idsRestricoesSemanais.includes(dia);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  restringirDiaSemana(ev: any) {
    this.Restricao.retringirDiaSemana(Number(ev.detail.value)).subscribe(
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

  tirarRestricaoDiaSemana(diaSemana: number) {
    this.Restricao.tirarRestricaoDiaSemana(diaSemana).subscribe(
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
