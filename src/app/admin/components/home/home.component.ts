import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
  showParentComponent: boolean = true;
  

  constructor(
    private customerService:CustomerService ,private router: Router,
    private activatedRoute:ActivatedRoute  ) {
      // this.router.events.pipe(
      //   filter(event => event instanceof NavigationEnd)
      // ).subscribe(() => {
      //   // Check if the current route has an 'id' parameter (child route)
      //   const hasIdParameter = this.activatedRoute.snapshot.firstChild?.paramMap.has('id');
      //   // Set the flag based on whether there's an 'id' parameter
      //   this.showParentComponent = !hasIdParameter;
      //   console.log(hasIdParameter,this.showParentComponent)
      // });
     }

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

  onClickNavigate(id){
    const url = this.router.url;
    this.router.navigate([url,id]);
  }


}

