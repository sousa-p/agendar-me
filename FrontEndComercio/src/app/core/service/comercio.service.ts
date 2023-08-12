import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  constructor(private router: Router, private Cookie: CookieService, private Server: ServerService) { }
  
  logout() {
    location.reload();
    this.Cookie.delete('token');
    this.router.navigate(['/login']);
  }

  getClientes() {
    const data = {
      'route': 'Comercio',
      'action': 'getClientes'
    };
    
    return this.Server.request(data);
  }
}
