import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormArray} from '@angular/forms';


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

  

  ngOnInit(){
    this.regform = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      date: [''],
      phone:[''],
      gender: [''],

      permanent_address: this.fb.group({
        streetaddress: [''],
        country: [''],
        city:[''],
        region: [''],
        postalcode: [''],
      }),

      communication_address: this.fb.group({
        streetaddress: [''],
        country: [''],
        city:[''],
        region: [''],
        postalcode: [''],
      }),
      skills:this.fb.array([
        this.fb.control('')
      ])
      })

     

  }

  onSubmit(){
    if(this.addressesAreSame){
      const permanent_address  = this.regform.get('permanent_address')?.value
      this.regform.get('communication_address')?.setValue(permanent_address)
    }

  }
  }

