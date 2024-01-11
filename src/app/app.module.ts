// Angular Core Modules
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Angular Routing
import { AppRoutingModule } from './app-routing.module';
import { Routes } from '@angular/router';

// Angular HTTP
import { HttpClientModule } from '@angular/common/http';

// Angular Common Modules
import { CommonModule, DatePipe } from '@angular/common';

//components
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChildComponent } from './input-output-decorator/child/child.component';
import { LoginComponent } from './login/login.component';
import { ValidationComponentComponent } from './shared/common-validation-error/validation-component.component';
import { customerListComponent } from './customer/customer-list/customer-list.component';
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';
import { EditFormComponent } from './customer/edit-form/edit-form.component';

//pipes
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { FilterPipePipe } from './shared/pipes/filter-pipe.pipe';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { ValidDatePipe } from './shared/pipes/valid-date.pipe';

//Third-party
import { NgxMaskModule } from 'ngx-mask';



const routes: Routes = [
  { path: 'data/:id', component: customerListComponent },
  { path: 'data', component: customerListComponent},
  { path: '', redirectTo: '/data', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    // Components
    AppComponent,
    RegistrationComponent,
    InputOutputDecoratorComponent,
    ChildComponent,
    LoginComponent,
    ValidationComponentComponent,
    ValidationComponentComponent,
    customerListComponent,
    EditFormComponent,

     // Pipes
     PercentagePipe,
     FilterPipePipe,
     CapitalizePipe,
     ValidDatePipe,
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
