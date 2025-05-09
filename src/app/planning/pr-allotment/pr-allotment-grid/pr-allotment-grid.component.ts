import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pr-allotment-grid',
  templateUrl: './pr-allotment-grid.component.html',
  styleUrls: ['./pr-allotment-grid.component.css']
})
export class PrAllotmentGridComponent implements OnInit {
  currentPage: number;
  itemsPerPage: number = 5;
  totalItems: any;
  isSearch: any;
  PD: any;
  s: Search;
  PRD: any;
  PropertiesPlaningList: any;
  title = "Properties from Planning";
  data: any;
  mode: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllPropertiesPlaningList(this.itemsPerPage, 1);
    this.route.params.subscribe(params => {
      this.mode = params['mode'];
    })
  }


  pageChanged(pageNumber: number) {
    if (this.s.SearchText != "" && this.s.SearchText != null && this.s.SearchCriteria != "" && this.s.SearchCriteria != null) {
      this.isSearch = true;
    }
    else {
      this.isSearch = false;
    }
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllPropertiesPlaningList(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllPropertiesPlaningList(this.itemsPerPage, pageNo);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.SearchPropertiesPlaningList(searchCriteria, searchText, itemsPerPage, pageNo)
      this.data.subscribe(
        (response: any) => {
          this.PropertiesPlaningList = response.ProjectDetailsModel;
          this.currentPage = pageNo;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          //swal('Search Failed.');
          this.errorHandler.handleError(error);
        });
    }
  }


  GetAllPropertiesPlaningList(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllPropertiesPlaningList(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.PropertiesPlaningList = response.ProjectDetailsModel;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

}
