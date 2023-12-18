import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';
import { ChildComponent } from './input-output-decorator/child/child.component';
import { LoginComponent } from './login/login.component';
import { PercentagePipe } from './pipes/percentage.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CustomValidatorComponent } from './custom-validator/custom-validator.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    InputOutputDecoratorComponent,
    ChildComponent,
    LoginComponent,
    PercentagePipe,
    FilterPipePipe,
    CustomValidatorComponent,
    CapitalizePipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
