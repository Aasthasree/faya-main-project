import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation',
  template: `  
  <ng-container *ngIf="control.invalid && (control.touched || control.dirty)" class="validation-error">
  <small *ngIf="control.errors?.required" class="mt">{{key}} is required</small>
  <small *ngIf="control.errors?.pattern">{{key}} is invalid</small>
  <small *ngIf="control.errors?.cannotContainSpace">No spaces allowed in {{key}}</small>
 </ng-container>
`,
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {
  @Input() control: any = '';
  @Input() key: any = '';

}
