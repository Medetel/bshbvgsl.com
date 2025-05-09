import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-jobgroup-view',
  templateUrl: './jobgroup-view.component.html',
  styleUrls: ['./jobgroup-view.component.css']
})
export class JobgroupViewComponent implements OnInit {
  itemsPerPage: number=5;
  currentPage: number=1;
  Jobgrouplist : any = [];
  data : any;
  totalItems : number;
  s: Search;
  jobgroup_id : number;
  isSearch:boolean;
   mode : string;  
   title="Jobgroup Form";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.GetAllJobgroup(this.itemsPerPage,this.currentPage)
  }
  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
    if
    (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
     
    this.GetAllJobgroup(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
   
   if (this.isSearch)
   this.onSearch(this.s, this.itemsPerPage, pageNumber);
   else 
    this.GetAllJobgroup(this.itemsPerPage, pageNumber);
  }

  GetAllJobgroup(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllJobgroup(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {          
          this.Jobgrouplist= response.JobGroupModel;    
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
        this.userService.SearchJobgroup(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
                        
              this.Jobgrouplist= data.JobGroupModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";          
                        
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }
    delete(jobgroup_id){    
      swal({
           title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
          this.data = this.userService.DeleteJobgroup(jobgroup_id);
          this.data.subscribe(
           (response: any) => {
               this.GetAllJobgroup(this.itemsPerPage,this.currentPage);          
           },       
        ); 
      } 
      })
      }
}
