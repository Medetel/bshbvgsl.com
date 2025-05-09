import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-claim-grid',
  templateUrl: './claim-grid.component.html',
  styleUrls: ['./claim-grid.component.css']
})
export class ClaimGridComponent implements OnInit {
  title = "View Claims";
  s: Search;
  itemsPerPage: number=5;
  currentPage: number=1;
  totalItems: number;
  isSearch:boolean;
  message:boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler:ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.getAllClaims(this.itemsPerPage, 1);
  }

  rolesList;

  pageChanged(pageNumber:number){
    if (this.isSearch)
    this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
    this.getAllClaims(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.getAllClaims(this.itemsPerPage, pageNo);
  }

  getAllClaims(itemsPerPage: number, pageNo: number) {
    this.message=false;
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display="block";
    this.userService.getAllClaims(itemsPerPage, pageNo)
      .subscribe(
        (data:any) => {
          this.rolesList = data.RolesModels;
          this.totalItems=data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          document.getElementById('loader-spinner').style.display="none";
        }, (error:any) => {
          document.getElementById('loader-spinner').style.display="none";
          this.errorHandler.handleError(error);
        });
  }

  onSearch(s,itemsPerPage: number, pageNo: number) {
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.searchRoles(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data:any) => {
            if(data.RolesModels.length!=0){
              this.message=false;
            this.rolesList = data.RolesModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }
          else
          {
          document.getElementById('loader-spinner').style.display = "none";
          this.message=true;
          }
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";            
            this.errorHandler.handleError(error);
          });
    }
  }
}
