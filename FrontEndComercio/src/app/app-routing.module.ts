import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { RedirectGuard } from './core/auth/redirect.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [RedirectGuard],
  },
  {
    path: 'horario',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'horario/:date',
    loadChildren: () =>
      import('./pages/horario/horario.module').then((m) => m.HorarioPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracoes',
    loadChildren: () =>
      import('./pages/configuracoes/configuracoes.module').then(
        (m) => m.ConfiguracoesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./pages/clientes/clientes.module').then(
        (m) => m.ClientesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastrar-cliente',
    loadChildren: () =>
      import('./pages/cadastrar-cliente/cadastrar-cliente.module').then(
        (m) => m.CadastrarClientePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracoes',
    loadChildren: () => import('./pages/configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
