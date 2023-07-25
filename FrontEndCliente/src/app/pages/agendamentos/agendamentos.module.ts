import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosPageRoutingModule } from './agendamentos-routing.module';

import { AgendamentosPage } from './agendamentos.page';
import { LinhaAgendamentoComponent } from 'src/app/component/linha-agendamento/linha-agendamento.component';
import { LoadingModule } from 'src/app/component/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentosPageRoutingModule,
    LoadingModule
  ],
  declarations: [AgendamentosPage, LinhaAgendamentoComponent]
})
export class AgendamentosPageModule {}
