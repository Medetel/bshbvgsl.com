import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-design-issue-type-grid',
  templateUrl: './design-issue-type-grid.component.html',
  styleUrls: ['./design-issue-type-grid.component.css']
})
export class DesignIssueTypeGridComponent implements OnInit {
  itemsPerPage: number=5;
  currentPage: number=1;
  DesignIssueTypelist : any = [];
  data : any;
  totalItems : number;
  s: Search;
  desisstype_id : number;
  isSearch:boolean;
   mode : string; 
  title = "Design Issue Type";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllDesignIssueType(this.itemsPerPage,this.currentPage);
  }
  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
    if
    (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
     
    this.GetAllDesignIssueType(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
   
   if (this.isSearch)
   this.onSearch(this.s, this.itemsPerPage, pageNumber);
   else 
    this.GetAllDesignIssueType(this.itemsPerPage, pageNumber);
  }

  GetAllDesignIssueType(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllDesignIssueType(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {          
          this.DesignIssueTypelist= response.DesisstypeModel;    
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
        this.userService.SearchDesignIssueType(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
                        
              this.DesignIssueTypelist= data.DesisstypeModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";          
                        
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }
    delete(desisstype_id){    
      swal({
           title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
          this.data = this.userService.DeleteDesignIssueType(desisstype_id);
          this.data.subscribe(
           (response: any) => {
               this.GetAllDesignIssueType(this.itemsPerPage,this.currentPage);          
           },       
        ); 
      } 
      })
      }
}
