//Angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  customerDetail: Customer;

  constructor(
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById() {
    this.activeRoute.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.customerService.getCustomer(userId).subscribe(
          data => {
            if (data) {
              this.customerDetail = data;
            } else {
              this.router.navigate(['/admin/home']);
            }
          },
          error => {
            console.error('Error fetching customer data:', error);
          }
        );
      }
    });
  }

}