//component
import { Component, OnInit } from '@angular/core';
//service
import { CustomerService } from '../service/customer.service';
//model
import { CustomerData } from '../customer.model';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customerList: CustomerData[]=[];
  selectedId: number;
  isEditModalVisible : boolean;

  constructor(
    private customerService:CustomerService
     ) { }

  ngOnInit(): void {
    this.loadData();
  }

  //------To fetch data from customerService------
  private loadData() {
    this.customerService.getData().subscribe(
      (data) => {
        console.log(data);
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
  openEditModal(isEdit: boolean, id?: any): void {
    this.selectedId = id;
    this.isEditModalVisible = isEdit;
  }

  /**
 * Handles the click event to delete a row.
 * @param data - The data associated with the row to be deleted.
 */
  onClickDeleteRow(data: any): void {
    const index = this.customerList.indexOf(data);
    if (index !== -1) {
      this.customerList.splice(index, 1);
      this.customerService.deleteData(data.id).subscribe(
        () => {
          alert('Customer deleted successfully!');
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
  checkAndUpdateForm(check: boolean) {
    if (check) {
      this.loadData();
    }
  }
}
