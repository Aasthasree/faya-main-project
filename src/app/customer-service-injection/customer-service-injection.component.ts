import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../shared/services/data-service.service';



@Component({
  selector: 'app-customer-service-injection',
  templateUrl: './customer-service-injection.component.html',
  styleUrls: ['./customer-service-injection.component.scss']
})
export class CustomerServiceInjectionComponent implements OnInit {
  allData: any[];
  selectedData: any;
  datePipe: any;
  isEditModalVisible = false;
  editedData:any;

  constructor(private dataService: DataServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadData();
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      if (id) {
        this.loadSelectedData(id);
      }
    });
  }

  // private loadData() {
  //   this.dataService.getData().subscribe((data) => {
  //     this.allData = data;
  //   });
  // }

  private loadData() {
    this.dataService.getData().subscribe(
      (data) => {
        console.log(data);  // Log the retrieved data to the console
        this.allData = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  

  private loadSelectedData(id: number) {
    this.dataService.getDataById(id).subscribe((data) => {
      this.selectedData = data;
    });
  }

  openEditModal(data: any): void {
    this.selectedData = data;
    this.isEditModalVisible = true;
  }
  
  closeEditModal(): void {
    this.isEditModalVisible = false;
  }
  
  saveChanges(updatedData: any): void {
    // Implement logic to save the changes to your data source
    console.log('Updated Data:', updatedData);
  }


  



  

 
  

}
