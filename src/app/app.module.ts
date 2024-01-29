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
import { NotFoundComponent } from './not-found/not-found.component';


//Third-party
import { NgxMaskModule } from 'ngx-mask';
//module
import { SharedModule } from './shared/sharedmodule/shared.module';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    CustomerListComponent,
    CustomerFormComponent,
    NotFoundComponent
  ],

  imports: [
    // Angular modules
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   // Third-party modules
    NgxMaskModule.forRoot(),
   // Custom modules
    AppRoutingModule,
    SharedModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }