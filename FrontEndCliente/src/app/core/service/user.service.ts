import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Server: ServerService, private router: Router, private Cookie: CookieService) { }
  
  login(data: any) {
    data['route'] = 'User';
    data['action'] = 'login';
    return this.Server.request(data);
  }

  logout() {
    this.Cookie.delete('token');
    this.router.navigate(['/login']);
  }
}
