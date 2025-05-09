import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
@Component({
  selector: 'app-land-project-details',
  templateUrl: './land-project-details.component.html',
  styleUrls: ['./land-project-details.component.css']
})
export class LandProjectDetailsComponent implements OnInit {
title="Land Owner Details";

itemsPerPage: number=5;
currentPage: number=1;
ProposalprojectDetails : any = [];
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
  this.GetAllProposalproject(this.itemsPerPage,this.currentPage)
}

itemsPerPageChanged(itemsPerPage: number, pageNo: number) {    
  if (this.isSearch)
 this.onSearch(this.s, itemsPerPage, pageNo);
 else   
 this.GetAllProposalproject(itemsPerPage, pageNo);
}

pageChanged(pageNumber:number){ 
 if (this.isSearch)
   this.onSearch(this.s, this.itemsPerPage, pageNumber);
 else 
 this.GetAllProposalproject(this.itemsPerPage, pageNumber);
}

GetAllProposalproject(itemsPerPage: number, pageNo: number){
 this.isSearch = false;
 document.getElementById('loader-spinner').style.display = "block";
 this.data = this.userService.GetAllProposalproject(itemsPerPage,pageNo);
 this.data.subscribe(
      (response: any) => {
       this.ProposalprojectDetails= response.ProposalProjectModel;         
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


// delete(LOD_Id){
//  swal({
//       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
//    }).then((result) => {
//      if (result.value) {
//      this.data = this.userService.DeleteLandOwnerDetails(LOD_Id);
//      this.data.subscribe(
//       (response: any) => {
//           this.GetAllLandOwnerDetails(this.itemsPerPage,this.currentPage);          
//       },       
//    ); 
//  } 
//  })
//  }


 onSearch(s,itemsPerPage: number, pageNo: number) {     
   this.isSearch = true;    
   var searchText = this.s.SearchText;
   var searchCriteria = this.s.SearchCriteria;
   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
     swal("Warning!", "Please enter the search criteria and search text.", "warning");
   else {       

     document.getElementById('loader-spinner').style.display = "block";
     this.userService.GetAllProposalprojectOnSearch(itemsPerPage,pageNo,searchCriteria,searchText)
       .subscribe(
         (data:any) => {                
           this.ProposalprojectDetails = data.ProposalProjectModel;              
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
