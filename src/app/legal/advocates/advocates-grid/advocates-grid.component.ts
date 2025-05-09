import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-advocates-grid',
  templateUrl: './advocates-grid.component.html',
  styleUrls: ['./advocates-grid.component.css']
})
export class AdvocatesGridComponent implements OnInit {

  title = "Advocates List";
  data: any = {};
  Advocateslist: any = [];
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;

  numericpattern = "^[0-9]*$";
  emailpattern = "^[a-zA-Z0-9._%-+]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  message: boolean;
  isSearch: boolean;
  Advocatelist: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllAdvocates(this.itemsPerPage, this.currentPage);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllAdvocates(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllAdvocates(this.itemsPerPage, pageNo);
  }

  GetAllAdvocates(itemsPerPage: number, pageNo: number) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAdvocatesPagination(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.Advocateslist = response.AdvocatesModels;
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

  //To set the Advocate primaryKey Id and view mode 
  view(Adv_Id, Mode) {
    localStorage.setItem('Edit', Adv_Id);
    localStorage.setItem('Mode', Mode);
    this.router.navigate(['/home/employedadvocates/employedadvocates-form'])
  }

  //for edit

  edit(Adv_Id, Mode) {
    localStorage.setItem('Edit', Adv_Id);
    localStorage.setItem('Mode', Mode);
    this.router.navigate(['/home/employedadvocates/employedadvocates-form'])
  }

  //delete
  delete(Adv_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteAdvocate(Adv_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetAllAdvocates(this.itemsPerPage, this.currentPage);
          },
        );
      }
    })
  }

  //search
  onSearch(searchForm, itemsPerPage: number, pageNo: number) {

    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;

    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";

      let udm = {
        "searchValue": searchText,
        "SearchBy": searchCriteria,
        "ItemsPerPage": itemsPerPage,
        "PageNo": pageNo
      }
      this.userService.GetAllAdvocatesBysearch(udm)
        .subscribe(
          (data: any) => {
            this.Advocateslist = data.AdvocatesModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  GetAdvocates() {
    this.GetAllAdvocates(this.itemsPerPage, this.currentPage);
  }

}