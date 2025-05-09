import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../shared/user.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import {UserService} from '../../../../shared/user.service';
@Component({
  selector: 'app-leave-type-grid',
  templateUrl: './leave-type-grid.component.html',
  styleUrls: ['./leave-type-grid.component.css']
})
export class LeaveTypeGridComponent implements OnInit {
  title ="Leave Applications"
  itemsPerPage: number=5;
  currentPage: number=1;  
  data : any = [];
  totalItems : number;
  s: Search;
  isSearch:boolean;
  EmployeeLeaveDetails : any = [];

  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.GetEmployeeLeaveDetails(this.itemsPerPage,this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) { 
    if (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
    this.GetEmployeeLeaveDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
      else 
    this.GetEmployeeLeaveDetails(this.itemsPerPage, pageNumber);
  }


  GetEmployeeLeaveDetails(itemsPerPage: number, pageNo: number){
    this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeLeaveAppDetails(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {
          this.EmployeeLeaveDetails= response.EmployeeLeaveApllicationModels;           
          console.log('list');
          console.log( this.EmployeeLeaveDetails);          
          this.totalItems= response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;       
                   
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );      
  }


  delete(LEAVE_APPL_ID){    
    debugger;
    swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {        
        if (result.value) {
        this.data = this.userService.DeleteLeaveApp(LEAVE_APPL_ID);
        this.data.subscribe(
         (response: any) => {
             this.GetEmployeeLeaveDetails(this.itemsPerPage,this.currentPage);          
         },       
      );   
      
    } 
    })
    }


    onSearch(s,itemsPerPage: number, pageNo: number) {     
      this.isSearch = true;    
      var searchText = this.s.SearchText;
      var searchCriteria = this.s.SearchCriteria;
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {      

        document.getElementById('loader-spinner').style.display = "block";
        this.userService.GetEmployeeLeaveAppOnSearch(itemsPerPage,pageNo,searchCriteria,searchText)        
          .subscribe(
            (data:any) => {            
              this.EmployeeLeaveDetails= data.EmployeeLeaveApllicationModels;    
              this.totalItems= data.TotalItemsCount;
              this.itemsPerPage = itemsPerPage;
              this.currentPage = pageNo;             
              document.getElementById('loader-spinner').style.display = "none";             
              
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
          });
      }
    }


}
