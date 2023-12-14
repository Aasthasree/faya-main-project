import { Component } from '@angular/core';

@Component({
  selector: 'app-input-output-decorator',
  templateUrl: './input-output-decorator.component.html',
  styleUrls: ['./input-output-decorator.component.scss']
})
export class InputOutputDecoratorComponent {
  customers: any[] = [
    { name: 'JOHN Smith', address: '123 Main Street, Cityville, Country', dob: 'Wed Nov 12 1997 00:00:00 GMT+0530(India Standard Time)', course: 'mba', mark: '520', percentage: '', gender: 'Male', fees: '1899' },
    { name: 'Mark Vought', address: '456 Elm Street, Townsville, Country', dob: 'Tue Oct 06 1998 00:00:00 GMT+0530(India Standard Time)', course: 'B.tech', mark: '420', percentage: '', gender: 'Male', fees: '2899' },
    { name: 'Sarah King', address: '789 Oak Street, Villagetown, Country', dob: 'Sun Sep 22 1996 00:00:00 GMT+0530(India Standard Time)', course: 'B.tech', mark: '540', percentage: '', gender: 'Female', fees: '2899' },
    { name: 'Merry Jane', address: '101 Pine Street, Hamletville, Country', dob: 'Mon Jun 12 1995 00:00:00 GMT+0530(India Standard Time)', course: 'mba', mark: '380', percentage: '', gender: 'Female', fees: '1899' },
    { name: 'Steve Smith', address: '202 Maple Street, Countryside, Country', dob: 'Tue Dec 21 1999 00:00:00 GMT+0530(India Standard Time)', course: 'm.sc', mark: '430', percentage: '', gender: 'Male', fees: '799' },
    { name: 'Jonas Weber', address: '502 jeremy Street, Streetside, Country', dob: 'Wed Jun 18 1997 00:00:00 GMT+0530(India Standard Time)', course: 'm.sc', mark: '320', percentage: '', gender: 'Male', fees: '799' },

  ];
  //filterpipe
  filterText: string = 'All';


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
