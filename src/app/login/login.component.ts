//Angular imports
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//validator
import { CustomValidator } from '../shared/custom-validator/custom-validator';
//service
import { AuthenticationService } from './authservice/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
      this.initializeLoginForm();
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