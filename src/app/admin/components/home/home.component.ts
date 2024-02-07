//Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Model
import { CustomerResponse } from 'src/app/admin/customer-model/customer.model';
//Service
import { CustomerService } from 'src/app/admin/service/customer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customers: CustomerResponse;


  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  private getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        if (response) {
          this.customers = response;
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        alert(error);
      }
    });
  }

  onClickNavigate(id: string) {
    const url = this.router.url;
    this.router.navigate([url, id]);
  }

}