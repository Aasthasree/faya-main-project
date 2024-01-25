//Angular Core imports
import { Component, Input, OnInit } from '@angular/core';
//service
import { AuthenticationService } from './authservice/auth.service';
//router
import { Router } from '@angular/router';
//Angular FormsModule
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../shared/custom-validators/custom-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Input property to receive registration data from the parent component
  // @Input() regValue: any;
  // // Property to store the concatenated password
  // password: string = '';


  // Lifecycle hook called after component initialization
  // ngOnInit() {
  //  this.password = this.regValue.First_name + this.regValue.Last_name;
  //  }

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
    this.authenticationService.login(this.username, this.password);
  }

}


