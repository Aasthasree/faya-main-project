//Angular imports
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//validator
import { CustomValidator } from '../shared/custom-validators/custom-validator';
//service
import { AuthenticationService } from './authservice/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string = '';
  password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/admin']);
    } else {
      this.initializeLoginForm();
    }
  }

  initializeLoginForm(){
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required,CustomValidator.cannotContainSpace]),
      'password': new FormControl('', [Validators.required,CustomValidator.cannotContainSpace])
    });
  }

  onClickSubmit(): void {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.authenticationService.login(username, password);
}

}


