import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // basepath = "https://hope.arkatechs.com/api"
  // basepath = "https://laravel.hopeowls.com/api"
  // basepath = "http://127.0.0.1:8000/api"
  basepath = "http://localhost:3000"
  activeTab: any = sessionStorage.getItem('adminActiveTab') ? sessionStorage.getItem('adminActiveTab') : 'dashboard';
  menu: boolean = true;
  isLogin: any = sessionStorage.getItem('userLogin') ? sessionStorage.getItem('userLogin') : 'false';
  userName = this.getUserName() ;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token')
  }

  // no headers
  post(url: any, req: any) {
    return this.http.post(url, req)
  }

  // no headers
  get(url: any) {
    return this.http.get(url)
  }

  getAuthenticateData(url: any): Observable<any> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');

    if (token != null) {
      headers = headers.append('Authorization', `Bearer ${token}`);
      // headers = headers.set('x-access-token', token); // Alternatively, use set for replacing all headers
    }

    return this.http.get(url, { headers: headers });
  }

  postAuthenticateData(url: any, req: any): Observable<any> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');

    if (token != null) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.post(url, req, { headers: headers });
  }

  postDataWithImage(url: any, formData: FormData): Observable<any> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');

    if (token != null) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.post(url, formData, { headers: headers });
  }

  getUserName() {
    return localStorage.getItem('userName');
  }
}