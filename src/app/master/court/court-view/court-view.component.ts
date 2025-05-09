import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';


@Component({
  selector: 'app-court-view',
  templateUrl: './court-view.component.html',
  styleUrls: ['./court-view.component.css']
})
export class CourtViewComponent implements OnInit {

  title = "Court List";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  //CourtDetailsList: any = {};
  CourtDetailsList: any[] = []; // change by saheb
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
    this.GetCourtDetails(this.itemsPerPage, 1)
  }

  //List of Case Proceedings
  GetCourtDetails(itemsPerPage: any, pageNo: any) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCourtDetails(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.CourtDetailsList = response.CourtModel;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  delete(Court_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteCourt(Court_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetCourtDetails(this.itemsPerPage, 1)
          },
        );
      }
    })
  }
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetCourtDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetCourtDetails(this.itemsPerPage, pageNo);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchCourt(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            if (data.CourtModel.length != 0) {
              this.CourtDetailsList = data.CourtModel;
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