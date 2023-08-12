import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { CarrosselComponent } from 'src/app/components/carrossel/carrossel.component';
import { RefresherModule } from 'src/app/components/refresher/refresher.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoadingModule,
    RefresherModule,
  ],
  declarations: [HomePage, CarrosselComponent],
})
export class HomePageModule {}
