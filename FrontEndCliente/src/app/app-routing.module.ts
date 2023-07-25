import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { RedirectGuard } from './core/auth/redirect.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule),
    canActivate: [RedirectGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [RedirectGuard]
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./pages/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule),
    canActivate: [RedirectGuard]
  },
  {
    path: 'horario',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'horario/:date',
    loadChildren: () => import('./pages/horario/horario.module').then( m => m.HorarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agendamentos',
    loadChildren: () => import('./pages/agendamentos/agendamentos.module').then( m => m.AgendamentosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
