import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {
  constructor(private location: Location) {}

  isModalOpen: boolean = false;
  informacaoSelecionada?: string;
  loading: boolean = true;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      if (this.isModalOpen) location.reload();
    });
  }

  clicarItem(attr: string) {
    this.informacaoSelecionada = attr;
    this.setOpen(true);
  }
}
