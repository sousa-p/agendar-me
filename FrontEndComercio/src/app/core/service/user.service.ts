import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private Cookie: CookieService) { }
  
  logout() {
    location.reload();
    this.Cookie.delete('token');
    this.router.navigate(['/login']);
  }
}
