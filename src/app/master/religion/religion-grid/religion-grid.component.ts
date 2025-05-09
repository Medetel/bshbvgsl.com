import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-religion-grid',
  templateUrl: './religion-grid.component.html',
  styleUrls: ['./religion-grid.component.css']
})
export class ReligionGridComponent implements OnInit {

  title = "View Religion";
  Religionlist: any = [];
  r: any = {};
  data: any = {};
  s: Search;
  Rlg_Id: number;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetReligionlist(this.itemsPerPage, 1)
  }
  GetReligionlist(itemsPerPage: any, pageNo: any) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetallReligionlist(this.itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.Religionlist = response.ReligionModel;
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
    this.GetReligionlist(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetReligionlist(itemsPerPage, pageNo);
  }

  deleteReligionDetails(Rlg_Id) {    
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteReligion(Rlg_Id,);
        this.data.subscribe(
          (response: any) => {
            this.GetReligionlist(this.itemsPerPage, 1);
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
      this.userService.SearchReligion_New(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Religionlist = data.ReligionModel;;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }
  GetAllOffices(itemsPerPage) {   
    this.Religionlist = [];
    this.GetReligionlist(itemsPerPage, 1);
  }
}
