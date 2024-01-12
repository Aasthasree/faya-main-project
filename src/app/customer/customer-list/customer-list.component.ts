import { Component } from '@angular/core';
import { CustomerDataService } from '../service/customer-data.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class customerListComponent {
  allData: any;
  selectedId: any;
  datePipe: any;
  isEditModalVisible = false;
  isCreateMode = false;

  constructor(private dataService:CustomerDataService ) { }

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

  //-----provides a way to control the visibility of the edit modal----
  openEditModal(isEdit: boolean, id?: any): void {
    this.selectedId = id;
    this.isEditModalVisible = isEdit;
  }

  //----responsible for deleting a row of data-----
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

  //-----Triggers data loading if the specified condition is true---
  checkAndUpdateForm(check: boolean) {
    if (check) {
      this.loadData();
    }
  }
}
