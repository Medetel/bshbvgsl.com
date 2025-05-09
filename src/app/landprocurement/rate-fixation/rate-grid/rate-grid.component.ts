import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-rate-grid',
  templateUrl: './rate-grid.component.html',
  styleUrls: ['./rate-grid.component.css']
})
export class RateGridComponent implements OnInit {

  title="Rate Fixation";
  itemsPerPage: number=5;
  currentPage: number=1;
  //ratefixationlist : any = {};
  ratefixationlist : any[] = []; //changed by saheb
  data : any = {};
  totalItems : number;
  s: Search;
  isSearch:boolean;
  PR_Id_PK : number;
  mode : string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

   ngOnInit() {
    this.GetAllrateFixation(this.itemsPerPage,this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
     if (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
    this.GetAllrateFixation(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else 
    this.GetAllrateFixation(this.itemsPerPage, pageNumber);
  }

  GetAllrateFixation(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllrateFixation(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {
          this.ratefixationlist= response.RateFixationModels;    
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


  delete(RF_Id_PK){
    swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
        this.data = this.userService.DeleteRateFixation(RF_Id_PK);
        this.data.subscribe(
         (response: any) => {
             this.GetAllrateFixation(this.itemsPerPage,this.currentPage);          
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
        this.userService.GetRateFixationOnSearch(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {                
              this.ratefixationlist = data.RateFixationModels;              
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;           
              {
              document.getElementById('loader-spinner').style.display = "none";
              //this.message=true;
              }
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }


}
