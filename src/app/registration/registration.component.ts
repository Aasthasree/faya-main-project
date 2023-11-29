
import { Component,OnInit,ElementRef} from '@angular/core';
import { FormGroup,FormBuilder,FormArray,FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regform: FormGroup; 
  addressesAreSame:boolean=false
  isSubmitted:boolean=false
  disableDeleteIcon = false;

  constructor(private fb: FormBuilder, private el: ElementRef){}

  get skillControls(){
    return (<FormArray>this.regform.get('skills')).controls;
  }

  ngOnInit() {
    this.initializeForm();
  }
  
  private initializeForm() {
    this.regform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['male', Validators.required],

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

      skills: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }

  onSubmit(){
    const isSubmitted=this.isSubmitted=true
    const communicationAddressValue =  this.addressesAreSame? this.regform.value.permanent_address:this.regform.value.communication_address;
    this.regform.patchValue({
      communication_address: communicationAddressValue
    });
    const formdata={
      First_name:this.regform.value.firstname,
      Last_name:this.regform.value.lastname,
      Email:this.regform.value.email,
      DOB:this.regform.value.date,
      Ph_num:this.regform.value.phone,
      Gender:this.regform.value.gender,
      permanent_address:this.regform.value.permanent_address,
       communication_address: this.regform.value.communication_address,
      Skill:this.regform.value.skills
    }

    if(this.regform.valid){
      console.log(formdata)
    }else {
      this.regform.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }
  get skills()
  {
      return this.regform.get('skills') as FormArray
  }
  addSKill()
  {
      this.skills.push( this.fb.control('',Validators.required))
  console.log(this.skills,'tet') 
  }

   delete(index:number)
   {
   if (this.skills.length > 1) {
   this.skills.removeAt(index);
   this.updateDeleteIconState();
  }
 }

updateDeleteIconState() {
   this.disableDeleteIcon = this.skills.length === 1;
 }


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

  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  validateDate() {
    const selectedDate = new Date(this.regform.get('date').value);
    const today = new Date();

    if (selectedDate > today) {
      this.regform.get('date').setErrors({ 'invalidDate': true });
    } else {
      this.regform.get('date').setErrors(null);
    }
  }

  
}


 

 
 
 

  

  
 
 

  


  




