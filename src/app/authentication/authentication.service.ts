import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'authToken';

  login(username: string, password: string): boolean {
    if (this.verifyCredentials(username, password)) {
      this.setAuthentication(username, password);
      console.log('Authentication successful');
      return true;
    }

    console.log('Authentication failed');
    return false;
  }

  logout(): void {
    this.clearAuthentication();
    console.log('Logged out');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated() || this.getAuthToken() !== null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(username: string, password: string): void {
    this.setAuthentication(username, password);
    console.log('Token set');
  }

  private setAuthentication(username: string, password: string): void {
    const authToken = this.generateAuthToken();
    localStorage.setItem(this.tokenKey, authToken);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  private clearAuthentication(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  private generateAuthToken(): string {
    return 'generatedToken';
  }

  private verifyCredentials(username: string, password: string): boolean {
    // Specify your required username and password here
    const requiredUsername = 'aastha';
    const requiredPassword = '12345';

    return (
      username === requiredUsername &&
      password === requiredPassword
    );
  }

  private isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  constructor() { }
}

