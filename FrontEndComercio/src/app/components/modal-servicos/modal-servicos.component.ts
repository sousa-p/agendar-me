import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/core/controller/toast.service';
import { Servicos } from 'src/app/core/interface/Servicos';
import { ServicosService } from 'src/app/core/service/servicos.service';

@Component({
  selector: 'app-modal-servicos',
  templateUrl: './modal-servicos.component.html',
  styleUrls: ['./modal-servicos.component.scss'],
})
export class ModalServicosComponent  implements OnInit {

  constructor(private Servicos: ServicosService, private Toast: ToastService) { }

  @ViewChild('servicoForm') servicoForm!: NgForm;

  @Input() isModalOpen?: boolean;
  @Output() fechar = new EventEmitter();
  
  servicos?: Servicos[];
  
  ngOnInit() {
    this.carregarPagina();
  }

  carregarPagina() {
    this.servicos = undefined;

    this.Servicos.getServicos().subscribe(
      (response) => {
        this.servicos = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  deletarServico(idServico: number) {
    this.Servicos.deletarServico(idServico).subscribe(
      (response) => {
        this.Toast.mostrarToast(response.retorno, 1000, response.mensagem);
        if (response.retorno === 'success') {
          this.carregarPagina();
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  adicionarServico() {
    const data = this.servicoForm.form.value;

    this.Servicos.adicionarServico(data).subscribe(
      (response) => {
        this.Toast.mostrarToast(response.retorno, 1000, response.mensagem);
        if (response.retorno === 'success') {
          this.servicoForm.reset();
          this.carregarPagina();
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
