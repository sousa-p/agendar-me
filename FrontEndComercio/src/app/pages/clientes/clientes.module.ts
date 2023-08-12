import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { LinhaPerfilComponent } from 'src/app/components/linha-perfil/linha-perfil.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    LoadingModule
  ],
  declarations: [ClientesPage, LinhaPerfilComponent]
})
export class ClientesPageModule {}
