import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-cr-view',
  templateUrl: './cp-cr-grid.component.html',
  styleUrls: ['./cp-cr-grid.component.css']
})
export class CpCrViewComponent implements OnInit {

  title = "Case Registered List";
  itemsPerPage: number=5;
  currentPage: number=1;
  Caseregisteredlist : any = [];
  data : any = {};
  totalItems : number;
  s: Search;
  isSearch:boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

   ngOnInit() {
    this.GetAllCaseRegistrationPagination(this.itemsPerPage,this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) { 
    if (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
    this.GetAllCaseRegistrationPagination(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
      else 
    this.GetAllCaseRegistrationPagination(this.itemsPerPage, pageNumber);
  }

  GetAllCaseRegistrationPagination(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllCaseRegistrationPagination(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {
          this.Caseregisteredlist= response.caseRegistrationModels;    
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

  delete(CaseId){
    swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
        this.data = this.userService.DeleteCaseRegistration(CaseId);
        this.data.subscribe(
         (response: any) => {
             this.GetAllCaseRegistrationPagination(this.itemsPerPage,this.currentPage);          
         },       
      ); 
    } 
    })
    }


    //On search

    onSearch(s,itemsPerPage: number, pageNo: number) {    

      this.isSearch = true;    
      var searchText = this.s.SearchText;
      var searchCriteria = this.s.SearchCriteria;      
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {
        let udm ={
          "SearchValue":searchText,
          "SearchBy":searchCriteria,
          "ItemsPerPage":itemsPerPage,
          "PageNo":pageNo
        }

        document.getElementById('loader-spinner').style.display = "block";
        this.userService.GetCaseRegistrationBysearch(udm)
          .subscribe(
            (data:any) => {
              if(data.caseRegistrationModels.length!=0){
                //this.message=false;
              this.Caseregisteredlist = data.caseRegistrationModels;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";
              }
              else
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
