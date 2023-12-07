import { Component } from '@angular/core';

@Component({
  selector: 'app-input-output-decorator',
  templateUrl: './input-output-decorator.component.html',
  styleUrls: ['./input-output-decorator.component.scss']
})
export class InputOutputDecoratorComponent {
  customers: any [] = [
    { name: 'Rahul Dravid', address: '', city: 'Bangalore', state: 'Karnataka', country: 'India' },
    { name: 'Sachin Tendulkar', address: '', city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    { name: 'Sourav Ganguly', address: '', city: 'Kolkata', state: 'West Bengal', country: 'India' },
    { name: 'Mahendra Singh Dhoni', address: '', city: 'Ranchi', state: 'Bihar', country: 'India' },
    { name: 'Virat Kohli', address: '', city: 'Delhi', state: 'Delhi', country: 'India' },
  ];
  //a property that represents customer that is currently selected
  selectedCustomer: any;

  onEdit(people: any) {
    // Set the selected customer for editing
    this.selectedCustomer = people;
  }

  updateCustomerInParent(updatedCustomer:any) {
    // Find the index of the selected customer and update the array
    const index = this.customers.findIndex(customer => customer.name === this.selectedCustomer.name);
    if (index !== -1) {
      this.customers[index] = updatedCustomer;
    }
  }
}
