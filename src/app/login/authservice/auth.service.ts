//Angular core imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) {

  }
  // Private member to store the key for the authentication token in local storage
  private tokenKey = 'authToken';

  // Method for user login, returns true if authentication is successful, false otherwise
  login(username: string, password: string): boolean {
    if (this.verifyCredentials(username, password)) {
      this.setAuthentication();
      this.router.navigate(['/admin']);
      return true;
    }
    alert('Invalid username or password');
    return false;
  }

  // Method to log the user out by clearing authentication information
  logout(): void {
    this.clearAuthentication();
  }

  // Private method to set authentication information in local storage
  private setAuthentication(): void {
    const authToken = 'generatedToken';
    localStorage.setItem(this.tokenKey, authToken);
  }
  //

  // Private method to clear authentication information from local storage
  private clearAuthentication(): void {
    localStorage.clear();
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

}