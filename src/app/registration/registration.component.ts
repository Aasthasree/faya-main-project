//Angular Modules
import { Component,ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
//validator
import { CustomValidator } from '../shared/custom-validators/custom.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  regform: FormGroup;
  addressesAreSame: boolean=false;
  //To render login component
  goLogin: boolean;
  //object initializing globally
  regFormOutput: any;

  constructor(
    private fb: FormBuilder,
     private el: ElementRef
     ) { }

  // Retrieve the controls within the 'skills' FormArray for easy access and manipulation
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
      firstname: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      lastname: ['' , [Validators.required,CustomValidator.cannotContainSpace]],
      email: ['' , [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),CustomValidator.cannotContainSpace]],
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
      this.regform.get('communication_address').reset();
    }
    this.regform.get(['communication_address', 'country']).setValue('');
  }


 //Handle form submission, validate, and manage address synchronization.
  onSubmit() {
    const communicationAddressValue = this.addressesAreSame ? this.regform.value.permanent_address : this.regform.value.communication_address;
    this.regform.patchValue({
      communication_address: communicationAddressValue
    });

    if (this.regform.valid) {
      if (this.regform.get('isSameAsPermanent')) {
        this.regform.removeControl('isSameAsPermanent');
      }
      //to show ouput isSameAsPermanent true or false
      this.regform.addControl("isSameAsPermanent", new FormControl(this.addressesAreSame));
      this.getFormData()
      //To render login component
      this.goLogin = true;
    } else {
      //scroll if error occurs
      this.regform.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

 //Extract and transform form data into desired output format.
  getFormData() {
    const formData = this.regform.value;
    this.regFormOutput = {
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
    console.log(this.regFormOutput)
  }

  //Retrieve the 'skills' FormArray from the registration form.
  get skills() {
    return this.regform.get('skills') as FormArray
  }
 
  //Add a new skill FormControl to the 'skills' FormArray
  addSKill() {
    this.skills.push(this.fb.control('' , Validators.required))
  }

  /**
 * Remove a skill FormControl at the specified index from the 'skills' FormArray.
 * Ensures there is at least one skill remaining.
 * @param index - The index of the skill to be removed.
 */
  onClickDelete(index: number) {
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
    const selectedDate = new Date(this.regform.get('date_of_birth').value);
    const today = new Date();
    if (selectedDate > today) {
      this.regform.get('date_of_birth').setErrors({ 'invalidDate': true });
    } else {
      this.regform.get('date_of_birth').setErrors(null);
    }
  }

}






















