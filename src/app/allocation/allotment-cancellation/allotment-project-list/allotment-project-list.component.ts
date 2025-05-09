import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search1, Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-allotment-project-list',
  templateUrl: './allotment-project-list.component.html',
  styleUrls: ['./allotment-project-list.component.css']
})
export class AllotmentProjectListComponent implements OnInit {
  title = "Allotment Cancellation";
  cancellist;
  data: any;
  can: any = {};
  AllottedList: any = [];
  CancelAppData: any = {};
  ss: Search1;
  isSearch1: boolean;
  itemsPerPage: number = 20;
  AlitemsPerPage: number = 20;
  currentPage: number = 1;
  AlcurrentPage: number = 1;
  totalItems: number;
  AltotalItems: number;
  isSearch: boolean;
  s: Search;
  formSubmitted:boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.ss = new Search1();
    this.isSearch1 = false;
  }

  ngOnInit() {
    debugger
    this.GetAllCancellation()

    this.GetOnlineCancelList(this.AlitemsPerPage, 1);
  }

  GetAllCancellation() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllCancellation();
    this.data.subscribe(
      (response: any) => {
        this.cancellist = response.AllotmentCancellationModel;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  pageChangedAllot(pageNumber: number) {
    debugger;
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetOnlineCancelList(this.itemsPerPage, pageNumber);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    debugger;
    this.isSearch = true;
    let searchText = s.value.SearchText1;
    let searchCriteria = s.value.SearchCriteria1;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchOnlineCancelList(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
             this.AllottedList = data.CancelAllottedModel;
            // this.AltotalItems = data.TotalItemsCount;
            // this.AlitemsPerPage = itemsPerPage;
            // this.AlcurrentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

  GetOnlineCancelList(itemsPerPage: number, pageNo: number) {
    // this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetOnlineCancelList(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
           this.AllottedList = data.CancelAllottedModel;
          // this.AltotalItems = data.TotalItemsCount;
          // this.AlitemsPerPage = itemsPerPage;
          // this.AlcurrentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
}
