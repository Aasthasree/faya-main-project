import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() set defaultUsername(value: string) {
    // Set the default value for the username input
    this.username = value;
  }

  username: string = '';
}
