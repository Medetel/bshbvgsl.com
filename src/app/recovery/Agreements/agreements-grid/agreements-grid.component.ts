import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'agreements-grid',
  templateUrl: './agreements-grid.component.html',
  styleUrls: ['./agreements-grid.component.css']
})
export class AgreementsGridComponent implements OnInit {
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  AgreementList: any = [];
  A: any = {};
  REQP_ID: any;
  message: boolean;
  data: any;
  type: any;
  router: any;
  PropId: any; 
  STATUS: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllAgreementDetails(this.itemsPerPage, 1)
  
  } 

  pageChanged(pageNumber: number) {
   if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
   else
      this.GetAllAgreementDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
     this.onSearch(this.s, this.itemsPerPage, pageNo);
   else
      this.GetAllAgreementDetails(this.itemsPerPage, pageNo);
  }

  GetAllAgreementDetails(itemsPerPage: number, pageNo: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllAgreementDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.AgreementList = data.PropertyAgreementModels;         
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
      this.userService.GetAllAgreementBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe( 
          (data: any) => {
              this.message = false;
              this.AgreementList = data.PropertyAgreementModels;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;
              document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  DeleteAgreementDetails(REQP_ID: number) {
    
    swal({
      title: 'Are you sure?',
      text: "You want to delete this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.DeleteAgreementDetails(REQP_ID).subscribe(
          (data: any) => {
            swal('', 'Agreement Details Deleted Successfully!', 'success');
            this.GetAllAgreementDetails(this.itemsPerPage, 1);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
      }
    })
  }
}