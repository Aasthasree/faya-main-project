import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../shared/services/data-service.service';

@Component({
  selector: 'app-customer-service-injection',
  templateUrl: './customer-service-injection.component.html',
  styleUrls: ['./customer-service-injection.component.scss']
})
export class CustomerServiceInjectionComponent  {
  allData: any;
  selectedId: any;
  datePipe: any;
  isEditModalVisible = false;
  editedData:any;
  isCreateMode = false;
  
  constructor(private dataService: DataServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(){
    console.log('changes-hit')
  }

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
  

  openEditModal(isEdit:boolean,id?: any): void {
    // Assign the passed 'id' to the component's 'selectedId' property
   
      this.selectedId = id;
    
    // Set the 'isEditModalVisible' property to true, indicating that the edit modal should be displayed
    this.isEditModalVisible = isEdit;

  }

  openCreateModal(): void {
    this.selectedId = null;
    this.isEditModalVisible = true;
    this.isCreateMode = true; // Set to true for the create mode
  }
  
  closeEditModal(): void {
    this.isEditModalVisible = false;
  }
  

  deleteRow(data: any): void {
    // Implement logic to delete the data from your data source
    // For now, let's remove it from the local array
    const index = this.allData.indexOf(data);
    if (index !== -1) {
      this.allData.splice(index, 1);

      // Make an HTTP DELETE request to your backend API to delete the data from the database
      this.dataService.deleteData(data.id).subscribe(
        () => {
          // alert('Customer deleted successfully!');
          console.log('Data deleted successfully from the database.');
        },
        (error) => {
          console.error('Error deleting data from the database:', error);
          // If there is an error, you might want to add the data back to the array
          this.allData.splice(index, 0, data);
        }
      );
    }
  }

  // customer-service-injection.component.ts

  checkBooleanValue(check:boolean){
    if(check){
      this.loadData();
    }
  }

 

  


  
}
