import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracoesPageRoutingModule } from './configuracoes-routing.module';

import { ConfiguracoesPage } from './configuracoes.page';
import { ModalDatasEspeciaisComponent } from 'src/app/components/modal-datas-especiais/modal-datas-especiais.component';
import { ModalRestricoesDatasComponent } from 'src/app/components/modal-restricoes-datas/modal-restricoes-datas.component';
import { ModalRestricoesSemanaisComponent } from 'src/app/components/modal-restricoes-semanais/modal-restricoes-semanais.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracoesPageRoutingModule,
    LoadingModule,
  ],
  declarations: [
    ConfiguracoesPage,
    ModalDatasEspeciaisComponent,
    ModalRestricoesDatasComponent,
    ModalRestricoesSemanaisComponent,
  ],
})
export class ConfiguracoesPageModule {}
