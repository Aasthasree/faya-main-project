import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//component
import { CustomerServiceInjectionComponent } from './dependency-injection/customer-service-injection/customer-service-injection.component';
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'input-output',component:InputOutputDecoratorComponent},
  {path:'customer-service',component:CustomerServiceInjectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
