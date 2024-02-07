import { Component } from '@angular/core';
//service
import { AuthenticationService } from 'src/app/login/service/authentication';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private authenticationService: AuthenticationService
  ) { }


  onClickLogout() {
    this.authenticationService.logout().subscribe();
  }

}