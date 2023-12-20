import { Component,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../validators/custom.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regform: FormGroup;
  addressesAreSame: boolean = false;
  disableDeleteIcon = false;
  go_login: boolean = false;//To render login component
  regform_output: any;//object initializing globally

  constructor(private fb: FormBuilder, private el: ElementRef) { }
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
      firstname: ['', [Validators.required, CustomValidator.cannotContainSpace]],
      lastname: ['', [Validators.required,CustomValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),CustomValidator.cannotContainSpace]],
      date_of_birth: ['',Validators.required],
      Phone: ['',Validators.required],
      gender: ['male',Validators.required],
      
      permanent_address: this.fb.group({
        street:  ['', [Validators.required,CustomValidator.cannotContainSpace]],
        country:  ['',Validators.required],
        city:  ['', [Validators.required,CustomValidator.cannotContainSpace]],
        region:  ['', [Validators.required,CustomValidator.cannotContainSpace]],
        postal_code:  ['',Validators.required],
      }),
      communication_address: this.fb.group({
        street:  ['', [Validators.required,CustomValidator.cannotContainSpace]],
        country:  ['',Validators.required],
        city:  ['', [Validators.required,CustomValidator.cannotContainSpace]],
        region:  ['', [Validators.required,CustomValidator.cannotContainSpace]],
        postal_code:  ['',Validators.required],
      }),
      //form array
      skills: this.fb.array([
        this.fb.control('', [Validators.required,CustomValidator.cannotContainSpace])
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

  //---------submit start---------------
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
      this.go_login = true;

    } else {
      //scroll if error occurs
      this.regform.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

  //---------submit ends---------
  getFormData() {
    const formData = this.regform.value;
    // Transforming form values to the desired output format
    this.regform_output = {
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
    console.log(this.regform_output)
  }

  //skill 
  get skills() {
    return this.regform.get('skills') as FormArray
  }

  addSKill() {
    this.skills.push(this.fb.control('', Validators.required))
  }

  // removeSKill(){
  //    this.skills.controls.forEach((skill, i) => {
  //      this.skills.removeAt(i)
  //    })
  //   // this.skills.controls=[]
  // }

  //skill delete icon
  delete(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  //----scroll bar------
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






















