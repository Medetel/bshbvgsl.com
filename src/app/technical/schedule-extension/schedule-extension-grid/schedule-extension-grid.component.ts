import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-schedule-extension-grid',
  templateUrl: './schedule-extension-grid.component.html',
  styleUrls: ['./schedule-extension-grid.component.css']
})
export class ScheduleExtensionGridComponent implements OnInit {
  itemsPerPage: number=5;
  currentPage: number=1;
  ScheduleExtensionlist : any = [];
  data : any;
  totalItems : number;
  s: Search;
  ContScheduleExt_id : number;
  isSearch:boolean;
   mode : string;
  title="Contractor Schedule Extension";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllScheduleExtension(this.itemsPerPage,this.currentPage);
  }
  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
    if
    (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
     
    this.GetAllScheduleExtension(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
   
   if (this.isSearch)
   this.onSearch(this.s, this.itemsPerPage, pageNumber);
   else 
    this.GetAllScheduleExtension(this.itemsPerPage, pageNumber);
  }

  GetAllScheduleExtension(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllScheduleExtension(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {          
          this.ScheduleExtensionlist= response.ContScheduleExtensionModel;    
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
        this.userService.SearchScheduleExtension(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
                        
              this.ScheduleExtensionlist= data.ContScheduleExtensionModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";          
                        
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }
    delete(ContScheduleExt_id){    
      swal({
           title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
          this.data = this.userService.DeleteScheduleExtension(ContScheduleExt_id);
          this.data.subscribe(
           (response: any) => {
               this.GetAllScheduleExtension(this.itemsPerPage,this.currentPage);          
           },       
        ); 
      } 
      })
      }
}
