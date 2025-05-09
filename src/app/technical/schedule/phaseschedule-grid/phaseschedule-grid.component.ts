import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-phaseschedule-grid',
  templateUrl: './phaseschedule-grid.component.html',
  styleUrls: ['./phaseschedule-grid.component.css']
})
export class PhasescheduleGridComponent implements OnInit {
  itemsPerPage: number=5;
  currentPage: number=1;
  Schedulelist : any = [];
  data : any;
  totalItems : number;
  s: Search;
  PhaseSchedule_id : number;
  isSearch:boolean;
   mode : string;  
   title="Phase Schedule";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllSchedule(this.itemsPerPage,this.currentPage)
  }
  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
    if
    (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
     
    this.GetAllSchedule(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
   
   if (this.isSearch)
   this.onSearch(this.s, this.itemsPerPage, pageNumber);
   else 
    this.GetAllSchedule(this.itemsPerPage, pageNumber);
  }

  GetAllSchedule(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllSchedule(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {          
          this.Schedulelist= response.PhaseScheduleModel;    
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
        this.userService.SearchSchedule(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
                        
              this.Schedulelist= data.PhaseScheduleModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";          
                        
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }
    delete(PhaseSchedule_id){    
      swal({
           title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
          this.data = this.userService.DeleteSchedule(PhaseSchedule_id);
          this.data.subscribe(
           (response: any) => {
               this.GetAllSchedule(this.itemsPerPage,this.currentPage);          
           },       
        ); 
      } 
      })
      }
}
