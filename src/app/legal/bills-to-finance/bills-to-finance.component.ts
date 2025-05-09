import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { Search } from '../../shared/user.model';

@Component({
  selector: 'app-bills-to-finance',
  templateUrl: './bills-to-finance.component.html',
  styleUrls: ['./bills-to-finance.component.css']
})
export class BillsToFinanceComponent implements OnInit {

  title = "View Bills";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  BillList: any = []
  data: any = {};
  totalItems: number;
  s: Search;
  isSearch: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllBills(this.itemsPerPage, this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetAllBills(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    this.GetAllBills(this.itemsPerPage, pageNumber);
  }


  GetAllBills(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllBillList(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.BillList = response.AdvocatePaymentModels;
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

  SendToFinance(AP_Id) {

    swal({
      title: 'Are you sure?', text: "You want to Send to Finance!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.value) {
        document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.SendToFinance(AP_Id);
        this.data.subscribe(
          (response: any) => {
            if (response == 'Success') {
              swal('Success!', ' Bill Sent to Finance successfully.', 'success');
              this.GetAllBills(this.itemsPerPage, this.currentPage);
              document.getElementById('loader-spinner').style.display = "none";
            }

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
      this.userService.GetBillListBysearch(udm)
        .subscribe(
          (data: any) => {
            this.BillList = data.AdvocatePaymentModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }
}