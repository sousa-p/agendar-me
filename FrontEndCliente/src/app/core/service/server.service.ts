import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost/agendar/System/';

  request (data: any): Observable<any> {
    return this.http.post(this.url, JSON.stringify(data));
  }
}
