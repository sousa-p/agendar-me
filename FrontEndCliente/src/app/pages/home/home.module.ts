import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CarrosselComponent } from 'src/app/components/carrossel/carrossel.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoadingModule,
  ],
  declarations: [HomePage, CarrosselComponent],
})
export class HomePageModule {}
