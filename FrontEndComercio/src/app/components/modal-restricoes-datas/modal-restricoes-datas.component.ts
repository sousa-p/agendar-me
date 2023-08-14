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

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  ngOnInit() {
    this.carregarPagina();
  }

  restricoesDatas?: Restricao[];

  dataInicio?: string;
  dataFim?: string;

  carregarPagina() {
    this.Restricao.getTodasRestricoesDeData().subscribe(
      (response) => {
        this.restricoesDatas = response;
      },
      (error) => [console.error(error)]
    );
  }

  marcarDataInicio(event: any) {
    this.dataInicio = this.Date.formatarDataString(event.detail.value, 'yyyy-MM-dd');
  }

  marcarDataFim(event: any) {
    this.dataFim = this.Date.formatarDataString(event.detail.value, 'yyyy-MM-dd');
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

  adicionarRestricaoData() {
    this.Restricao.adicionarRestricaoData(this.dataInicio!, this.dataFim!).subscribe(
      (response) => {
        this.Toast.mostrarToast(response.retorno, 1000, response.mensagem);
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
