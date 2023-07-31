import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosPageRoutingModule } from './agendamentos-routing.module';

import { AgendamentosPage } from './agendamentos.page';
import { LinhaAgendamentoComponent } from 'src/app/components/linha-agendamento/linha-agendamento.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ModalHorarioComponent } from 'src/app/components/modal-horario/modal-horario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentosPageRoutingModule,
    LoadingModule,
  ],
  declarations: [
    AgendamentosPage,
    LinhaAgendamentoComponent,
    ModalHorarioComponent,
  ],
})
export class AgendamentosPageModule {}
