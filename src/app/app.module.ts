// Angular Modules
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

//components
import { AppComponent } from './app.component';
import { RegistrationComponent} from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { CustomerListComponent} from './customer/customer-list/customer-list.component';
import { CustomerFormComponent} from './customer/customer-form/customer-form.component';
import { ValidationComponent } from './shared/common-validation-error/validation-component';

//pipes
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { FilterPipe } from './shared/pipes/filter-pipe.pipe';
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
    ValidationComponent,
    CustomerListComponent,
    CustomerFormComponent,

     // Pipes
     PercentagePipe,
     FilterPipe,
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
