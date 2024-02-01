//Angular imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router
    ) {}

  // Method for user login, returns true if authentication is successful, false otherwise
  login(username: string, password: string){
    if (this.verifyCredentials(username, password)) {
      localStorage.setItem('authToken', 'generatedToken');
      this.router.navigate(['/admin']);
    } else {
      alert('Invalid username or password');
    }
  }

  // Method to log the user out by clearing authentication information
  logout(): void {
    this.clearAuthentication();
  }

  // Private method to clear authentication information from local storage
  private clearAuthentication(): void {
    localStorage.clear();
  }

 // Private method to verify provided credentials against required values
  private verifyCredentials(username: string, password: string) {
  const requiredUsername = 'admin';
  const requiredPassword = 'admin';

  if (username === requiredUsername && password === requiredPassword) {
    return true;
  } else {
    return false;
  }
}


}