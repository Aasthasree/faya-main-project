import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  // Input property to receive registration data from the parent component
  // @Input() regValue: any;
  // // Property to store the concatenated password
  // password: string = '';


// Lifecycle hook called after component initialization
  // ngOnInit() {
  //  this.password = this.regValue.First_name + this.regValue.Last_name;
  //  }

username = '';
password = '';

constructor(private authService: AuthenticationService , private router: Router) {}

onSubmit(): void {
  if (this.authService.login(this.username, this.password)) {
    // Redirect to the admin module's home component
    this.router.navigate(['/admin']);
  } else {
    alert('Invalid username or password');
  }
}


}

