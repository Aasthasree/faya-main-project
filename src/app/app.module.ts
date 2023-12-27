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
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { FilterPipePipe } from './shared/pipes/filter-pipe.pipe';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { ValidationComponentComponent } from './shared/common-validation-error/validation-component.component';



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
