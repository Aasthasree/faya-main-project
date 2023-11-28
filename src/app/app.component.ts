import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormArray,FormControl,Validators} from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'main-project';
  regform: FormGroup; 
  addressesAreSame:boolean=false

  

  constructor(private fb: FormBuilder){}

  get skillControls(){
    return (<FormArray>this.regform.get('skills')).controls;
  }

  

  ngOnInit(){
    this.regform = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      date: ['',Validators.required],
      phone:['',Validators.required],
      gender: ['',Validators.required],

      permanent_address: this.fb.group({
        Street: ['',Validators.required],
        Country: ['',Validators.required],
        City:['',Validators.required],
        Region: ['',Validators.required],
        Postal_code: ['',Validators.required],
      }),

     

      communication_address: this.fb.group({
        Street: ['',Validators.required],
        Country1: ['',Validators.required],
        City:['',Validators.required],
        Region: ['',Validators.required],
        Postal_code: ['',Validators.required],
      }),

      skills:this.fb.array(
        [
          this.fb.control('')
        ]
      )
    


      })

     

  }

  onSubmit(){
    const formdata={
      First_name:this.regform.value.firstname,
      Last_name:this.regform.value.lastname,
      Email:this.regform.value.email,
      DOB:this.regform.value.date,
      Ph_num:this.regform.value.phone,
      Gender:this.regform.value.gender,
      permanent_address:this.regform.value.permanent_address,
      communication_address: this.addressesAreSame? this.regform.value.permanent_address:this.regform.value.communication_address
      
    }
    console.log(formdata)
  }

 

  get skills()
  {
      return this.regform.get('skills') as FormArray
  }
  addSKill()
  {
      this.skills.push( this.fb.control(''))
      
  }
  delete(index:number)
  {
      this.skills.removeAt(index);
  }

  

  
 
 

  


  }

