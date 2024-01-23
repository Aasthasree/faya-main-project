import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Private member to store the key for the authentication token in local storage
  private tokenKey = 'authToken';

  // Method for user login, returns true if authentication is successful, false otherwise
  login(username: string, password: string): boolean {
    if (this.verifyCredentials(username, password)) {
      this.setAuthentication(username, password);
      console.log('Authentication successful');
      return true;
    }

    console.log('Authentication failed');
    return false;
  }

  // Method to log the user out by clearing authentication information
  logout(): void {
    this.clearAuthentication();
    console.log('Logged out');
  }

// Method to set an authentication token (placeholder implementation)
  setToken(username: string, password: string): void {
    this.setAuthentication(username, password);
    console.log('Token set');
  }

   // Private method to set authentication information in local storage
  private setAuthentication(username: string, password: string): void {
    const authToken = this.generateAuthToken();
    localStorage.setItem(this.tokenKey, authToken);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  // Private method to clear authentication information from local storage
  private clearAuthentication(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

   // Private method to generate an authentication token (placeholder implementation)
  private generateAuthToken(): string {
    return 'generatedToken';
  }

  // Private method to verify provided credentials against required values
  private verifyCredentials(username: string, password: string): boolean {
    const requiredUsername = 'aastha';
    const requiredPassword = '12345';

    return (
      username === requiredUsername &&
      password === requiredPassword
    );
  }


  constructor() { }
}

