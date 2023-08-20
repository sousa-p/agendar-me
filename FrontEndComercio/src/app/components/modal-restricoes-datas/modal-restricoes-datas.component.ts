import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateService } from 'src/app/core/controller/date.service';
import { Restricao } from 'src/app/core/interface/Restricao';
import { RestricaoService } from 'src/app/core/service/restricao.service';
import { ToastService } from 'src/app/core/controller/toast.service';

@Component({
  selector: 'app-modal-restricoes-datas',
  templateUrl: './modal-restricoes-datas.component.html',
  styleUrls: ['./modal-restricoes-datas.component.scss'],
})
export class ModalRestricoesDatasComponent implements OnInit {
  constructor(
    private Restricao: RestricaoService,
    public Date: DateService,
    private Toast: ToastService
  ) {}

  @Input() public isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {
    this.carregarPagina();
  }

  public restricoesDatas: Restricao[] = [];

  public dataInicio?: string;
  public dataFim?: string;

  public loading: boolean = true;

  private tempo: number = 1000;

  carregarPagina() {
    this.loading = true;
    this.restricoesDatas = [];
    this.dataFim = undefined;
    this.dataInicio = undefined;

    this.Restricao.getTodasRestricoesDeData().subscribe(
      (response) => {
        this.restricoesDatas = response;
        this.loading = false;
      },
      (error) => {
        console.error(error)
      }
    );
  }

  public marcarDataInicio(event: any) {
    this.dataInicio = this.Date.formatarDataString(event.detail.value, 'yyyy-MM-dd');
  }

  public marcarDataFim(event: any) {
    this.dataFim = this.Date.formatarDataString(event.detail.value, 'yyyy-MM-dd');
  }

  public removerRestricao(idRestricao: number) {
    this.Restricao.removerRestricao(idRestricao).subscribe(
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

  public adicionarRestricaoData() {
    this.Restricao.adicionarRestricaoData(this.dataInicio!, this.dataFim!).subscribe(
      (response) => {
        this.Toast.mostrarToast(response.retorno, this.tempo, response.mensagem);
        if (response.retorno === 'success') {
          this.dataInicio = undefined;
          this.dataFim = undefined;
          
          this.carregarPagina();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
