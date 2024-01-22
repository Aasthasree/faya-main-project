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
      this.defaultAuthToken = 'generatedToken';
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    // Reset authentication status, clear the token, and any other user data
    this.isAuthenticated = false;
    this.defaultAuthToken = null;
  }




  constructor() { }
}
