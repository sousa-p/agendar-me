import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { LinhaPerfilComponent } from 'src/app/components/linha-perfil/linha-perfil.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ModalClienteComponent } from 'src/app/components/modal-cliente/modal-cliente.component';
import { RefresherModule } from 'src/app/components/refresher/refresher.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    LoadingModule,
    RefresherModule
  ],
  declarations: [ClientesPage, LinhaPerfilComponent, ModalClienteComponent]
})
export class ClientesPageModule {}
