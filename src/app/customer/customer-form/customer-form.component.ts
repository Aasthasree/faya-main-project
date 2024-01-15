import { Component, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//validator
import { CustomValidator } from '../../shared/custom-validators/custom.validator';
//service
import { CustomerService } from '../service/customer.service';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnChanges {
  @Input() id: number; 
  @Output() updateData = new EventEmitter<boolean>(); 

  formData: FormGroup;
  //property indicating whether the data has been updated
  isUpdated: boolean; 
  date = new Date();
  formattedDate = this.date.toISOString().slice(0, 10);
  
  constructor(
    private customerService: CustomerService, 
    private fb: FormBuilder
  ) {
    this.initCustomerForm();
  }
  
  ngOnChanges() {
    if (this.id) {
      this.getCustomer();
    } else {
      this.formData.reset();
      this.formData.markAsUntouched();
    }
  }
  
  private initCustomerForm() {
    this.formData = this.fb.group({
      f_name: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      l_name: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      email: ['' , [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), CustomValidator.cannotContainSpace]],
      phone_number: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      gender: ['' , [Validators.required, CustomValidator.cannotContainSpace]],
      dob: ['' , [Validators.required]],
      Skills: this.fb.array([this.fb.control('' , [Validators.required, CustomValidator.cannotContainSpace])])
    });
  }
  

  /**
 * Fetches all data by making an HTTP GET request to the backend API using the specified ID.
 */
  getCustomer() {
    this.customerService.getCustomer(this.id).subscribe((response) => {
      this.setCustomerFormData(response);
    });
  }

  // ------Update the form with user-specific data received from the API------
  setCustomerFormData(patchData) {
    this.formData.patchValue({
      f_name: patchData.f_name,
      l_name: patchData.l_name,
      email: patchData.email,
      phone_number: patchData.phone_number,
      gender: patchData.gender,
      Skills: patchData.Skills,
      dob: patchData.dob,
    });
    this.setSkills(patchData.Skills);
  }

  //getter method that returns the 'Skills' form array from the parent form (formData)
  get skills() {
    return this.formData.get('Skills') as FormArray;
  }

  //setSkills method is used to initialize or update the 'Skills' form array based on an array of skills
  setSkills(skills: string[]) {
    const skillsArray = skills.map((skill) => this.fb.control(skill));
    this.formData.setControl('Skills', this.fb.array(skillsArray));
    console.log('skillsArray', skillsArray);
  }

  //addSkill method is called when you want to add a new skill to the 'Skills' form array.
  onClickAddSkill() {
    this.skills.push(this.fb.control('' , [Validators.required, CustomValidator.cannotContainSpace]));
  }

  //delete method is used to remove a skill from the 'Skills' form array at a specific index.
  onClickDeleteSkill(index: number) {
    this.skills.removeAt(index);
  }

 /**
 * Handles form submission, updating or creating customer data based on edit mode.
 * Notifies parent components of the update status.
 */
  onClickSubmitForm() {
    if (this.formData.valid) {
      if (this.id) {
        this.customerService.updateCustomerById(this.id, this.formData.value).subscribe((response) => {
          alert('Customer information updated successfully!');
          this.isUpdated = true;
          this.updateData.emit(this.isUpdated);
        });
      }
      if (!this.id) {
        this.onClickCreateCustomer();
      }
    } else {
      { this.formData.markAllAsTouched(); }
    }
  }

  /**
 * Sends a request to create a new user using the data from the form.
 * Resets the form, updates relevant properties, and emits an event to notify the parent component of the update.
 */
  onClickCreateCustomer() {
    this.customerService.createCustomer(this.formData.value).subscribe((res) => {
      this.formData.reset();
      this.isUpdated = true;
      this.updateData.emit(this.isUpdated);
      alert('Customer has been created successfully!');

    });
  }


}
























