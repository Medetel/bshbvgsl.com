import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
@Component({
  selector: 'app-master-calendar-grid',
  templateUrl: './master-calendar-grid.component.html',
  styleUrls: ['./master-calendar-grid.component.css']
})
export class MasterCalendarGridComponent implements OnInit {

  title = "View Master Calendar";
  CalenderList: any = [];
  data: any = {};
  s: Search;
  l: any = {};
  calendar_id: number;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetCalenderDetails(this.itemsPerPage, 1)
  }
  GetCalenderDetails(itemsPerPage: any, pageNo: any) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCalenderList(this.itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.CalenderList = response.CalendarModel;
        if (this.CalenderList.length > 0)
          this.totalItems = response.CalendarModel[0].TotalItems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;

        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  DeleteCalenderDetails(calendar_id) {   
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteCal(calendar_id,);
        this.data.subscribe(
          (response: any) => {
            this.GetCalenderDetails(this.itemsPerPage, 1);
          },
        );
      }
    })
  }

  pageChanged(pageNumber: number) {
    this.GetCalenderDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetCalenderDetails(this.itemsPerPage, pageNo);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {   
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchCal(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {               
            this.CalenderList = data.CalendarModel;;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";         
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";           
            this.errorHandler.handleError(error);
          });
    }
  }

  GetAllOffices(itemsPerPage: any) {   
    this.CalenderList = [];
    this.GetCalenderDetails(itemsPerPage, 1);
  }

}
