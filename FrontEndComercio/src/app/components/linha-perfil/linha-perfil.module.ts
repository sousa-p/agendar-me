import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LinhaPerfilComponent } from './linha-perfil.component';

@NgModule({
  declarations: [LinhaPerfilComponent],
  imports: [CommonModule, IonicModule],
  exports: [LinhaPerfilComponent],
})
export class LinhaPerfilModule {}
