import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FabComponent } from 'src/app/component/fab/fab.component';
import { CardDiaComponent } from 'src/app/component/card-dia/card-dia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FabComponent, CardDiaComponent]
})
export class HomePageModule {}
