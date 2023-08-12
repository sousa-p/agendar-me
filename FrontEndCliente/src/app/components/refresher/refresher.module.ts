import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefresherComponent } from './refresher.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RefresherComponent],
  imports: [CommonModule, IonicModule],
  exports: [RefresherComponent],
})
export class RefresherModule {}
