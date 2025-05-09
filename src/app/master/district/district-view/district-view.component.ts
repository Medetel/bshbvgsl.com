import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-district-view',
  templateUrl: './district-view.component.html',
  styleUrls: ['./district-view.component.css']
})
export class DistrictViewComponent implements OnInit {

  itemsPerPage: number = 5;
  currentPage: number = 1;
  //DistrictDetailsList: any = {};
  DistrictDetailsList: any[] = []; //changed by saheb
  data: any = {};
  totalItems: number;
  s: Search;
  isSearch: boolean;
  DI_Id: number;
  title = "District"


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetDistrictDetails(this.itemsPerPage, 1)
  }



  //List of Case Proceedings
  GetDistrictDetails(itemsPerPage: any, pageNo: any) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDistrictDetails(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.DistrictDetailsList = response.DistrictModels;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  delete(DI_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteDistrict(DI_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetDistrictDetails(this.itemsPerPage, 1)
          }
        );
      }
    })
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetDistrictDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetDistrictDetails(this.itemsPerPage, pageNo);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchDistrict(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            if (data.DistrictModels.length != 0) {
              this.DistrictDetailsList = data.DistrictModels;
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