//Angular core imports
import { Component, OnInit } from '@angular/core';
//Angular router imports
import { ActivatedRoute } from '@angular/router';
//modal
import { Customer } from 'src/app/customer/customer-model/customer.model';
//service
import { CustomerService } from 'src/app/customer/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customerData: Customer;

  constructor(
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById() {
    this.activeRoute.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.customerService.getCustomer(userId).subscribe(data => {
          this.customerData = data;
          // console.log(this.userData)
        });
      }
    });
  }

}


