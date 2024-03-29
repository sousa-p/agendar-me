import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { HorarioPage } from './horario.page';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { LinhaAgendamentoComponent } from 'src/app/components/linha-agendamento/linha-agendamento.component';
import { ModalHorarioComponent } from 'src/app/components/modal-horario/modal-horario.component';
import { LinhaHorarioComponent } from 'src/app/components/linha-horario/linha-horario.component';
import { RefresherModule } from 'src/app/components/refresher/refresher.module';
import { ModalHorarioLivreModule } from 'src/app/components/modal-horario-livre/modal-horario-livre.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule,
    LoadingModule,
    RefresherModule,
    ModalHorarioLivreModule
  ],
  declarations: [
    HorarioPage,
    LinhaAgendamentoComponent,
    LinhaHorarioComponent,
    ModalHorarioComponent,
  ],
})
export class HorarioPageModule {}
