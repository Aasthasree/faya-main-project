import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regform: FormGroup;
  addressesAreSame: boolean = false
  isSubmitted: boolean = false
  disableDeleteIcon = false;

  constructor(private fb: FormBuilder, private el: ElementRef) { }
  get skillControls() {
    return (<FormArray>this.regform.get('skills')).controls;
  }
  //ngonit
  ngOnInit() {
    this.initializeForm();
  }

  //function calling
  private initializeForm() {
    this.regform = this.fb.group({
      First_name: ['', Validators.required],
      Last_name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      DOB: ['', Validators.required],
      Ph_num: ['', Validators.required],
      Gender: ['male', Validators.required],

      permanent_address: this.fb.group({
        Street: ['', Validators.required],
        Country: ['', Validators.required],
        City: ['', Validators.required],
        Region: ['', Validators.required],
        Postal_code: ['', Validators.required],
      }),

      communication_address: this.fb.group({
        Street: ['', Validators.required],
        Country: ['', Validators.required],
        City: ['', Validators.required],
        Region: ['', Validators.required],
        Postal_code: ['', Validators.required],
      }),
      //form array
      skills: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }
  //checkbox reset
  onCheckboxChange(event: any) {
    this.addressesAreSame = event.target.checked;
    if (!this.addressesAreSame) {
      this.regform.get('communication_address').reset();
    }
    this.regform.get(['communication_address', 'Country']).setValue('');
  }
  //submit
  onSubmit() {
    const isSubmitted = this.isSubmitted = true
    const communicationAddressValue = this.addressesAreSame ? this.regform.value.permanent_address : this.regform.value.communication_address;
    this.regform.patchValue({
      communication_address: communicationAddressValue
    });

    if (this.regform.valid) {

    } else {
      //scroll if error occurs
      this.regform.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
    if (this.regform.valid) {
      if (this.regform.get('isSameAsPermanent')) {
        this.regform.removeControl('isSameAsPermanent');
      }
      //to show ouput isSameAsPermanent true or false
      this.regform.addControl("isSameAsPermanent", new FormControl(this.addressesAreSame));
      console.log(this.regform.value);
    }
  }
  //submit ends----------
  //skill 
  get skills() {
    return this.regform.get('skills') as FormArray
  }
  addSKill() {
    this.skills.push(this.fb.control('', Validators.required))
  }
  //skill delete icon
  delete(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }
  //scroll bar
  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid"
    );

    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth"
    });
  }
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
  //To disable future calender dates
  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  validateDate() {
    const selectedDate = new Date(this.regform.get('DOB').value);
    const today = new Date();
    if (selectedDate > today) {
      this.regform.get('DOB').setErrors({ 'invalidDate': true });
    } else {
      this.regform.get('DOB').setErrors(null);
    }
  }
}






















