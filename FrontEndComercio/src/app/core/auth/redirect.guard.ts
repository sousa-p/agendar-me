import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServerService } from '../service/server.service';

@Injectable()
export class RedirectGuard implements CanActivate {
  constructor(private Server: ServerService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const data = {
      route: 'Comercio',
      action: 'validarToken',
    };
    return this.Server.request(data).pipe(
      map((response: any) => {
        if (response.retorno !== 'success') return true;
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
