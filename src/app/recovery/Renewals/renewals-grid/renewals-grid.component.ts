import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'renewals-grid',
  templateUrl: './renewals-grid.component.html',
  styleUrls: ['./renewals-grid.component.css']
})
export class RenewalsGridComponent implements OnInit {
  isSearch: boolean;
  s: any;
  RenewalList: any;
  totalItems: any;
  itemsPerPage: number = 5;
  currentPage: number;
  RL: any = {};
  message: boolean;
  itemsPerPageChanged:any;
  pageChanged:any;
  
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }


  ngOnInit() {
    this.GetAllAgreementRenewalsDetails(this.itemsPerPage, 1);
  }
 
  GetAllAgreementRenewalsDetails(itemsPerPage: number, pageNo: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllAgreementRenewalsDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.RenewalList = data.AgreementRenewalsModel;
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
      this.userService.GetAllRenewalBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
              this.message = false;
              this.RenewalList = data.AgreementRenewalsModel;
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
