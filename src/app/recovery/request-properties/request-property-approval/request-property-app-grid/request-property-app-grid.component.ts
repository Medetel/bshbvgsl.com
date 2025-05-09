import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-request-property-app-grid',
  templateUrl: './request-property-app-grid.component.html',
  styleUrls: ['./request-property-app-grid.component.css']
})
export class RequestPropertyAppGridComponent implements OnInit {

  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  ApprovalList: any = [];
  A: any = {};
  REQP_ID: any;
  message: boolean;
  data: any;
  type: any;
  router: any;
  PropId: any;
  STATUS: any;
  mode: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllRequestPropertyApprovalDetails(this.itemsPerPage, 1)
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllRequestPropertyApprovalDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllRequestPropertyApprovalDetails(this.itemsPerPage, pageNo);
  }

  GetAllRequestPropertyApprovalDetails(itemsPerPage: number, pageNo: number) {

    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllRequestPropertyApprovalDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ApprovalList = data.RequestPropertyApprovalModel;         
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
      this.userService.GetAllRequestPropertyApprovalBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.message = false;
            this.ApprovalList = data.RequestPropertyApprovalModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  handleChange1(PropId) {
    this.PropId = PropId;
    this.STATUS = 'R';
  }

  handleChange2(PropId) {
    this.PropId = PropId;
    this.STATUS = 'A';
    this.save('')
  }

  save(Remarks) {
    if (this.STATUS == 'A') {
      Remarks = 'A'
    }
    this.data = this.userService.UpdatePropertyRequest(this.STATUS, Remarks, this.PropId);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Autherization is done', 'success');
        this.GetAllRequestPropertyApprovalDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
}