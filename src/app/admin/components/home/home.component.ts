//Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//model
import { Customer } from 'src/app/customer/customer-model/customer.model';
//service
import { CustomerService } from 'src/app/customer/service/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customerList: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  private getCustomers() {
    this.customerService.getCustomers().subscribe(
      data => {
        this.customerList = data;
      },
      error => {
        console.error('Error fetching data:', error);
        alert(error);
      }
    );
  }

  onClickNavigate(id) {
    const url = this.router.url;
    this.router.navigate([url, id]);
  }

}