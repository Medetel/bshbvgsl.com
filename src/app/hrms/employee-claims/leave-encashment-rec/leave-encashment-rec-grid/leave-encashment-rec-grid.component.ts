import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Search } from '../../../../shared/user.model';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-leave-encashment-rec-grid',
  templateUrl: './leave-encashment-rec-grid.component.html',
  styleUrls: ['./leave-encashment-rec-grid.component.css']
})
export class LeaveEncashmentRecGridComponent implements OnInit {

    
  title ="View Medical Reimburesment"

  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  LeaveElist:any={};
  Districtlist:any=[];
h: any={};
LVCONS_ID:number;
DI_Id:number;
  data: any;
  hidden: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {    
this.GetallData();
    //this.GetAllMedicalDetails(this.itemsPerPage, 1);
    this.h.DivisionId = +localStorage.getItem('divisonId');
   this.GetAllLeaveRECDetials(this.h.DivisionId,this.itemsPerPage,1);  
  }
  
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllLeaveRECDetials(this.DI_Id,this.itemsPerPage,1);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllLeaveRECDetials(this.DI_Id,this.itemsPerPage,1);
  }


  GetallData(){
  
    this.data = this.userService.GetAllDistrictMedical();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
      })  
   }
   GetAllLeaveRECDetials(DI_Id,itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllLeaveDetailsRECS(DI_Id,itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.LeaveElist = data.LeaveEModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  
 
  //  GetAllLeaveRECDetials(DI_Id) {
  //   this.isSearch = false;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.userService.GetAllLeaveRECDetials(DI_Id)
  //     .subscribe(
  //       (data: any) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         this.LeaveElist = data.Result; 
  //         console.log("result");
  //         console.log( this.data); 
  //         console.log( this.LeaveElist);      
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
      this.userService.SearchLeaves(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.LeaveElist = data.LeaveEModel;
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


