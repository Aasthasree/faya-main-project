import { Component } from '@angular/core';
//service
import { AuthenticationService } from 'src/app/login/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  onClickLogout(){
    this.authenticationService.logout();
  }

}