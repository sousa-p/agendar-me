import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      if (
        this.isModalDatasEspeciaisOpen ||
        this.isModalRestricoesDataOpen ||
        this.isModalRestricoesSemanaisOpen ||
        this.isModalRestricoesHorariosOpen ||
        this.isModalServicosOpen
      )
        location.reload();
    });
  }

  public isModalDatasEspeciaisOpen: boolean = false;
  public isModalRestricoesDataOpen: boolean = false;
  public isModalRestricoesSemanaisOpen: boolean = false;
  public isModalRestricoesHorariosOpen: boolean = false;
  public isModalServicosOpen: boolean = false;
}
