import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  public async mostrarToast(classe: string, duracao: number, mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: duracao,
      cssClass: classe,
    });
    await toast.present();
  }
}
