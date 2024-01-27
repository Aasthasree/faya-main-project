//Angular core imports
import { Component, OnInit } from '@angular/core';
//service
import { CustomerService } from '../service/customer.service';
//model
import { Customer } from '../customer-model/customer.model';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[]=[];
  selectedId: number;
  customerFormVisible: boolean;

  constructor(
    private customerService:CustomerService
     ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  //------To fetch data from customerService------
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

  /**
 * Toggles the visibility of the edit modal and updates the selected ID for editing.
 * @param isEdit - Indicates whether the modal is in edit mode.
 * @param id - (Optional) The identifier associated with the item being edited.
 */
  onClickShowCustomerForm(id?: number): void {
    this.selectedId = id || null;
    this.customerFormVisible = true;
  }

  /**
 * Handles the click event to delete a row.
 * @param data - The data associated with the row to be deleted.
 */
  onClickDeleteCustomer(data: Customer): void {
    const index = this.customerList.indexOf(data);
    if (index !== -1) {
      this.customerList.splice(index, 1);
      this.customerService.deleteCustomer(data.id).subscribe(
        () => {
          alert('Customer has been deleted successfully!');
        },
        (error) => {
          console.error('Error deleting data from the database:', error);
          this.customerList.splice(index, 0, data);
        }
      );
    }
  }

 /**
 * Conditionally triggers form update by loading data if the check is true.
 * @param check - A boolean flag determining whether to update the form.
 */
 updateCustomerListOnFormChange(check: boolean) {
    if (check) {
      this.getCustomers();
    }
  }
}
