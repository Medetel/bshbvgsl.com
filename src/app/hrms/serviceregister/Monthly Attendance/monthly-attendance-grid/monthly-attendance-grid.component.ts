import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-monthly-attendance-grid',
  templateUrl: './monthly-attendance-grid.component.html',
  styleUrls: ['./monthly-attendance-grid.component.css']
})
export class MonthlyAttendanceGridComponent implements OnInit {
  title ="View Monthly Attendance"
  data : any = {};
  formInvalid : boolean = false;
  c : any = {};
  r: any ={};
  monthlyList: any ={};
  mode: any;
  hld_id : any;
  YearList : any 
  TempTableList=[];
  Temp1:any={};
  isSearch: boolean;
 // userService: any;
 totalItems: any;
  itemsPerPage: number = 50;
  currentPage: number = 5;
  pageNo: number = 1;
  s: Search;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
            this.isSearch = false;
  }

  ngOnInit() {
   
      
    this.getAllmonthlyist(this.itemsPerPage,this.pageNo);
  }
  getAllmonthlyist(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllmonthlyist(itemsPerPage,pageNo);
   
    this.data.subscribe(
         (response: any) => {  
        
          this.monthlyList= response.HRMSEmpAttendance;    
          this.totalItems= response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          //this.currentPage = pageNo;       
                  // console.log(this.Paymonthfinalizedlist)
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
        this.userService.Searchmonthlylist(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
                        
              this.monthlyList= data.MonattendanceModels;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";          
                        
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }
  view(MA_ID){
    //alert(TIMEROLL_ID)
    this.router.navigate(['/home/monthlyattendance/monthlyattendance-form',MA_ID,'view']);
  }
}
