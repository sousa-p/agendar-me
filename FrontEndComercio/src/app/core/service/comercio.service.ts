import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root',
})
export class ComercioService {
  constructor(
    private router: Router,
    private Cookie: CookieService,
    private Server: ServerService
  ) {}

  public login(data: any) {
    data['route'] = 'Comercio';
    data['action'] = 'login';

    return this.Server.request(data);
  }

  public logout() {
    this.Cookie.delete('token');
    this.router.navigate(['/login']);
    location.reload();
  }

  public getClientes() {
    const data = {
      route: 'Comercio',
      action: 'getClientes',
    };

    return this.Server.request(data);
  }

  public cadastrarCliente (data: any) {
    data['route'] = 'User';
    data['action'] = 'cadastrar';

    return this.Server.request(data);

  }

  public deleteCliente(idUser: number) {
    const data = {
      route: 'Comercio',
      action: 'deleteCliente',
      ID_USER: idUser,
    };

    return this.Server.request(data);
  }

  public getDashboardInfos() {
    const data = {
      route: 'Comercio',
      action: 'getDashboardInfos',
    };

    return this.Server.request(data);
  }
}
