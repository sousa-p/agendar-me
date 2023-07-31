import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracaoPageRoutingModule } from './configuracao-routing.module';

import { ConfiguracaoPage } from './configuracao.page';
import { ModalConfiguracaoComponent } from 'src/app/components/modal-configuracao/modal-configuracao.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracaoPageRoutingModule
  ],
  declarations: [ConfiguracaoPage, ModalConfiguracaoComponent]
})
export class ConfiguracaoPageModule {}
