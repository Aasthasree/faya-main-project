import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Input property to receive registration data from the parent component
  @Input() regValue: any;
  // Property to store the concatenated password
  password: string = ''


// Lifecycle hook called after component initialization
  ngOnInit() {
   this.password = this.regValue.First_name + this.regValue.Last_name
   }
}