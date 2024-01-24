//Angular Core imports
import { Component, Input, OnInit } from '@angular/core';
//service
import { AuthenticationService } from './service/auth.service';
//router
import { Router } from '@angular/router';
//Angular FormsModule
import { FormBuilder} from '@angular/forms';

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

  username: string = '';
  password: string = '';

constructor(
  private authService: AuthenticationService,
  private router: Router,
  private fb: FormBuilder
  ) {}

ngOnInit(){

  if(localStorage.getItem('authToken')){
    console.log('hit')
    this.router.navigate(['/admin']);
  }
}

onClickSubmit(): void {
  this.authService.login(this.username, this.password);
}

}


