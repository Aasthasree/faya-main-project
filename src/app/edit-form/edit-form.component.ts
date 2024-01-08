
import { Component, Input, Output , OnInit,EventEmitter, OnChanges } from '@angular/core';
import { DataServiceService } from '../shared/services/data-service.service';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {map} from 'rxjs'
import { CustomValidator } from '../shared/custom-validators/custom.validator';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnChanges {
  customer_data:FormGroup;
  isUpdated:boolean=false;
  isCreateMode: boolean = false; // New property to track create mode
  @Input() editClick:boolean;
  user_data:any='';
  @Input() id: any;
  @Output() updateData=new EventEmitter<any>();
  date = new Date();
  formattedDate = this.date.toISOString().slice(0, 10);
  constructor(private data:DataServiceService,private fb:FormBuilder){
  }
  ngOnChanges() {
    this.customerData();
    console.log("hit",this.editClick);
    
    
    if (this.editClick) {
      this.getallData();
    } 
  }


  customerData(){
    this.customer_data=this.fb.group({
      f_name:['',[Validators.required,CustomValidator.cannotContainSpace]],
      l_name:['',[Validators.required,CustomValidator.cannotContainSpace]],
      email:['',[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),CustomValidator.cannotContainSpace]],
      phone_number:['',[Validators.required,CustomValidator.cannotContainSpace]],
      gender:['',[Validators.required,CustomValidator.cannotContainSpace]],
      dob:['',[Validators.required]],
      Skills:this.fb.array([this.fb.control('',[Validators.required,CustomValidator.cannotContainSpace])])
    })
  }

  getallData() {
    this.data.getDataById(this.id).subscribe((response)=>{
      this.user_data=response;
      console.log(this.user_data)
      this.userValue();
    })
  }

  private userValue(){
    
    console.log(this.user_data);
    
    this.customer_data.patchValue({
      f_name:this.user_data.f_name,
      l_name:this.user_data.l_name,
      email:this.user_data.email,
      phone_number:this.user_data.phone_number,
      gender:this.user_data.gender,
      Skills:this.user_data.Skills,
      dob:this.user_data.dob,
    })
  this.setSkills(this.user_data.Skills);
  }

  get skills(){
    return this.customer_data.get('Skills') as FormArray
  }

  setSkills(skills:any[]){
  const skillsArray = skills.map((skill)=>this.fb.control(skill));
  this.customer_data.setControl('Skills',this.fb.array(skillsArray));
  console.log('skillsArray',skillsArray)
  }

  addSkill(){
    this.skills.push(this.fb.control('',[Validators.required,CustomValidator.cannotContainSpace]));
   }
 
   delete(index:any){
     this.skills.removeAt(index);
   }

onChanges(){
  if(this.customer_data.valid){
    if(this.editClick){
      this.updateChanges();
    this.data.updatebyId(this.id,this.user_data).subscribe((response)=>{
      console.log('customer updated successfully')
      alert('Changes updated successfully!');
      this.isUpdated=true;
      this.updateData.emit(this.isUpdated)
    })
    }
   if(!this.editClick){
      this.createCustomer();  
  } 
  }else{
    {this.customer_data.markAllAsTouched();}
  }
  
}

private updateChanges(){
  const formValue=this.customer_data.value;
    this.user_data.f_name=formValue.f_name;
    this.user_data.l_name=formValue.l_name;
    this.user_data.email=formValue.email;
    this.user_data.phone_number=formValue.phone_number;
    this.user_data.dob=formValue.dob;
    this.user_data.Skills=formValue.Skills;
    this.user_data.gender=formValue.gender;
}

// private resetForm() {
//   // Reset the form to initial state (null values)
//   this.customer_data.reset();
// }

createCustomer(){
  this.data.createUser(this.customer_data.value).subscribe((res) => {
    
    this.isUpdated = true;
    this.updateData.emit(this.isUpdated);
    this.customer_data.reset();
    alert("User is Created");

});
}


  // onClickApplyChanges() {
  //   // Trigger the applyChanges event with the updated data
  //   this.applyChanges.emit(this.id);
  // }
}
























