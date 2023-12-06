import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  //Define an input property to receive data from the parent component
  @Input() selectedCustomer: { name: string, address: string, city: string, state: string, country: string };
  // @Output decorator to create an event emitter for communicating changes to the parent component
  @Output() updateCustomer = new EventEmitter<{ name: string, address: string, city: string, state: string, country: string }>();

  // Variables to store customer details locally in the child component,used for two-way binding in the child component's template.
  name: any = '';
  address: any = '';
  city: any = '';
  country: any = '';
  state: any = '';

// Update local variables with the values from the selected customer when input changes.
  ngOnChanges() {
    this.name = this.selectedCustomer.name;
    this.address = this.selectedCustomer.address;
    this.city = this.selectedCustomer.city;
    this.state = this.selectedCustomer.state;
    this.country = this.selectedCustomer.country;
  }

// Update the properties of the selected customer with the values from local variables.
  onUpdateValue() {
    this.selectedCustomer.name = this.name;
    this.selectedCustomer.address = this.address;
    this.selectedCustomer.city = this.city;
    this.selectedCustomer.country = this.country;
    this.selectedCustomer.state = this.state;
  }
  
// Trigger the update of the selected customer and emit the changes to the parent component.
  onClickUpdate() {
    this.onUpdateValue();
    this.updateCustomer.emit(this.selectedCustomer);
  }
}
