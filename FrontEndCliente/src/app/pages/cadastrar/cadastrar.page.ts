import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/core/service/server.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  constructor(
    private Server: ServerService,
    private toastController: ToastController
  ) {}
  @ViewChild('cadastrarForm') cadastrarForm!: NgForm;

  ngOnInit() {}

  async mostrarToast(classe: string, mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 5000,
      cssClass: classe,
    });
    await toast.present();
  }

  cadastrar() {
    const data = this.cadastrarForm.form.value;
    data['route'] = 'User';
    data['action'] = 'cadastrar';

    this.Server.request(data).subscribe(
      (response) => {
        if (response.retorno === 'success') this.cadastrarForm.reset();
        this.mostrarToast(response.retorno, response.mensagem);
      },
      (error) => {
        console.error(error.error.text);
      }
    );
  }
}
