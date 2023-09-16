import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalHorarioLivreComponent } from './modal-horario-livre.component';
import { LinhaPerfilModule } from '../linha-perfil/linha-perfil.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalHorarioLivreComponent],
  imports: [CommonModule, IonicModule, LinhaPerfilModule, FormsModule],
  exports: [ModalHorarioLivreComponent],
})
export class ModalHorarioLivreModule {}
