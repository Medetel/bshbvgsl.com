import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'payment-receipts-grid',
  templateUrl: './payment-receipts-grid.component.html',
  styleUrls: ['./payment-receipts-grid.component.css']
})
export class PaymentReceiptsGridComponent implements OnInit {
  s: Search;
  isSearch: boolean;
  ReceiptList: any = [];
  Payment_Receipt_Id: number;
  // PR: any = {};
  totalItems: any;
  itemsPerPage: number = 5;
  currentPage: number;
  message: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllReceiptDetails(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
       this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
       this.GetAllReceiptDetails(this.itemsPerPage, pageNumber);
   }
 
   itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
     if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
       this.GetAllReceiptDetails(this.itemsPerPage, pageNo);
   }

  GetAllReceiptDetails(itemsPerPage: number, pageNo: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllReceiptDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ReceiptList = data.PaymentReceiptModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  DeleteReceipt(Payment_Receipt_Id: number) {
    swal({
      title: 'Are you sure?',
      text: "You want to delete this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.DeleteReceipt(Payment_Receipt_Id).subscribe(
          (data: any) => {
            swal('', 'Receipt Details Deleted Successfully!', 'success');
            this.GetAllReceiptDetails(this.itemsPerPage, 1);
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
      this.userService.GetAllReceiptBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.message = false;
            this.ReceiptList = data.PaymentReceiptModel;
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
