import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateService } from 'src/app/core/controller/date.service';
import { ToastService } from 'src/app/core/controller/toast.service';
import { Restricao } from 'src/app/core/interface/Restricao';
import { RestricaoService } from 'src/app/core/service/restricao.service';

@Component({
  selector: 'app-modal-datas-especiais',
  templateUrl: './modal-datas-especiais.component.html',
  styleUrls: ['./modal-datas-especiais.component.scss'],
})
export class ModalDatasEspeciaisComponent implements OnInit {
  constructor(private Restricao: RestricaoService, public Date: DateService, private Toast: ToastService) {}

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  datasEspeciais?: string[];
  highlightedDates?: any;
  dataSelecionada?: string;

  ngOnInit() {
    this.carregarPagina();
  }

  carregarPagina() {
    this.Restricao.getTodasDatasEspeciais().subscribe(
      (response) => {
        this.datasEspeciais = response;
        this.highlightedDates = this.datasEspeciais?.map((data) => {
          return {
            date: data,
            textColor: 'var(--ion-color-secondary-contrast)',
            backgroundColor: 'var(--ion-color-secondary)',
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selecionarData(event: any) {
    this.dataSelecionada = event.detail.value.split('T')[0];
  }

  adicionarDataEspecial() {
    this.Restricao.adicionarDataEspecial(this.dataSelecionada!).subscribe(
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

  removerDataEspecial(data: string) {
    this.Restricao.removerDataEspecial(data).subscribe(
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
