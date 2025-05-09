import { Component, OnInit } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-daily-attendance-grid',
  templateUrl: './daily-attendance-grid.component.html',
  styleUrls: ['./daily-attendance-grid.component.css']
})
export class DailyAttendanceGridComponent implements OnInit {

  title ="Daily Attendance (In)";

  itemsPerPage: number=5;
  currentPage: number=1;  
  data : any = [];
  totalItems : number;
  s: Search;
  isSearch:boolean;
  EmployeeAttendanceDetails : any = [];

  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.GetEmployeeAttendanceDetails(this.itemsPerPage,this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) { 
    if (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
    this.GetEmployeeAttendanceDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
      else 
    this.GetEmployeeAttendanceDetails(this.itemsPerPage, pageNumber);
  }


  GetEmployeeAttendanceDetails(itemsPerPage: number, pageNo: number){   
    this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAttendace(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {
          this.EmployeeAttendanceDetails= response.HRMSEmpAttendance;    
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
      this.userService.GetEmployeeAttendanceDetailsOnSearch(itemsPerPage,pageNo,searchCriteria,searchText)
      //ItemsPerPage, pageno, searchBy, searchValue
        .subscribe(
          (data:any) => {            
              this.EmployeeAttendanceDetails= data.HRMSEmpAttendance;    
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

   

  Delete(ATTN_ENTRY_NO){
    debugger;
    swal({
         title: 'Are you sure?', text: "You want to delete! with Id : "+ATTN_ENTRY_NO, type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {        
        if (result.value) {
        this.data = this.userService.DeleteEmployeeAttendanceDetails(ATTN_ENTRY_NO);
        this.data.subscribe(
         (response: any) => {
           if(response == false){
            swal("Warning!", "Can't delete this Attendance.", "warning");
           }
             this.GetEmployeeAttendanceDetails(this.itemsPerPage,this.currentPage);          
         },       
      ); 
      
    } 
    })
    }

  

 


}
