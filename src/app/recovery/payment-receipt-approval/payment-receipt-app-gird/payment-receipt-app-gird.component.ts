import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user.service';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-receipt-app-gird',
  templateUrl: './payment-receipt-app-gird.component.html',
  styleUrls: ['./payment-receipt-app-gird.component.css']
})
export class PaymentReceiptAppGirdComponent implements OnInit {
  s: any;
  isSearch: boolean;
  itemsPerPage: number = 5;
  totalItems: any;
  currentPage: number;
  ReceiptApprovalList: any; 
  message: boolean;
  ReceiptId: any;
  Status: string;
  data: any;
  RA: any = {};
  mode:any;
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
   this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllReceiptApprovalDetails(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber:number){
    if (this.isSearch)
    this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
    this.GetAllReceiptApprovalDetails(this.itemsPerPage, pageNumber);
  }
  
  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllReceiptApprovalDetails(this.itemsPerPage, pageNo);
  }
  GetAllReceiptApprovalDetails(itemsPerPage: number, pageNo: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllReceiptApprovalDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ReceiptApprovalList = data.PaymentReceiptApprovalModel;
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
      this.userService.GetAllReceiptApprovalBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
              this.message = false;
              this.ReceiptApprovalList = data.PaymentReceiptApprovalModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;
              document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  handleChange1(ReceiptId) {
    this.ReceiptId = ReceiptId;
    this.Status = 'R';
  }

  handleChange2(ReceiptId) {
    this.ReceiptId = ReceiptId;
    this.Status = 'A';
    this.save('')   
  }
 
  save(Remarks){    
    if(this.Status=='A'){
      Remarks='A'
    }
    this.data = this.userService.ApproveReceipt(this.Status,Remarks,this.ReceiptId);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Autherization is done', 'success');
        this.GetAllReceiptApprovalDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
}
