//Angular imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//validator
import { CustomValidator } from '../shared/custom-validator/custom-validator';
//service
import { AuthenticationService } from './service/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }


  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, CustomValidator.cannotContainSpace]],
      password: ['', [Validators.required, CustomValidator.cannotContainSpace]]
    });
  }

  onClickSubmit(): void {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const grant_type = 'password';

    this.authenticationService.login({ grant_type, username, password })
      .subscribe({
        next: (response) => {
          if (response.access_token) {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('refreshtoken', response.refresh_token);
            localStorage.setItem('expirytime',response.expires_in.toString());
            this.router.navigate(['/admin']);
          }

        },
        error: (error) => {
          console.error(error);
        },
      });
  }

}