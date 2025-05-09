import { Component, OnInit } from '@angular/core';
import { Search } from '../../../shared/user.model';
import { Search1 } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-statusview',
  templateUrl: './statusview.component.html',
  styleUrls: ['./statusview.component.css']
})
export class StatusviewComponent implements OnInit {

  notificationlist;
  Applicantlist;
  s: Search;
  ss: Search1;
  itemsPerPage: number = 10;
  itemsPerPage1: number = 10;
  currentPage: number = 1;
  totalItems: number;
  totalItems1: number;
  isSearch: boolean;
  isSearch1: boolean;
  fileToUpload: File = null;
  filedata: any;
  title = "Application Status";
  currentPage1: number = 1;
  userRole: any;
  AEE : boolean = false;
  hide: any;


  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    
    this.s = new Search();
    this.isSearch = false;
    this.ss = new Search1();
    this.isSearch1 = false;
  }

  ngOnInit() {   
    this.userRole = localStorage.getItem('userRole');    
    if(this.userRole == 'AEE'){
      this.AEE = true;     
    }
    this.GetApplicantData(this.itemsPerPage, 1);
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
      this.GetApplicantData(this.itemsPerPage, pageNumber);
  }

  changepage(pageNumber1: number) {
    
    if (this.ss.SearchText1 != "" && this.ss.SearchText1 != null && this.ss.SearchCriteria1 != "" && this.ss.SearchCriteria1 != null) {
      this.isSearch1 = true;
    }
    else {
      this.isSearch1 = false;
    }
    if (this.isSearch1)
      this.onSearchNotification(this.ss, this.itemsPerPage, pageNumber1);
    else
      this.GetAllNotificationList(this.itemsPerPage, pageNumber1);
  }

  GetPrId(PR_Id){
    localStorage.setItem('Prop_Id', PR_Id);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    
    this.hide = "no";
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchApplicantData(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.Applicantlist = data.ApplicantModel;
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;          

            // for (let i = 0; i < this.Applicantlist.length; i++) {
            //   if (this.Applicantlist[i].APP_IsEligible == null)
            //     this.Applicantlist[i].APP_Status = "Moved to Scrutiny"
            //   if (this.Applicantlist[i].APP_IsEligible == 'N')
            //     this.Applicantlist[i].APP_Status = "Not Eligible"
            //   if (this.Applicantlist[i].APP_IsEligible == 'Y')
            //     this.Applicantlist[i].APP_Status = "Eligible"
            //   if (this.Applicantlist[i].APP_IsEligible == 'Y' && this.Applicantlist[i].LOD_Property_No != null)
            //     this.Applicantlist[i].APP_Status = "Allotted"
            //   if (this.Applicantlist[i].APP_IsEligible == 'Y' && this.Applicantlist[i].LOD_Property_No == null)
            //     this.Applicantlist[i].APP_Status = "Not Allotted"
            // }
            // this.totalItems = data.TotalItemsCount;
            // this.itemsPerPage = itemsPerPage;
            // this.currentPage = pageNo;
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  onSearchNotification(ss, itemsPerPage: number, pageNo: number) {
    
    var SearchText1 = this.ss.SearchText1;
    var searchCriteria1 = this.ss.SearchCriteria1;
    if (searchCriteria1 == 'NotifNo') {
      const [name, street, unit, cross] = SearchText1.split('/');
      let searchtxt = name;
      let searchtxt1 = street;
      if(street == undefined)
      {
        searchtxt1 = '';
      }
      let searchtxt2 = unit;
      if(unit == undefined)
      {
        searchtxt2 = '';
      }
      let searchtxt3 = cross;
      if(cross == undefined)
      {
        searchtxt3 = '';
      }
      SearchText1 = searchtxt + searchtxt1 + searchtxt2 + searchtxt3;
    }
    if (SearchText1 == "" || SearchText1 == null || searchCriteria1 == "" || searchCriteria1 == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchNotificationList(searchCriteria1, SearchText1, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.notificationlist = data.Notificationlist;
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  GetAllNotificationList(itemsPerPage: number, pageNo1: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllNotificationList(itemsPerPage, pageNo1)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.notificationlist = data.Notificationlist;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo1;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetApplicantData(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    this.hide = "yes";
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantData(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          this.Applicantlist = data.ApplicantModel;
          this.GetAllNotificationList(10, 1);
          document.getElementById('loader-spinner').style.display = "none";        
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

}
