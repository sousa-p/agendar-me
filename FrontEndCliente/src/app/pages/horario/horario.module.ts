import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { HorarioPage } from './horario.page';
import { LinhaHorarioComponent } from 'src/app/component/linha-horario/linha-horario.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HorarioPageRoutingModule],
  declarations: [HorarioPage, LinhaHorarioComponent],
})
export class HorarioPageModule {}
