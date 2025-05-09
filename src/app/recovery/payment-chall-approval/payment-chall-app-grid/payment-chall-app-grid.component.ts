import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-chall-app-grid',
  templateUrl: './payment-chall-app-grid.component.html',
  styleUrls: ['./payment-chall-app-grid.component.css']
})
export class PaymentChallAppGridComponent implements OnInit {
  isSearch: boolean;
  s: Search;
  itemsPerPage: number = 5;
  ChallanApprovalList: any;
  totalItems: any;
  currentPage: number;
  CA: any = {};
  message: boolean;
  PayId: any;
  Status: any;
  data: any;
  mode; any;
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllChallanApprovalDetails(this.itemsPerPage, 1);
  }


  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllChallanApprovalDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllChallanApprovalDetails(this.itemsPerPage, pageNo);
  }


  GetAllChallanApprovalDetails(itemsPerPage: number, pageNo: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllChallanApprovalDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ChallanApprovalList = data.AgreementPaymentChallanApprovalModel;
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
      this.userService.GetAllChallanApprovalBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.message = false;
            this.ChallanApprovalList = data.AgreementPaymentChallanApprovalModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  handleChange1(PayId) {
    this.PayId = PayId;
    this.Status = 'R';
  }

  handleChange2(PayId) {
    this.PayId = PayId;
    this.Status = 'A';
    this.save('')
  }

  save(Remarks) {
    if (this.Status == 'A') {
      Remarks = 'A'
    }
    this.data = this.userService.ApproveChallan(this.Status, Remarks, this.PayId);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Autherization is done', 'success');
        this.GetAllChallanApprovalDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
}
