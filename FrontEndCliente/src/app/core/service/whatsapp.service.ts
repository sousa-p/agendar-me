import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor() { }

  mandarMensagem(mensagem: string, telefone: string = '5515998400444') {
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagemCodificada}`;
    window.open(linkWhatsApp);
  }
}
