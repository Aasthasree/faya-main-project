import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { DataServiceService } from '../shared/services/data-service.service';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs'
import { CustomValidator } from '../shared/custom-validators/custom.validator';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnChanges {
  customer_data: FormGroup; //property represents the Angular FormGroup that holds the form controls for user data
  isUpdated: boolean = false; //property indicating whether the data has been updated
  isCreateMode: boolean = false; // New property to track create mode
  @Input() editClick: boolean; //property that receives a boolean value indicating whether the edit mode is active.
  user_data: any = '';  //Holds the data of the user being edited.
  @Input() id: any;  //An input property representing the user ID.
  @Output() updateData = new EventEmitter<any>();  // EventEmitter used to notify the parent component about data updates.
  date = new Date();
  formattedDate = this.date.toISOString().slice(0, 10);

  constructor(private data: DataServiceService, private fb: FormBuilder) {
  }

  ngOnChanges() {
    this.customerData();
    // If in edit mode, fetch data for the specified ID
    if (this.editClick) {
      this.getallData();
    }
  }


  customerData() {
    this.customer_data = this.fb.group({
      f_name: ['', [Validators.required, CustomValidator.cannotContainSpace]],
      l_name: ['', [Validators.required, CustomValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), CustomValidator.cannotContainSpace]],
      phone_number: ['', [Validators.required, CustomValidator.cannotContainSpace]],
      gender: ['', [Validators.required, CustomValidator.cannotContainSpace]],
      dob: ['', [Validators.required]],
      Skills: this.fb.array([this.fb.control('', [Validators.required, CustomValidator.cannotContainSpace])])
    })
  }

  // -------Fetch user-specific data by ID and update the user_data property------
  getallData() {
    this.data.getDataById(this.id).subscribe((response) => {
      // this.user_data = response;
      this.userValue(response);
    })
  }

  // ------Update the form with user-specific data received from the API------
  userValue(patchData) {
    this.customer_data.patchValue({
      // Form controls are updated with corresponding user data
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

  //getter method that returns the 'Skills' form array from the parent form (customer_data)
  get skills() {
    return this.customer_data.get('Skills') as FormArray
  }
  //setSkills method is used to initialize or update the 'Skills' form array based on an array of skills
  setSkills(skills: any[]) {
    const skillsArray = skills.map((skill) => this.fb.control(skill));
    this.customer_data.setControl('Skills', this.fb.array(skillsArray));
    console.log('skillsArray', skillsArray)
  }
  //addSkill method is called when you want to add a new skill to the 'Skills' form array.
  addSkill() {
    this.skills.push(this.fb.control('', [Validators.required, CustomValidator.cannotContainSpace]));
  }
  //delete method is used to remove a skill from the 'Skills' form array at a specific index.
  delete(index: any) {
    this.skills.removeAt(index);
  }
  //-------responsible for handling changes in the form and deciding whether to update an existing customer's information or create a new customer based on the form's validity--
  onChanges() {
    if (this.customer_data.valid) {
      // If in edit mode
      if (this.editClick) {
  

        // Make a request to update the customer data by ID
        this.data.updatebyId(this.id, this.customer_data.value).subscribe((response) => {
          alert('Changes updated successfully!');
          //allows the parent component or any component listening to this event to be notified of the update status.
          this.isUpdated = true;
          this.updateData.emit(this.isUpdated)
        })
      }
      // If in create mode
      if (!this.editClick) {
        // Create a new customer
        this.createCustomer();
      }
    } else {
      // If the form is not valid, mark all fields as touched to trigger validation messages
      { this.customer_data.markAllAsTouched(); }
    }
  }

  createCustomer() {
    // Sending a request to create a new user using the data from the form
    this.data.createUser(this.customer_data.value).subscribe((res) => {
      console.log(this.customer_data);
      this.customer_data.reset();
      console.log(this.customer_data);
      
      this.user_data='';
      this.isUpdated = true;
      this.updateData.emit(this.isUpdated);
      alert("User is Created");

    });
  }
}
























