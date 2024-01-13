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
import { RegistrationComponent} from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ValidationComponentComponent } from './shared/common-validation-error/validation-component.component';
import { CustomerListComponent} from './customer/customer-list/customer-list.component';
import { CustomerFormComponent} from './customer/customer-form/customer-form.component';

//pipes
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { FilterPipePipe } from './shared/pipes/filter-pipe.pipe';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { ValidDatePipe } from './shared/pipes/valid-date.pipe';

//Third-party
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ValidationComponentComponent,
    CustomerListComponent,
    CustomerFormComponent,

     // Pipes
     PercentagePipe,
     FilterPipePipe,
     CapitalizePipe,
     ValidDatePipe,
  ],
  
  imports: [
    // Angular modules
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
   // Third-party modules
    NgxMaskModule.forRoot(),
   // Custom modules
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
