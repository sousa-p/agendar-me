import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/core/service/server.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private Server: ServerService,
    private toastController: ToastController
  ) {}
  @ViewChild('loginForm') loginForm!: NgForm;

  ngOnInit() {}

  async mostrarToast(classe: string, mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 5000,
      cssClass: classe,
    });
    await toast.present();
  }

  login() {
    const data = this.loginForm.form.value;
    data['route'] = 'user';
    data['action'] = 'login';

    this.Server.request(data).subscribe(
      (response) => {
        if (response.retorno === 'success') this.loginForm.reset();
        this.mostrarToast(response.retorno, response.mensagem);
      },
      (error) => {
        console.error(error.error.text);
      }
    );
  }
}
