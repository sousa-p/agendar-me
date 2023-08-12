import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {
  constructor() {}

  isModalOpen: boolean = false;
  informacaoSelecionada?: string;
  loading: boolean = true;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {}

  clicarItem(attr: string) {
    this.informacaoSelecionada = attr;
    this.setOpen(true);
  }
}
