import { Component, OnInit } from '@angular/core';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-statutory-clearances-grid',
  templateUrl: './statutory-clearances-grid.component.html',
  styleUrls: ['./statutory-clearances-grid.component.css']
})
export class StatutoryClearancesGridComponent implements OnInit {

  statList;
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  title = "Statutory Clearances";
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllStatutory(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllStatutory(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllStatutory(this.itemsPerPage, pageNo);
  }

  GetAllStatutory(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllStatutory(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";

          this.statList = data.StatutoryModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {

    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchStatutory(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.statList = data.StatutoryModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  ActivateInactivateStatutories(id: string, inActive: string) {
    if (inActive == 'N') {
      swal({
        title: 'Are you sure?', text: "You want to inactivate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, inactivate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateStatutory(id, inActive);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to activate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, activate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateStatutory(id, inActive);
        }
      })
    }
  }

  ActivateInactivateStatutory(id: string, inActive: string) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.ActivateInactivateStatutory(id)
      .subscribe(
        (data) => {
          this.GetAllStatutory(this.itemsPerPage, 1);
          document.getElementById('loader-spinner').style.display = "none";
          if (inActive == 'N')
            swal('Inactivated!', 'Consultant has been inactivated.', 'success');
          else
            swal('Activated!', 'Consultant has been activated.', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";

        });
  }

}
