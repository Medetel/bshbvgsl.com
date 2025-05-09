import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { Search } from '../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-config-view',
  templateUrl: './payment-config-view.component.html',
  styleUrls: ['./payment-config-view.component.css']
})
export class PaymentConfigViewComponent implements OnInit {


  data: any;
  mode: any;
  PC_Id: any;
  PaymentConfiguration: any;
  title = "EMI Cost Fixation List";
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  pca: any= {};
  pc: any= {};
  x:any={};
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }


  ngOnInit() {

    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
        this.PC_Id = params['PC_Id'];
        this.mode = params['mode'];
      });
    this.GetAllPaymentConfig(this.itemsPerPage, 1);
  }


  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllPaymentConfig(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllPaymentConfig(this.itemsPerPage, pageNo);
  }


  onSearch(s, itemsPerPage: number, pageNo: number) {
    
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchProjects(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.PaymentConfiguration = data.PaymentConfiguration;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }


    GetAllPaymentConfig(itemsPerPage: number, pageNo: number) {
      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.getAllPaymentConfig(itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.PaymentConfiguration = data.PaymentConfiguration;
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
  }


   

}
