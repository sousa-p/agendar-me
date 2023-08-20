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


  public horas: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  public horasRestantes: number[] = this.horas;
  
  public minutos: any = [0, 30];
  
  public restricoesHorarios: Restricao[] = [];
  
  public horarioInicio: string = `00:${String(this.minutos.at(0)).padStart(2, '0')}`;
  public horarioFim: string = `23:${String(this.minutos.at(-1)).padStart(2, '0')}`;
  public dataInicio?: string;
  public dataFim?: string;

  public loading: boolean = true;
  
  private tempo: number = 1000;

  ngOnInit() {
    this.carregarPagina();
  }

  private carregarPagina() {
    this.loading = true;
    this.restricoesHorarios = [];
    this.horarioInicio = `00:${String(this.minutos.at(0)).padStart(2, '0')}`;
    this.horarioFim = `23:${String(this.minutos.at(-1)).padStart(2, '0')}`;

    this.Restricao.getTodasRestricoesDeHorarios().subscribe(
      (response) => {
        this.restricoesHorarios = response;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public adicionarRestricaoHorario() {
    this.Restricao.adicionarRestricaoHorario(
      this.dataInicio!,
      this.dataFim!,
      this.horarioInicio!,
      this.horarioFim!
    ).subscribe(
      (response) => {
        if (response.retorno === 'success')
          this.carregarPagina();
        
        this.Toast.mostrarToast(response.retorno, this.tempo, response.mensagem);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public removerRestricao(idRestricao: number) {
    this.Restricao.removerRestricao(idRestricao).subscribe(
      (response) => {
        this.Toast.mostrarToast(response.retorno, this.tempo, response.mensagem);
        if (response.retorno === 'success') {
          this.carregarPagina();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public marcarDataInicio(event: any) {
    this.dataInicio = this.Date.formatarDataString(
      event.detail.value,
      'yyyy-MM-dd'
    );
  }

  public marcarDataFim(event: any) {
    this.dataFim = this.Date.formatarDataString(
      event.detail.value,
      'yyyy-MM-dd'
    );

  }

  public marcarHorarioInicio(event: any) {
    this.horarioInicio = this.Date.formatarDataString(
      event.detail.value,
      'HH:mm'
    );

    this.horasRestantes = this.horas.filter((n) => {
      return n >= Number(this.horarioInicio?.split(':')[0]);
    });
  }

  public marcarHorarioFim(event: any) {
    this.horarioFim = this.Date.formatarDataString(event.detail.value, 'HH:mm');
  }
}
