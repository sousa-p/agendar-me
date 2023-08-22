import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient, private Cookie: CookieService) {}

  private url: string = 'http://localhost/agendar/System/';

  request(data: any): Observable<any> {
    data['autor'] = 'User';
    const token = this.Cookie.get('token');
    if (token !== '') data['Authorization'] = `Bearer ${token}`;

    return this.http.post(this.url, JSON.stringify(data));
  }
}
