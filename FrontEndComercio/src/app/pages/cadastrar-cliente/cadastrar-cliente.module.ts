import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarClientePageRoutingModule } from './cadastrar-cliente-routing.module';

import { CadastrarClientePage } from './cadastrar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarClientePageRoutingModule
  ],
  declarations: [CadastrarClientePage]
})
export class CadastrarClientePageModule {}
