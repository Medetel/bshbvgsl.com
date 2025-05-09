import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-on-grid',
  templateUrl: './on-grid.component.html',
  styleUrls: ['./on-grid.component.css']
})
export class OnGridComponent implements OnInit {

  title = "Objection Notifications";

  itemsPerPage: number = 5;
  currentPage: number = 1;
  ObjectionNotificationList: any = [];
  data: any ;
  totalItems: number;
  s: Search;
  isSearch: boolean;
  PR_Id_PK: number;
  mode: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllobjectionNotification(this.itemsPerPage, this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo);
    else
      this.GetAllobjectionNotification(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllobjectionNotification(this.itemsPerPage, pageNumber);
  }

  GetAllobjectionNotification(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllObjectionNotification(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.ObjectionNotificationList = response.ObjectionNotificationModels;
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


  delete(ON_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteObjectionNotification(ON_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetAllobjectionNotification(this.itemsPerPage, this.currentPage);
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

      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetObjectionNotificationOnSearch(itemsPerPage, pageNo, searchCriteria, searchText)
        .subscribe(
          (data: any) => {
            this.ObjectionNotificationList = data.ObjectionNotificationModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            {
              document.getElementById('loader-spinner').style.display = "none";
            }
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  GetONStatus(Status: any,itemsPerPage: number, pageNo: number) {
    
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetONStatus(Status,itemsPerPage,pageNo)
        .subscribe(
          (data: any) => {
            this.ObjectionNotificationList = data.ObjectionNotificationModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            {
              document.getElementById('loader-spinner').style.display = "none";
            }
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    
  }

}
