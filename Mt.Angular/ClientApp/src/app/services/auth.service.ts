import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public authenticateUser(redirect: string): void {
    window.location.href = `accounts?redirect=${redirect}`;
  }
}
