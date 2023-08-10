import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServerService } from '../service/server.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private Server: ServerService, private router: Router, private Cookie: CookieService) {}

  canActivate(): Observable<boolean> {
    const data = {
      route: 'User',
      action: 'validarToken',
    };
    return this.Server.request(data).pipe(
      map((response: any) => {
        if (response.retorno === 'success')
          return true;
        this.router.navigate(['/login']);
        this.Cookie.deleteAll();
        return false;
      })
    );
  }
}
