import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';


@Component({
  selector: 'app-fm-grid',
  templateUrl: './fm-grid.component.html',
  styleUrls: ['./fm-grid.component.css']
})
export class FmGridComponent implements OnInit {

  title = "View File Movement";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  filemovementlist: any = [];
  data: any = {};
  totalItems: number;
  s: Search;
  isSearch: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllFilemovemnt(this.itemsPerPage, this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo);
    else
      this.GetAllFilemovemnt(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllFilemovemnt(this.itemsPerPage, pageNumber);
  }


  GetAllFilemovemnt(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllFilemovemenentPagination(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.filemovementlist = response.filemovementmodels;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;

        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  delete(FM_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteFileMovement(FM_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetAllFilemovemnt(this.itemsPerPage, this.currentPage);
          },
        );
      }
    })
  }


  onSearch(s, itemsPerPage: number, pageNo: number) {

    this.isSearch = true;

    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      let udm = {
        "SearchValue": searchText,
        "SearchBy": searchCriteria,
        "ItemsPerPage": itemsPerPage,
        "PageNo": pageNo
      }

      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetFileMovementBysearch(udm)
        .subscribe(
          (data: any) => {      
            this.filemovementlist = data.filemovementmodels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";      
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

}