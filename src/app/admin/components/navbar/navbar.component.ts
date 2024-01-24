import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/login/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private authService: AuthenticationService
    ) {}

  onClicklogout(): void {
    this.authService.logout();
  }

}
