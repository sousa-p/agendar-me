import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/core/service/server.service';
import { ToastService } from 'src/app/core/service/toast.service';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  constructor(
    private Server: ServerService,
    private Toast: ToastService,
    private router: Router
  ) {}
  @ViewChild('cadastrarForm') cadastrarForm!: NgForm;

  ngOnInit() {}

  cadastrar() {
    const data = this.cadastrarForm.form.value;
    data['route'] = 'User';
    data['action'] = 'cadastrar';

    this.Server.request(data).subscribe(
      (response) => {
        if (response.retorno === 'success') {
          this.cadastrarForm.reset();
          this.router.navigate(['/login']);
        };
        this.Toast.mostrarToast(response.retorno, 3000, response.mensagem);
      },
      (error) => {
        console.error(error.error.text);
      }
    );
  }
}
