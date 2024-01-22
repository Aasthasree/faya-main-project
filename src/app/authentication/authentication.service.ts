import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly validUsername = 'aastha';
  private readonly validPassword = '12345';
  isAuthenticated: boolean = false;
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

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getAuthToken(): string | null {
    return this.defaultAuthToken;
  }


  constructor() { }
}
