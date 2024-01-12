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
export class customerListComponent implements OnInit {
  allData: CustomerData[];
  selectedId: number;
  isEditModalVisible : boolean;

  constructor(
    private dataService:CustomerService
     ) { }

  ngOnInit(): void {
    this.loadData();
  }

  //------To fetch data from dataservice------
  private loadData() {
    this.dataService.getData().subscribe(
      (data) => {
        console.log(data);
        this.allData = data;
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
    const index = this.allData.indexOf(data);
    if (index !== -1) {
      this.allData.splice(index, 1);
      this.dataService.deleteData(data.id).subscribe(
        () => {
          alert('Customer deleted successfully!');
        },
        (error) => {
          console.error('Error deleting data from the database:', error);
          this.allData.splice(index, 0, data);
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
