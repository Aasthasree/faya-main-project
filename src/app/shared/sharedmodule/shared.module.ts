//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { ValidationComponent } from '../validation-component/validation-component';
//Pipes
import { PercentagePipe } from '../pipes/percentage.pipe';
import { FilterPipe } from '../pipes/filter-pipe.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { ValidDatePipe } from '../pipes/valid-date.pipe';



@NgModule({
  declarations: [
    //component
    ValidationComponent,
     // Pipes
     PercentagePipe,
     FilterPipe,
     CapitalizePipe,
     ValidDatePipe,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    //component
    ValidationComponent,
     // Pipes
     PercentagePipe,
     FilterPipe,
     CapitalizePipe,
     ValidDatePipe,
  ]
})
export class SharedModule { }
