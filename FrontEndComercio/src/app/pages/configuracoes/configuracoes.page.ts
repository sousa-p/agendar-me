import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  isModalDatasEspeciaisOpen: boolean = false;
  isModalRestricoesDataOpen: boolean = false;
  isModalRestricoesSemanaisOpen: boolean = false;
}
