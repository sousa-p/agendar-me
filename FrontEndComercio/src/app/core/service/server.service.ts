import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient, private Cookie: CookieService) {}

  private url: string = 'https://teste-epa.000webhostapp.com/System/';

  request(data: any): Observable<any> {
    data['autor'] = 'Comercio';
    const token = this.Cookie.get('token');

    if (token !== '') data['Authorization'] = `Bearer ${token}`;

    return this.http.post(this.url, JSON.stringify(data));
  }
}
