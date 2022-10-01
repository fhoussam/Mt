import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public authenticateUser(redirect: string): void {
    window.location.href = `accounts?redirect=${redirect}`;
  }

  public getUserInfo(): Observable<UserModel> {
    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.origin;
    if (baseUrl === "http://localhost:4200") {
      let fakeUserContext = new UserModel();
      fakeUserContext.id = "1111-2222-3333-4444";
      fakeUserContext.name = "alice";
      fakeUserContext.role = "admin";
      return of(fakeUserContext);
    }
    return this.http.get<UserModel>("api/accounts/user-info");
  }
}
