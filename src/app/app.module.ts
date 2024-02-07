// Angular imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

//components
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Third-party
import { NgxMaskModule } from 'ngx-mask';

//module
import { SharedModule } from './shared/sharedmodule/shared.module';

//Interceptor
import { Interceptor } from './login/interceptor/interceptor';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    RegistrationComponent,
    LoginComponent,
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
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }