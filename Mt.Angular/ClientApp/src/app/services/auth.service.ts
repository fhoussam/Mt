import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticateUser(redirect: string): void {
    window.location.href = `accounts?redirect=${redirect}`;
  }

  public getUserInfo(): Observable<any> {
    return this.http.get("api/accounts/user-info");
  }
}
