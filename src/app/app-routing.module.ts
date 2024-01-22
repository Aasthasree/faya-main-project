import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//component
import { RegistrationComponent } from './registration/registration.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './admin/components/home/home.component';
import { authGuard } from './authentication/authentication.guard';


const routes: Routes = [
  {path: '',component: RegistrationComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {path: 'customer-service',component: CustomerListComponent},
  {path: 'login',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
