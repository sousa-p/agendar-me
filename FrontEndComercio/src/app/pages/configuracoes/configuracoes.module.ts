import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracoesPageRoutingModule } from './configuracoes-routing.module';

import { ConfiguracoesPage } from './configuracoes.page';
import { ModalDatasEspeciaisComponent } from 'src/app/components/modal-datas-especiais/modal-datas-especiais.component';
import { ModalRestricoesDatasComponent } from 'src/app/components/modal-restricoes-datas/modal-restricoes-datas.component';
import { ModalRestricoesSemanaisComponent } from 'src/app/components/modal-restricoes-semanais/modal-restricoes-semanais.component';
import { ModalRestricoesHorariosComponent } from 'src/app/components/modal-restricoes-horarios/modal-restricoes-horarios.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { RefresherModule } from 'src/app/components/refresher/refresher.module';
import { ModalServicosComponent } from 'src/app/components/modal-servicos/modal-servicos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracoesPageRoutingModule,
    LoadingModule,
    RefresherModule
  ],
  declarations: [
    ConfiguracoesPage,
    ModalDatasEspeciaisComponent,
    ModalRestricoesDatasComponent,
    ModalRestricoesSemanaisComponent,
    ModalRestricoesHorariosComponent,
    ModalServicosComponent
  ],
})
export class ConfiguracoesPageModule {}
