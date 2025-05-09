import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-adv-pay-grid',
  templateUrl: './adv-pay-grid.component.html',
  styleUrls: ['./adv-pay-grid.component.css']
})
export class AdvPayGridComponent implements OnInit {

  title = "Advocates Cases List";
  data: any = [];
  AdvocateCaselist: any = [];
  AdvocatesCasesbilllist: any = [];
  AdvocateId: number;
  CaseId: number;
  advBil: boolean = false;
  AP_Id: number;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;

  s: Search;
  s2: Search;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.s2 = new Search();
    this.isSearch = false;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.AdvocateId = params['AdvId'];
      this.CaseId = params['CaseId'];

      if (this.AdvocateId > 0 && this.CaseId > 0) {
        this.GetBillDetails(this.AdvocateId, this.CaseId);
        this.currentPage = +localStorage.getItem('Page');
        localStorage.removeItem('Page');
      }



    })

    this.GetAllAdvocatesCases(this.itemsPerPage, this.currentPage);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetAllAdvocatesCases(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    this.GetAllAdvocatesCases(this.itemsPerPage, pageNumber);
  }

  GetAllAdvocatesCases(ItemsPerPage, currentPage) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAdvocatesCases(ItemsPerPage, currentPage);
    this.data.subscribe(
      (response: any) => {
        this.AdvocateCaselist = response.Result;
        this.totalItems = response.Result[0].totalItems;
        this.itemsPerPage = ItemsPerPage;
        this.currentPage = currentPage;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {

      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAllAdvocatesCasesDetailsOnsearch(searchCriteria, searchText)
        .subscribe(
          (data: any) => {
            this.AdvocateCaselist = data.Result;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  onSearch2(s2, itemsPerPage: number, pageNo: number) {
    var searchText = this.s2.SearchText;
    var searchCriteria = this.s2.SearchCriteria;

    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAdvocatesCasesBillDetailsOnSearch(this.AdvocateId, this.CaseId, searchCriteria, searchText)
        .subscribe(
          (data: any) => {
            this.AdvocatesCasesbilllist = data.Result;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  GetBillDetails(advId, CaseId) {
    this.advBil = true;
    this.AdvocateId = advId;
    this.CaseId = CaseId;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAdvocatesCasesBillDetails(advId, CaseId);
    this.data.subscribe(
      (response: any) => {
        this.AdvocatesCasesbilllist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  delete(AP_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteAdvocateBill(AP_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetBillDetails(this.AdvocateId, this.CaseId);
          },
        );
      }
    })
  }

  add() {
    localStorage.setItem('Page', this.currentPage.toString())
    this.router.navigate(['/home/advocate-pay/advocate-pay-form', this.AdvocateId, this.CaseId, 0, 'create']);
  }

  view(AP_Id) {
    localStorage.setItem('Page', this.currentPage.toString())
    this.router.navigate(['/home/advocate-pay/advocate-pay-form', this.AdvocateId, this.CaseId, AP_Id, 'view']);
  }

  edit(AP_Id) {
    localStorage.setItem('Page', this.currentPage.toString())
    this.router.navigate(['/home/advocate-pay/advocate-pay-form', this.AdvocateId, this.CaseId, AP_Id, 'edit']);
  }
}