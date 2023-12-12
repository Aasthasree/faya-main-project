import { Component } from '@angular/core';

@Component({
  selector: 'app-input-output-decorator',
  templateUrl: './input-output-decorator.component.html',
  styleUrls: ['./input-output-decorator.component.scss']
})
export class InputOutputDecoratorComponent {
  customers: any [] = [
    { name: 'John Smith', address: '',dob:'Wed Nov 12 1997 00:00:00 GMT+0530(India Standard Time)',course:'mba',mark:'520',percentage:'0.86666666666666666667',gender:'Male',fees:'1899'},
    { name: 'Mark Vought', address: '',dob:'Tue Oct 06 1998 00:00:00 GMT+0530(India Standard Time)',course:'B.tech',mark:'420',percentage:'0.7' ,gender:'Male',fees:'2899'},
    { name: 'Sarah King', address: '',dob:'Sun Sep 22 1996 00:00:00 GMT+0530(India Standard Time)',course:'B.tech',mark:'540',percentage:'0.9',gender:'Female',fees:'2899' },
    { name: 'Merry Jane', address: '',dob:'Mon Jun 12 1995 00:00:00 GMT+0530(India Standard Time)',course:'mba',mark:'380' ,percentage:'0.633333333333333',gender:'Female',fees:'1899'},
    { name: 'Steve Smith', address: '',dob:'Tue Dec 21 1999 00:00:00 GMT+0530(India Standard Time)',course:'m.sc',mark:'430',percentage:'0.71666666666',gender:'Male',fees:'799'},
    { name: 'Jonas Weber', address: '',dob:'Wed Jun 18 1997 00:00:00 GMT+0530(India Standard Time)',course:'m.sc',mark:'320',percentage:'0.533333333333',gender:'Male',fees:'799'},
    
  ];

 
  // //a property that represents customer that is currently selected
  // selectedCustomer: any;

  // onEdit(people: any) {
  //   // Set the selected customer for editing
  //   this.selectedCustomer = people;
  // }

  // updateCustomerInParent(updatedCustomer:any) {
  //   // Find the index of the selected customer and update the array
  //   const index = this.customers.findIndex(customer => customer.name === this.selectedCustomer.name);
  //   if (index !== -1) {
  //     this.customers[index] = updatedCustomer;
  //   }
  // }
}
