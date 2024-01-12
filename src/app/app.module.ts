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
import { customerRegistrationComponent } from './customer-registration/customer-registration.component';
import { customerLoginComponent } from './customer-login/customer-login.component';
import { ValidationComponentComponent } from './shared/common-validation-error/validation-component.component';
import { customerListComponent } from './customer/customer-list/customer-list.component';
import { customerFormComponent } from './customer/customer-form/customer-form.component';

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
    customerRegistrationComponent,
    customerLoginComponent,
    ValidationComponentComponent,
    ValidationComponentComponent,
    customerListComponent,
    customerFormComponent,

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
