import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-cav-grid',
  templateUrl: './cav-grid.component.html',
  styleUrls: ['./cav-grid.component.css']
})
export class CavGridComponent implements OnInit {
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  title = "View Advocate Change";
  data: any = {};
  ChangedAdvocateslist: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetAllAdvocateChanges(this.itemsPerPage, this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    // if (this.isSearch)
    //this.onSearch(this.s, itemsPerPage, pageNo);
    //else   
    this.GetAllAdvocateChanges(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    //if (this.isSearch)
    // this.onSearch(this.s, this.itemsPerPage, pageNumber);
    //else 
    this.GetAllAdvocateChanges(this.itemsPerPage, pageNumber);

  }
  GetAllAdvocateChanges(itemsPerPage: number, pageNo: number) {
    //this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllChangesOfAdvocates(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.ChangedAdvocateslist = response.ChangesOfAdvocates;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  //On search

  onSearch(s, itemsPerPage: number, pageNo: number) {
    //this.isSearch = true;  
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {

      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAllChangesOfAdvocatesOnSearch(searchCriteria, searchText)
        .subscribe(
          (data: any) => {
            if (data.length != 0) {
              //this.message=false;
              this.ChangedAdvocateslist = data.Result;
              // this.totalItems = data.TotalItemsCount;
              // this.currentPage = pageNo;            
              document.getElementById('loader-spinner').style.display = "none";
            }
            else {
              document.getElementById('loader-spinner').style.display = "none";
              //this.message=true;
            }
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }

  }

}