//Angular Modules
import { Component,ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
//validator
import { CustomValidator } from '../shared/custom-validator/custom-validator';
//interface
import { Registration } from './registration-model/registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  registrationForm: FormGroup;
  addressesAreSame: boolean=false;
  //To render login component
  showLoginForm: boolean;
  //object initializing globally
  registrationFormOutput: Registration;

  constructor(
    private fb: FormBuilder,
     private el: ElementRef
     ) { }

  // Retrieve the controls within the 'skills' FormArray for easy access and manipulation
  get skillControls() {
    return (<FormArray> this.registrationForm.get('skills')).controls;
  }

  //ngonit
  ngOnInit() {
    this.initializeForm();
  }

  //function calling
  private initializeForm() {
    this.registrationForm = this.fb.group({
      firstname: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      lastname: ['' , [Validators.required,CustomValidator.cannotContainSpace]],
      email: ['' , [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),CustomValidator.cannotContainSpace]],
      date_of_birth: ['' ,Validators.required],
      Phone: ['' ,Validators.required],
      gender: ['male',Validators.required],
      permanent_address: this.createAddressFormGroup(),
      communication_address: this.createAddressFormGroup(),

      //form array
      skills: this.fb.array([
        this.fb.control('' , [Validators.required,CustomValidator.cannotContainSpace])
      ])
    });
  }

  /**
 * Create address form group with validations.
 */
  private createAddressFormGroup(): FormGroup {
    return this.fb.group({
      street: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      country: ['' , Validators.required],
      city: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      region: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      postal_code: ['' , Validators.required],
    });
  }


 /**
 * Handle checkbox change event to toggle address synchronization.
 * @param event - The checkbox change event.
 */
  onCheckboxChange(event: any) {
    this.addressesAreSame = event.target.checked;
    if (!this.addressesAreSame) {
      this.registrationForm.get('communication_address').reset();
    }
    this.registrationForm.get(['communication_address', 'country']).setValue('');
  }


 //Handle form submission, validate, and manage address synchronization.
  onClickSubmit() {
    const communicationAddressValue = this.addressesAreSame ? this.registrationForm.value.permanent_address : this.registrationForm.value.communication_address;
    this.registrationForm.patchValue({
      communication_address: communicationAddressValue
    });

    if (this.registrationForm.valid) {
      if (this.registrationForm.get('isSameAsPermanent')) {
        this.registrationForm.removeControl('isSameAsPermanent');
      }
      //to show ouput isSameAsPermanent true or false
      this.registrationForm.addControl('isSameAsPermanent', new FormControl(this.addressesAreSame));
      this.transformFormData();
      //To render login component
      this.showLoginForm = true;
    } else {
      //scroll if error occurs
      this.registrationForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

 //Extract and transform form data into desired output format.
  transformFormData() {
    const formData = this.registrationForm.value;
    this.registrationFormOutput = {
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
    console.log(this.registrationFormOutput);
  }

  //Retrieve the 'skills' FormArray from the registration form.
  get skills() {
    return this.registrationForm.get('skills') as FormArray;
  }

  //Add a new skill FormControl to the 'skills' FormArray
  onClickAddSKill() {
    this.skills.push(this.fb.control('' , Validators.required));
  }

  /**
 * Remove a skill FormControl at the specified index from the 'skills' FormArray.
 * Ensures there is at least one skill remaining.
 * @param index - The index of the skill to be removed.
 */
  onClickDeleteSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  /**
   * Scroll to the top of the first invalid form control.
   * Uses smooth scrolling to navigate to the top of the first invalid control.
   */
  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      'form .ng-invalid'
    );
    if (firstInvalidControl) {
      window.scroll({
        top: this.getTopOffset(firstInvalidControl),
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  private getTopOffset(controlEl: HTMLElement): number {
    return controlEl.getBoundingClientRect().top + window.scrollY - 50;
  }

  //To disable future calender dates
  //Get the current date in string format (YYYY-MM-DD).
  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
/**
 * Validate the selected date against the current date.
 * If the selected date is in the future, set 'invalidDate' error; otherwise, clear errors.
 */
  validateDate() {
    const selectedDate = new Date(this.registrationForm.get('date_of_birth').value);
    const today = new Date();
    if (selectedDate > today) {
      this.registrationForm.get('date_of_birth').setErrors({ 'invalidDate': true });
    } else {
      this.registrationForm.get('date_of_birth').setErrors(null);
    }
  }

}






















