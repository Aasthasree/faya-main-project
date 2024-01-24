import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer-model/customer.model';
import { CustomerService } from 'src/app/customer/service/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  customerList: Customer[]=[];
  selectedId: number;
  customerFormVisible: boolean;
userId: any|string;
  

  constructor(
    private customerService:CustomerService ,private router: Router  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }


  // //------To fetch data from customerService------
  private getCustomers() {
    this.customerService.getCustomers().subscribe(
      (data) => {
        this.customerList = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


}

