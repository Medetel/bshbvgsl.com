import { Component, OnInit } from '@angular/core';
//import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { UserService } from '../../../../../shared/user.service';
import { ErrorHandler } from '../../../../../shared/ErrorHandler';
import { Search } from '../../../../../shared/user.model';

@Component({
  selector: 'app-pay-monthly-grid',
  templateUrl: './pay-monthly-grid.component.html',
  styleUrls: ['./pay-monthly-grid.component.css']
})
export class PayMonthlyGridComponent implements OnInit {
  Paymonthfinalizedlist: any={};
  totalItems: any;
  isSearch: boolean;
  data: any;
 // userService: any;
  itemsPerPage: number = 5;
  currentPage: number = 5;
  pageNo: number = 1;
 s: Search;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
     this.s = new Search();
        this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllPaymonthfinalized(this.itemsPerPage,this.pageNo)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
    if
    (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
     
    this.GetAllPaymonthfinalized(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
   
   if (this.isSearch)
   this.onSearch(this.s, this.itemsPerPage, pageNumber);
   else 
    this.GetAllPaymonthfinalized(this.itemsPerPage, pageNumber);
  }


  GetAllPaymonthfinalized(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPaymonthfinalized(itemsPerPage,pageNo);
   
    this.data.subscribe(
         (response: any) => {  
        
          this.Paymonthfinalizedlist= response.Calendarmonth;    
          this.totalItems= response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          //this.currentPage = pageNo;       
                  console.log(this.Paymonthfinalizedlist)
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );    
  }


onSearch(s,itemsPerPage: number, pageNo: number) {     
    debugger
      this.isSearch = true;
    
      var searchText = this.s.SearchText;
      var searchCriteria = this.s.SearchCriteria;
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {       

        document.getElementById('loader-spinner').style.display = "block";
        this.userService.SearchPaymonthly(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
                        
              this.Paymonthfinalizedlist= data.Calendarmonth;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";          
                        
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }
    view(MonthCode){
      //alert(TIMEROLL_ID)
      console.log(MonthCode);
      this.router.navigate(['/home/payroll/payroll-compliance/pay-monthly/pay-view',MonthCode,'view']);
    }
}
