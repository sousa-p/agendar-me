import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalClienteComponent } from './modal-cliente.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [ModalClienteComponent],
  imports: [CommonModule, IonicModule, NgChartsModule],
  exports: [ModalClienteComponent],
})
export class ModalClienteModule {}
