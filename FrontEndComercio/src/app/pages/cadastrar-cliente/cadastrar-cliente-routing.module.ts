import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarClientePage } from './cadastrar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarClientePageRoutingModule {}
