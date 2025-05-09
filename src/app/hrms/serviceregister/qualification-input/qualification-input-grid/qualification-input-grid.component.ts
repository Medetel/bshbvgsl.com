import { Component, OnInit } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-qualification-input-grid',
  templateUrl: './qualification-input-grid.component.html',
  styleUrls: ['./qualification-input-grid.component.css']
})
export class QualificationInputGridComponent implements OnInit {

  title = "Update Employee Qualification";

  // itemsPerPage: number = 5;
  // currentPage: number = 1;
  // filemovementlist: any = [];
  // data: any = [];
  // totalItems: number;
  // s: Search;
  // isSearch: boolean;
  // EmployeeQualificationDetails: any = [];


  // constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
  //   this.s = new Search();
  //   this.isSearch = false;
  // }

  // ngOnInit() {
  //   this.GetEmployeeQualificationDetails(this.itemsPerPage, this.currentPage)
  // }

  // itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
  //   if (this.isSearch)
  //     this.onSearch(this.s, itemsPerPage, pageNo);
  //   else
  //     this.GetEmployeeQualificationDetails(itemsPerPage, pageNo);
  // }

  // pageChanged(pageNumber: number) {
  //   if (this.isSearch)
  //     this.onSearch(this.s, this.itemsPerPage, pageNumber);
  //   else
  //     this.GetEmployeeQualificationDetails(this.itemsPerPage, pageNumber);
  // }


  // GetEmployeeQualificationDetails(itemsPerPage: number, pageNo: number) {
  //   this.isSearch = false;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetAllEmployeeQualifications(itemsPerPage, pageNo);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.EmployeeQualificationDetails = response.EmplQualification;
  //       this.totalItems = response.TotalItemsCount;
  //       this.itemsPerPage = itemsPerPage;
  //       this.currentPage = pageNo;

  //       document.getElementById('loader-spinner').style.display = "none";
  //     },
  //     (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }
  //   );
  // }


  // delete(EmployeeId) {
  //   debugger;
  //   swal({
  //     title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.data = this.userService.DeleteEmployeeQualificationsDetails(EmployeeId);
  //       this.data.subscribe(
  //         (response: any) => {
  //           this.GetEmployeeQualificationDetails(this.itemsPerPage, this.currentPage);
  //         },
  //       );
  //     }
  //   })
  // }


  // onSearch(s, itemsPerPage: number, pageNo: number) {
  //   this.isSearch = true;
  //   var searchText = this.s.SearchText;
  //   var searchCriteria = this.s.SearchCriteria;
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {

  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.GetEmployeeQualificationDetailsOnSearch(itemsPerPage, pageNo, searchCriteria, searchText)
  //       //ItemsPerPage, pageno, searchBy, searchValue
  //       .subscribe(
  //         (data: any) => {
  //           this.EmployeeQualificationDetails = data.EmplQualification;
  //           this.totalItems = data.TotalItemsCount;
  //           this.itemsPerPage = itemsPerPage;
  //           this.currentPage = pageNo;
  //           document.getElementById('loader-spinner').style.display = "none";

  //         }, (error: any) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //           this.errorHandler.HandlerError(error);
  //         });
  //   }
  // }


  itemsPerPage: number=5;
  currentPage: number=1;  
  data : any = [];
  totalItems : number;
  s: Search;
  isSearch:boolean;
  BasicEmployeeDetails : any = [];

  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.GetEmployeeBasicDetails(this.itemsPerPage,this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) { 
    if (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
    this.GetEmployeeBasicDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
      else 
    this.GetEmployeeBasicDetails(this.itemsPerPage, pageNumber);
  }


  GetEmployeeBasicDetails(itemsPerPage: number, pageNo: number){
    this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeBasics(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {
          this.BasicEmployeeDetails= response.HRMSEmpDetails;    
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


  


    onSearch(s,itemsPerPage: number, pageNo: number) {     
      this.isSearch = true;    
      var searchText = this.s.SearchText;
      var searchCriteria = this.s.SearchCriteria;
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {      

        document.getElementById('loader-spinner').style.display = "block";
        this.userService.GetEmployeeDetailsOnSearch(itemsPerPage,pageNo,searchCriteria,searchText)
        //ItemsPerPage, pageno, searchBy, searchValue
          .subscribe(
            (data:any) => {            
                this.BasicEmployeeDetails= data.HRMSEmpDetails;    
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


    gotoAdd(EmployeeId){      
      localStorage.setItem('EmployeeId',EmployeeId);  
      this.router.navigate(['/home/serviceregister/qualification-form']);
    }

  


}
