import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../shared/services/data-service.service';

@Component({
  selector: 'app-customer-service-injection',
  templateUrl: './customer-service-injection.component.html',
  styleUrls: ['./customer-service-injection.component.scss']
})
export class CustomerServiceInjectionComponent {
  allData: any;
  selectedId: any;
  datePipe: any;
  isEditModalVisible = false;
  editedData: any;
  isCreateMode = false;

  constructor(private dataService: DataServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  //------To fetch data from dataservice------
  private loadData() {
    // Using the dataService to fetch data
    this.dataService.getData().subscribe(
      (data) => {
        // Log the retrieved data to the console for debugging or informational purposes
        console.log(data);
        this.allData = data;
      },
      // Callback function for handling errors during data retrieval
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  //-----provides a way to control the visibility of the edit modal----
  openEditModal(isEdit: boolean, id?: any): void {
    // Assign the passed 'id' to the component's 'selectedId' property
    this.selectedId = id;
    // Set the 'isEditModalVisible' property to true, indicating that the edit modal should be displayed
    this.isEditModalVisible = isEdit;
  }

  //----responsible for deleting a row of data-----
  deleteRow(data: any): void {
    //remove it from the local array
    const index = this.allData.indexOf(data);
    if (index !== -1) {
      this.allData.splice(index, 1);
      // Make an HTTP DELETE request to your backend API to delete the data from the database
      this.dataService.deleteData(data.id).subscribe(
        () => {
          // If the HTTP DELETE request is successful
          alert('Customer deleted successfully!');
        },
        (error) => {
          // If there is an error during the HTTP DELETE request
          console.error('Error deleting data from the database:', error);
          // If there is an error, you might want to add the data back to the array
          this.allData.splice(index, 0, data);
        }
      );
    }
  }

  //-----Triggers data loading if the specified condition is true---
  checkBooleanValue(check: boolean) {
    if (check) {
      this.loadData();
    }
  }
}
