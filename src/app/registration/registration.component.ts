import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private el: ElementRef, private router: Router) { }
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      Phone: ['', Validators.required],
      gender: ['male', Validators.required],

      permanent_address: this.fb.group({
        street: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postal_code: ['', Validators.required],
      }),

      communication_address: this.fb.group({
        street: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postal_code: ['', Validators.required],
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
    this.regform.get(['communication_address', 'country']).setValue('');
  }
  //submit
  onSubmit() {
    const isSubmitted = this.isSubmitted = true;
    const communicationAddressValue = this.addressesAreSame ? this.regform.value.permanent_address : this.regform.value.communication_address;
    this.regform.patchValue({
      communication_address: communicationAddressValue
    });
    if (this.regform.valid) {
      this.getFormData()
      this.router.navigate(['/login'])
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
      
    }
  }
  //submit ends---------

  getFormData(){
    const formData = this.regform.value;
    // Transforming form values to the desired output format
 const outputData = {
   First_name: formData.firstname,
   Last_name: formData.lastname,
   Email: formData.email,
   DOB: formData.date_of_birth,
   Ph_num: formData.Phone,
   Gender: formData.gender,
   Permanent_address: {
     Street: formData.permanent_address.street,
     Country: formData.permanent_address.country,
     City: formData.permanent_address.city,
     Region: formData.permanent_address.region,
     Postal_code: formData.permanent_address.postal_code,
   },
   isSameAsPermanent: formData.isSameAsPermanent,
   Communication_address: {
     Street: formData.communication_address.street,
     Country: formData.communication_address.country,
     City: formData.communication_address.city,
     Region: formData.communication_address.region,
     Postal_code: formData.communication_address.postal_code,
   },
   skill: formData.skills,
 };

   console.log(outputData)

  }
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
  
    if (firstInvalidControl) {
      window.scroll({
        top: this.getTopOffset(firstInvalidControl),
        left: 0,
        behavior: "smooth"
      });
    }
  }
  
  private getTopOffset(controlEl: HTMLElement): number {
    return controlEl.getBoundingClientRect().top + window.scrollY - 50;
  }
  //To disable future calender dates
  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  validateDate() {
    const selectedDate = new Date(this.regform.get('date_of_birth').value);
    const today = new Date();
    if (selectedDate > today) {
      this.regform.get('date_of_birth').setErrors({ 'invalidDate': true });
    } else {
      this.regform.get('date_of_birth').setErrors(null);
    }
  }
}






















