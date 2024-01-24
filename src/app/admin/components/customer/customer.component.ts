import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/customer/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  customerData:any;


  constructor(private activeRoute: ActivatedRoute,private customerService: CustomerService){}

  ngOnInit(): void{
    this.getCustomerById();
  }

  getCustomerById(){
    this.activeRoute.paramMap.subscribe(params =>{
      const userId = params.get('id');
      if (userId) {
        this.customerService.getCustomer(userId).subscribe(data => {
          this.customerData = data;
          // console.log(this.userData)
        });
      }
    })

  }


  }
  

