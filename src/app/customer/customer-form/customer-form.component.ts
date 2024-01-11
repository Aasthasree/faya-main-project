import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//validator
import { CustomValidator } from '../../shared/custom-validators/custom.validator';
//service
import { CustomerDataService } from '../customer-data.service';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class customerFormComponent implements OnChanges {
  @Input() editClick: boolean;
  @Input() id: any; 
  @Output() updateData = new EventEmitter<any>(); 
  formData: FormGroup;
   //Holds the data of the user being edited.
  userData: any = ''; 
  //property indicating whether the data has been updated
  isUpdated: boolean; 
  isCreateMode: boolean; 
  date = new Date();
  formattedDate = this.date.toISOString().slice(0, 10);
  

  constructor(
    private data: CustomerDataService, 
    private fb: FormBuilder
    ) {}

  ngOnChanges() {
    this.customerData();
    // If in edit mode, fetch data for the specified ID
    if (this.editClick) {
      this.getallData();
    }
  }

  customerData() {
    
    this.formData = this.fb.group({
      f_name: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      l_name: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      email: ['' , [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), CustomValidator.cannotContainSpace]],
      phone_number: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      gender: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      dob: ['' , [Validators.required]],
      Skills: this.fb.array([this.fb.control('' , [Validators.required, CustomValidator.cannotContainSpace])])
    })
    
  }

  /**
 * Fetches all data by making an HTTP GET request to the backend API using the specified ID.
 * Subscribes to the response and invokes the 'userValue' method with the received data.
 */
  getallData() {
    this.data.getDataById(this.id).subscribe((response) => {
      this.userValue(response);
    })
  }

  // ------Update the form with user-specific data received from the API------
  userValue(patchData) {
    this.formData.patchValue({
      f_name: patchData.f_name,
      l_name: patchData.l_name,
      email: patchData.email,
      phone_number: patchData.phone_number,
      gender: patchData.gender,
      Skills: patchData.Skills,
      dob: patchData.dob,
    })
    this.setSkills(patchData.Skills);
  }

  //getter method that returns the 'Skills' form array from the parent form (formData)
  get skills() {
    return this.formData.get('Skills') as FormArray
  }

  //setSkills method is used to initialize or update the 'Skills' form array based on an array of skills
  setSkills(skills: any[]) {
    const skillsArray = skills.map((skill) => this.fb.control(skill));
    this.formData.setControl('Skills', this.fb.array(skillsArray));
    console.log('skillsArray', skillsArray)
  }

  //addSkill method is called when you want to add a new skill to the 'Skills' form array.
  addSkill() {
    this.skills.push(this.fb.control('' , [Validators.required, CustomValidator.cannotContainSpace]));
  }

  //delete method is used to remove a skill from the 'Skills' form array at a specific index.
  delete(index: any) {
    this.skills.removeAt(index);
  }

 /**
 * Handles form submission, updating or creating customer data based on edit mode.
 * Notifies parent components of the update status.
 */
  submitForm() {
    if (this.formData.valid) {
      if (this.editClick) {
        this.data.updatebyId(this.id, this.formData.value).subscribe((response) => {
          alert('Changes updated successfully!');
          this.isUpdated = true;
          this.updateData.emit(this.isUpdated)
        })
      }
      if (!this.editClick) {
        this.createCustomer();
      }
    } else {
      { this.formData.markAllAsTouched(); }
    }
  }

  /**
 * Sends a request to create a new user using the data from the form.
 * Resets the form, updates relevant properties, and emits an event to notify the parent component of the update.
 */
  createCustomer() {
    this.data.createUser(this.formData.value).subscribe((res) => {
      this.formData.reset();
      this.userData='';
      this.isUpdated = true;
      this.updateData.emit(this.isUpdated);
      alert("User is Created");

    });
  }

  // Resets the form's 'touched' status, marking all form controls as 'untouched'.
  onClickClose(){
    this.formData.markAsUntouched();
  }

}























