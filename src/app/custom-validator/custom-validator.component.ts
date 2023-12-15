import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-custom-validator',
  template: `  
  <ng-container *ngIf="control.invalid && (control.touched || control.dirty)" class="validation-error">
  <small *ngIf="control.errors?.required" class="mt">{{key}} is required</small>
  <small *ngIf="control.errors?.pattern">{{key}} is invalid</small>
 </ng-container>
`,
  styleUrls: ['./custom-validator.component.scss']
})
export class CustomValidatorComponent {
  @Input() control:any='';
  @Input() key:any='';

}
