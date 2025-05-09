import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medical-reimbursment-records-grid',
  templateUrl: './medical-reimbursment-records-grid.component.html',
  styleUrls: ['./medical-reimbursment-records-grid.component.css']
})
export class MedicalReimbursmentRecordsGridComponent implements OnInit {

  
  title ="Medical Reimburesment";

  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  Medicallist:any={};
  Districtlist:any=[];
m: any={};
MEDI_CLAIM_ID:number;
DI_Id:number;
  data: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {    
this.GetallData();
    //this.GetAllMedicalDetails(this.itemsPerPage, 1);
    this.m.DivisionId = +localStorage.getItem('divisonId');
   this.GetAllMedicalRecDetails(this.m.DivisionId,this.itemsPerPage, 1);  
  }
  
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllMedicalRecDetails(this.DI_Id,this.itemsPerPage, 1);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllMedicalRecDetails(this.DI_Id,this.itemsPerPage, 1);
  }


  GetallData(){
  
    this.data = this.userService.GetAllDistrictMedical();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
      })  
   }

   GetAllMedicalRecDetails(DI_Id,itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllMedicalDetailsRECS(DI_Id,itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Medicallist = data.MedicalRemModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 

  //  GetAllMedicalRecDetails(DI_Id) {
  //   this.isSearch = false;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.userService.GetAllMedicalRecDetails(DI_Id)
  //     .subscribe(
  //       (data: any) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         this.Medicallist = data.Result; 
  //         console.log("result");
  //         console.log( this.data); 
  //         console.log(data.ComplaintRegisterAuthModel);      
  //       }, (error) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         this.errorHandler.handleError(error);
  //       });
  // }
 
 


  onSearch(s, itemsPerPage: number, pageNo: number) {
    
    this.isSearch = true;
    let searchText = this.s.SearchText.replace(/\s/g, "");
    let searchCriteria = this.s.SearchCriteria.replace(/\s/g, "");
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchMedical(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Medicallist = data.MedicalRemModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }
}