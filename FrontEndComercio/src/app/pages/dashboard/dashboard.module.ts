import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { NgChartsModule } from 'ng2-charts';
import { RefresherModule } from 'src/app/components/refresher/refresher.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgChartsModule,
    RefresherModule,
    LoadingModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
