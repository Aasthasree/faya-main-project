//Angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//service
import { CustomerService } from 'src/app/customer/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  // customerDetail: Customer;

  constructor(
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) { }

  // ngOnInit(): void {
  //   // this.getCustomerById();
  // }

  // getCustomerById() {
  //   const userId = this.activeRoute.snapshot.paramMap.get('id');
  //   if (userId) {
  //     this.customerService.getCustomer(userId).subscribe(data => {
  //       this.customerDetail = data;
  //     }, error => {
  //       console.error('Error fetching customer data:', error);
  //       alert(error);
  //     });
  //   } else {
  //     this.router.navigate(['/admin/home']);
  //   }
  }


