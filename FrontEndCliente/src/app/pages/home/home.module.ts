import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FabComponent } from 'src/app/component/fab/fab.component';
import { CarrosselComponent } from 'src/app/component/carrossel/carrossel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FabComponent, CarrosselComponent]
})
export class HomePageModule {}
