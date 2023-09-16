import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { RefresherModule } from 'src/app/components/refresher/refresher.module';
import { ModalClienteModule } from 'src/app/components/modal-cliente/modal-cliente.module';
import { LinhaPerfilModule } from 'src/app/components/linha-perfil/linha-perfil.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    LoadingModule,
    RefresherModule,
    ModalClienteModule,
    LinhaPerfilModule
  ],
  declarations: [ClientesPage]
})
export class ClientesPageModule {}
