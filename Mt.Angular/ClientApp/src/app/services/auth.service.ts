import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticateUser(redirect: string): void {
    window.location.href = `accounts?redirect=${redirect}`;
  }

  public getUserInfo(): Observable<UserModel> {
    return this.http.get<UserModel>("api/accounts/user-info");
  }
}
