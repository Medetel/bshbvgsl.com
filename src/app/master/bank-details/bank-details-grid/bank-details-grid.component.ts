import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-bank-details-grid',
  templateUrl: './bank-details-grid.component.html',
  styleUrls: ['./bank-details-grid.component.css']
})
export class BankDetailsGridComponent implements OnInit {

  title = "Bank Details";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  //CourtTypeDetailsList: any = {};
  BankDetailsList: any[] = []; //changed by saheb
  data: any = {};
  totalItems: number;
  s: Search;
  isSearch: boolean = false;
  bd_id: number;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetBankDetails(this.itemsPerPage, 1)
  }
  //List of Case Proceedings
  GetBankDetails(itemsPerPage: any, pageNo: any) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetBankDetails(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        this.BankDetailsList = response.BankdetailsModel;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  delete(bd_id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteBankDetails(bd_id);
        this.data.subscribe(
          (response: any) => {
            this.GetBankDetails(this.itemsPerPage, 1)
          },
        );
      }
    })
  }
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetBankDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetBankDetails(this.itemsPerPage, pageNo);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchBankdetails(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            if (data.BankdetailsModel.length != 0) {
              this.BankDetailsList = data.BankdetailsModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;
              document.getElementById('loader-spinner').style.display = "none";
            }
            else {
              document.getElementById('loader-spinner').style.display = "none";
            }
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

}