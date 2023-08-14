import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateService } from 'src/app/core/controller/date.service';
import { ToastService } from 'src/app/core/controller/toast.service';
import { Restricao } from 'src/app/core/interface/Restricao';
import { RestricaoService } from 'src/app/core/service/restricao.service';

@Component({
  selector: 'app-modal-restricoes-horarios',
  templateUrl: './modal-restricoes-horarios.component.html',
  styleUrls: ['./modal-restricoes-horarios.component.scss'],
})
export class ModalRestricoesHorariosComponent implements OnInit {
  constructor(
    private Restricao: RestricaoService,
    public Date: DateService,
    private Toast: ToastService
  ) {}

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {
    this.carregarPagina();
  }

  horarioInicio?: string;
  horarioFim?: string;
  dataInicio?: string;
  dataFim?: string;

  horas: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  horasRestantes: number[] = this.horas;

  minutos: number[] = [0, 30];

  restricoesHorarios?: Restricao[];

  carregarPagina() {
    this.Restricao.getTodasRestricoesDeHorarios().subscribe(
      (response) => {
        console.log(response);
        this.restricoesHorarios = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  adicionarRestricaoHorario() {
    this.Restricao.adicionarRestricaoHorario(
      this.dataInicio!,
      this.dataFim!,
      this.horarioInicio!,
      this.horarioFim!
    ).subscribe(
      (response) => {
        console.log(response);
        this.Toast.mostrarToast(response.retorno, 1000, response.mensagem);
        if (response.retorno === 'success') {
          this.dataInicio = undefined;
          this.dataFim = undefined;
          this.horarioInicio = undefined;
          this.horarioFim = undefined;

          this.carregarPagina();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removerRestricao(idRestricao: number) {
    this.Restricao.removerRestricao(idRestricao).subscribe(
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

  marcarDataInicio(event: any) {
    console.log(event)
    this.dataInicio = this.Date.formatarDataString(
      event.detail.value,
      'yyyy-MM-dd'
    );
  }

  marcarDataFim(event: any) {
    console.log(event)
    this.dataFim = this.Date.formatarDataString(
      event.detail.value,
      'yyyy-MM-dd'
    );

  }

  marcarHorarioInicio(event: any) {
    this.horarioInicio = this.Date.formatarDataString(
      event.detail.value,
      'HH:mm'
    );

    this.horasRestantes = this.horas.filter((n) => {
      return n >= Number(this.horarioInicio?.split(':')[0]);
    });
  }

  marcarHorarioFim(event: any) {
    this.horarioFim = this.Date.formatarDataString(event.detail.value, 'HH:mm');
  }
}
