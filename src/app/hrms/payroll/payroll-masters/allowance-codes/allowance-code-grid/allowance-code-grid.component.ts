import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../../shared/ErrorHandler';
import { Search } from '../../../../../shared/user.model';

@Component({
  selector: 'app-allowance-code-grid',
  templateUrl: './allowance-code-grid.component.html',
  styleUrls: ['./allowance-code-grid.component.css']
})
export class AllowanceCodeGridComponent implements OnInit {
  title = "Allowance Codes";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  allowedlist: any = {}
  data: any = {};
  totalItems: number;
  s: Search;
  isSearch: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllAllowanceDeductionCode(this.itemsPerPage, this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo);
    else
      this.GetAllAllowanceDeductionCode(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllAllowanceDeductionCode(this.itemsPerPage, pageNumber);
  }


  GetAllAllowanceDeductionCode(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAllowanceDeductionCode(itemsPerPage, pageNo, 'E');
    this.data.subscribe(
      (response: any) => {
        this.allowedlist = response;
        if (this.allowedlist.length > 0)
          this.totalItems = response[0].totalItems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  delete(Code) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.uspPayEarnDedDelete(Code);
        this.data.subscribe(
          (response: any) => {
            this.GetAllAllowanceDeductionCode(this.itemsPerPage, this.currentPage);
          },
        );
      }
    })
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      let udm = {
        "SearchValue": searchText,
        "SearchBy": searchCriteria,
        "ItemsPerPage": itemsPerPage,
        "PageNo": pageNo
      }
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAllAllowanceDeductionCodeonSearch(itemsPerPage, pageNo, 'E', searchText, searchCriteria)
        .subscribe(
          (response: any) => {
            this.allowedlist = response;
            if (this.allowedlist.length > 0)
              this.totalItems = response[0].totalItems;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
            //this.message=true;
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }
}
