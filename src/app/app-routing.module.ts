//Angular core imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//component
import { RegistrationComponent } from './registration/registration.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';
//Authguard
import { authGuard } from './login/authguard/authguard';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path: 'registration', component: RegistrationComponent},
  {path: 'customer-service', component: CustomerListComponent},
  {path: 'login', component: LoginComponent,canActivate: [authGuard]},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
