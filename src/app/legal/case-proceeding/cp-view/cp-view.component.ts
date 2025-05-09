import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-cp-view',
  templateUrl: './cp-view.component.html',
  styleUrls: ['./cp-view.component.css']
})
export class CpViewComponent implements OnInit {

  title = "Case Proceeding List";
  itemsPerPage: number=5;
  currentPage: number=1;
  Caseregisteredlist : any = {};
  data : any = {};
  totalItems : number;
  s: Search;
  isSearch:boolean;
  Case_Id : number;
  caseDetails : any = {} ;
  caseProceedingdetails : any = [];  
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {

    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.Case_Id = params['CaseId'];     
      this.GetCaseDetails(this.Case_Id);     

      this.GetCaseProceedingDetails();
    });


  }

  GetCaseDetails(CaseId){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCaseDetails(CaseId);
    this.data.subscribe(
      (response: any) => {
        this.caseDetails = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  //List of Case Proceedings
  GetCaseProceedingDetails(){

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllCaseProceedingDetails(this.Case_Id);
    this.data.subscribe(
      (response: any) => {
        this.caseProceedingdetails = response.Result; 
         
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  //Delete

  delete(CaseProcId){
    swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
        this.data = this.userService.DeleteCaseProcById(CaseProcId);
        this.data.subscribe(
         (response: any) => {
             this.GetCaseProceedingDetails();          
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
        this.userService.GetCaseProceedingOnSearch(this.Case_Id,searchCriteria,searchText,)
          .subscribe(
            (data:any) => {                            
              this.caseProceedingdetails = data.Result;              
              document.getElementById('loader-spinner').style.display = "none";          
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }

}
