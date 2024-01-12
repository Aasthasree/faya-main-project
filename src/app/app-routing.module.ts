import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//component
import { customerRegistrationComponent } from './customer-registration/customer-registration.component';
import { customerListComponent } from './customer/customer-list/customer-list.component';


const routes: Routes = [
  {path:'',component:customerRegistrationComponent},
  {path:'customer-service',component:customerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
