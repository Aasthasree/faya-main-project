//Angular core imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//RXJS imports
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  // //------To fetch data from customerService------
  private getCustomers() {
    this.customerService.getCustomers()
      .pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return of([]);
        })
      )
      .subscribe(data => {
        this.customerList = data;
      });
  }

  onClickNavigate(id) {
    const url = this.router.url;
    this.router.navigate([url, id]);
  }

}