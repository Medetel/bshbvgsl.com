import { Component, OnInit } from '@angular/core';
import { Search, Search1 } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-offline-application-grid',
  templateUrl: './offline-application-grid.component.html',
  styleUrls: ['./offline-application-grid.component.css']
})
export class OfflineApplicationGridComponent implements OnInit {

  notificationlist;
  Applicantlist;
  s: Search;
  ss: Search1;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  totalItems1: number;
  isSearch: boolean;
  isSearch1: boolean;
  fileToUpload: File = null;
  filedata: any;
  title = "Offline Application";
  currentPage1: number = 1;
  userRole: any;
  AEE: boolean = false;
  data: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
    this.ss = new Search1();
    this.isSearch1 = false;
  }

  ngOnInit() {
    this.GetApplicantDraftDetails(this.itemsPerPage, 1);
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
      this.GetApplicantDraftDetails(this.itemsPerPage, pageNumber);
  }

  GetApplicantDraftDetails(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantDraftDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          this.Applicantlist = data.ApplicantModel;
          document.getElementById('loader-spinner').style.display = "none";

          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchApplicantDraftDetails(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.Applicantlist = data.ApplicantModel;
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  SendtoFinance(APP_No) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.SendtoFinance(APP_No);
    this.data.subscribe(
      (response) => {
        swal('Success!', 'Sent to Finance Successfully.', 'success');
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });

  }
}