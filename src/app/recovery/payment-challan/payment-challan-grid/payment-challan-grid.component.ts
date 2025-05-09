import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-challan-grid',
  templateUrl: './payment-challan-grid.component.html',
  styleUrls: ['./payment-challan-grid.component.css']
})
export class PaymentChallanGridComponent implements OnInit {
  isSearch: boolean;
  s: Search;
  totalItems: any;
  itemsPerPage: number = 5;
  currentPage: number;
  ChallanList: any;
  message: boolean;
  CustomerList: any;
  Add: any;
  
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllChallanDetails(this.itemsPerPage,1)
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
       this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
       this.GetAllChallanDetails(this.itemsPerPage, pageNumber);
   }
 
   itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
     if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
       this.GetAllChallanDetails(this.itemsPerPage, pageNo);
   }
   
  GetAllChallanDetails(itemsPerPage: number, pageNo: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllChallanDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ChallanList = data.AgreementPaymentChallanModel;
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
      this.userService.GetAllChallanBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
              this.message = false;
              this.ChallanList = data.AgreementPaymentChallanModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;
              document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  DeleteChallan(Payment_Id: number) {
    swal({
      title: 'Are you sure?',
      text: "You want to delete this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.DeleteChallan(Payment_Id).subscribe(
          (data: any) => {
            swal('', 'Challan Details Deleted Successfully!', 'success');
            this.GetAllChallanDetails(this.itemsPerPage, 1);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
      }
    })
  }

}
