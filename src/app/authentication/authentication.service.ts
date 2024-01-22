import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly validUsername = 'admin@gmail.com';
  private readonly validPassword = 'admin123';
  private isAuthenticated = false;


  constructor() { }
}
