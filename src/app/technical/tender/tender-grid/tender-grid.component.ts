import { Component, OnInit } from '@angular/core';
import { Application } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-tender-grid',
  templateUrl: './tender-grid.component.html',
  styleUrls: ['./tender-grid.component.css']
})
export class TenderGridComponent implements OnInit {
  itemsPerPage: number=5;
  currentPage: number=1;
  tenderlist : any = [];
  data : any;
  totalItems : number;
  s: Search;
  Tender_id : number;
  isSearch:boolean;
   mode : string;  
   title="Tender Form";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.GetAllTechnicalTender(this.itemsPerPage,this.currentPage)
  }
  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
    if
    (this.isSearch)
    this.onSearch(this.s, itemsPerPage, pageNo);
    else   
     
    this.GetAllTechnicalTender(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber:number){ 
   
   if (this.isSearch)
   this.onSearch(this.s, this.itemsPerPage, pageNumber);
   else 
    this.GetAllTechnicalTender(this.itemsPerPage, pageNumber);
  }

  GetAllTechnicalTender(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllTechnicalTender(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {          
          this.tenderlist= response.TechnicalTenderModels;    
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
  delete(Tender_id){
    swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
        this.data = this.userService.DeleteTender(Tender_id);
        this.data.subscribe(
         (response: any) => {
             this.GetAllTechnicalTender(this.itemsPerPage,this.currentPage);          
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
        this.userService.SearchTender(itemsPerPage,pageNo,searchCriteria,searchText)
          .subscribe(
            (data:any) => {
                        
              this.tenderlist= data.TechnicalTenderModels;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";          
                        
             
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              this.errorHandler.handleError(error);
            });
      }
    }


}
