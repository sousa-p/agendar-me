import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/core/service/server.service';
import { ToastService } from 'src/app/core/controller/toast.service';
import { ComercioService } from 'src/app/core/service/comercio.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.page.html',
  styleUrls: ['./cadastrar-cliente.page.scss'],
})
export class CadastrarClientePage implements OnInit {

  constructor(
    private Comercio: ComercioService,
    private Toast: ToastService,
    private router: Router
  ) {}
  @ViewChild('cadastrarForm') cadastrarForm!: NgForm;

  ngOnInit() {}

  public cadastrar() {
    const data = this.cadastrarForm.form.value;

    this.Comercio.cadastrarCliente(data).subscribe(
      (response) => {
        if (response.retorno === 'success') {
          this.cadastrarForm.reset();
          const tempo = 1000;
          setTimeout(() => {
            location.reload();
            this.router.navigate(['/clientes']);
          }, tempo)
        };
        this.Toast.mostrarToast(response.retorno, 3000, response.mensagem);
      },
      (error) => {
        console.error(error.error.text);
      }
    );
  }

}
