import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//component
import { RegistrationComponent } from './registration/registration.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './login/guard/authguard';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path: 'registration',component: RegistrationComponent},
  {path: 'customer-service',component: CustomerListComponent},
  {path: 'login',component: LoginComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
