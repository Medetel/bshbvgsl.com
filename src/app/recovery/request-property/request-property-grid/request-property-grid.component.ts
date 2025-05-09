import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-request-property-grid',
  templateUrl: './request-property-grid.component.html',
  styleUrls: ['./request-property-grid.component.css']
})
export class RequestPropertyGridComponent implements OnInit {
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  ResuestPropertyList: any = [];
  RP: any;
  REQP_ID: any;
  P: any;
  isSearch: any;
  s: Search;
  message: boolean;
  mode: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllRequestPropertyDetails(this.itemsPerPage, 1);
  }
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllRequestPropertyDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllRequestPropertyDetails(this.itemsPerPage, pageNo);
  }

  GetAllRequestPropertyDetails(itemsPerPage: number, pageNo: number) {

    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllRequestPropertyDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ResuestPropertyList = data.RequestPropertyModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  DeleteRequestPropertyDetails(REQP_ID: number) {

    swal({
      title: 'Are you sure?',
      text: "You want to delete this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.DeleteRequestPropertyDetails(REQP_ID).subscribe(
          (data: any) => {
            swal('', 'Request Property Details Deleted Successfully!', 'success');
            this.GetAllRequestPropertyDetails(this.itemsPerPage, 1);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
      }
    })
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {

    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAllRequestPropertyBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.message = false;
            this.ResuestPropertyList = data.RequestPropertyModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }
}