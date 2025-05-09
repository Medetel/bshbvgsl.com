import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-designation-grid',
  templateUrl: './designation-grid.component.html',
  styleUrls: ['./designation-grid.component.css']
})
export class DesignationGridComponent implements OnInit {

  title = "View Designation";
  Designationlist: any = [];
  data: any = {};
  s: Search;
  d: any = {};
  Dsc_Id: number;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetDesignationist(this.itemsPerPage, 1)
  }

  GetDesignationist(itemsPerPage: any, pageNo: any) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetallDesignationlist(this.itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.Designationlist = response.DesignationModel;
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
  pageChanged(pageNumber: number) {
    this.GetDesignationist(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetDesignationist(this.itemsPerPage, pageNo);
  }

  DeleteReligionDetails(Dsc_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeletedG(Dsc_Id,);
        this.data.subscribe(
          (response: any) => {
            this.GetDesignationist(this.itemsPerPage, 1);
          },
        );
      }
    })
  }
  onSearch(s, itemsPerPage: number, pageNo: number) {
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchDg(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Designationlist = data.DesignationModel;;
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
    this.Designationlist = [];
    this.GetDesignationist(itemsPerPage, 1);
  }
}
