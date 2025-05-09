import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
@Component({
  selector: 'app-leaves-grid',
  templateUrl: './leaves-grid.component.html',
  styleUrls: ['./leaves-grid.component.css']
})
export class LeavesGridComponent implements OnInit {

  title = "View Leaves";
  Leavelist: any = [];
  data: any = {};
  s: Search;
  l: any = {};
  Leave_id: number;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }
  ngOnInit() {
    this.GetLeaveDetailsList(this.itemsPerPage, 1)
  }
  GetLeaveDetailsList(itemsPerPage: any, pageNo: any) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetallLeavelist(this.itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.Leavelist = response.LeaveModel;
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

  DeleteLeaveDetails(Leave_id) {    
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteLeave(Leave_id,);
        this.data.subscribe(
          (response: any) => {
            this.GetLeaveDetailsList(this.itemsPerPage, 1);
          },
        );
      }
    })
  }

  pageChanged(pageNumber: number) {
    this.GetLeaveDetailsList(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetLeaveDetailsList(this.itemsPerPage, pageNo);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {  
 
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchLeave(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {                  
            this.Leavelist = data.LeaveModel;;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";          
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";          
            this.errorHandler.handleError(error);
          });
    }
  }
  GetAllTest(itemsPerPage: any) {  
    this.Leavelist = [];
    this.GetLeaveDetailsList(itemsPerPage, 1);
  }
}
