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

  @Input() public isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();

  public datasEspeciais: string[] = [];
  public highlightedDates: any = [];
  public dataSelecionada?: string;

  public loading: boolean = true;

  ngOnInit() {
    this.carregarPagina();
  }

  private carregarPagina() {
    this.loading = true;
    this.datasEspeciais = [];
    this.highlightedDates = [];
    this.dataSelecionada = undefined;

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
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public selecionarData(event: any) {
    this.dataSelecionada = event.detail.value.split('T')[0];
  }

  public adicionarDataEspecial() {
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

  public removerDataEspecial(data: string) {
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
