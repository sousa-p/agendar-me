import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { HorarioPage } from './horario.page';
import { LinhaHorarioComponent } from 'src/app/component/linha-horario/linha-horario.component';
import { LoadingModule } from 'src/app/component/loading/loading.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HorarioPageRoutingModule, LoadingModule],
  declarations: [HorarioPage, LinhaHorarioComponent],
})
export class HorarioPageModule {}
