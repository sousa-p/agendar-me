import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { HorarioPage } from './horario.page';
import { LinhaHorarioComponent } from 'src/app/components/linha-horario/linha-horario.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ModalAgendarComponent } from 'src/app/components/modal-agendar/modal-agendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule,
    LoadingModule
  ],
  declarations: [HorarioPage, LinhaHorarioComponent, ModalAgendarComponent],
})
export class HorarioPageModule {}
