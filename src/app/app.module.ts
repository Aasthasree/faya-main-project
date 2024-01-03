import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ChildComponent } from './input-output-decorator/child/child.component';
import { LoginComponent } from './login/login.component';
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { FilterPipePipe } from './shared/pipes/filter-pipe.pipe';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { ValidationComponentComponent } from './shared/common-validation-error/validation-component.component';
import { CustomerServiceInjectionComponent } from './customer-service-injection/customer-service-injection.component';
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { ValidDatePipe } from './shared/pipes/validDate.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { EditFormComponent } from './edit-form/edit-form.component';




const routes: Routes = [
  { path: 'data/:id', component: CustomerServiceInjectionComponent },
  { path: 'data', component: CustomerServiceInjectionComponent},
  { path: '', redirectTo: '/data', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    InputOutputDecoratorComponent,
    ChildComponent,
    LoginComponent,
    PercentagePipe,
    FilterPipePipe,
    CapitalizePipe,
    ValidationComponentComponent,
    ValidationComponentComponent,
    CustomerServiceInjectionComponent,
    ValidDatePipe,
    EditFormComponent,
    
  
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    HttpClientModule,
    CommonModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
