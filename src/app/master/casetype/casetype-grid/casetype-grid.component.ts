import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-casetype-grid',
  templateUrl: './casetype-grid.component.html',
  styleUrls: ['./casetype-grid.component.css']
})
export class CasetypeGridComponent implements OnInit {
  title = "Case Type"
  itemsPerPage: number = 5;
  currentPage: number = 1;
  //CaseTypeDetailsList: any = {};
  CaseTypeDetailsList: any[] = []; //changed by saheb
  data: any = {};
  totalItems: number;
  s: Search;
  isSearch: boolean = false;
  DI_Id: number;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetCaseTypeDetails(this.itemsPerPage, 1)
  }
  //List of Case Proceedings
  GetCaseTypeDetails(itemsPerPage: any, pageNo: any) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCaseTypeDetails(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        this.CaseTypeDetailsList = response.CaseTypeModel;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  delete(CaseType_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteCaseType(CaseType_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetCaseTypeDetails(this.itemsPerPage, 1)
          },
        );
      }
    })
  }
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetCaseTypeDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetCaseTypeDetails(this.itemsPerPage, pageNo);
  }
  //search item

  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchCaseType(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            if (data.CaseTypeModel.length != 0) {
              this.CaseTypeDetailsList = data.CaseTypeModel;
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