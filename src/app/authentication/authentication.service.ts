import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly validUsername = 'admin@gmail.com';
  private readonly validPassword = 'admin123';
  private isAuthenticated = false;
  private defaultAuthToken: string | null = null;

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this.defaultAuthToken = 'your_generated_token';
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }



  constructor() { }
}
