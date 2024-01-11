import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//component
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';
import { RegistrationComponent } from './registration/registration.component';
import { customerListComponent } from './customer/customer-list/customer-list.component';


const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'input-output',component:InputOutputDecoratorComponent},
  {path:'customer-service',component:customerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
