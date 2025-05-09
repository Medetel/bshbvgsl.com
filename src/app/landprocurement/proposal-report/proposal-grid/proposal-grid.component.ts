import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-proposal-grid',
  templateUrl: './proposal-grid.component.html',
  styleUrls: ['./proposal-grid.component.css']
})
export class ProposalGridComponent implements OnInit {

  title="Proposal Report ";
  itemsPerPage: number=5;
  currentPage: number=1;
  proposallist : any;
  data : any;
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

    this.GetAllProposalReport(this.itemsPerPage,this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
    if (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
    this.GetAllProposalReport(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
      else 
    this.GetAllProposalReport(this.itemsPerPage, pageNumber);
  }

  GetAllProposalReport(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllProposalReport(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {
          this.proposallist= response.proposalreportmodels;    
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


  delete(PR_Id_PK){
    swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
        this.data = this.userService.DeleteProposalReport(PR_Id_PK);
        this.data.subscribe(
         (response: any) => {
             this.GetAllProposalReport(this.itemsPerPage,this.currentPage);          
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
        this.userService.GetProposalReportBysearch(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
              if(data.proposalreportmodels.length!=0){                
              this.proposallist = data.proposalreportmodels;
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
