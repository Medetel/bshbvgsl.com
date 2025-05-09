import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';
import { ErrorHandler } from '../../../shared/ErrorHandler';


@Component({
  selector: 'app-office-grid',
  templateUrl: './office-grid.component.html',
  styleUrls: ['./office-grid.component.css']
})
export class OfficeGridComponent implements OnInit {
  title = "Office";
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  officeList;
  isSearch: boolean;
  message:boolean;
  
  constructor(private userService: UserService, private route: ActivatedRoute,private errorHandler:ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllOffices(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllOffices(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllOffices(this.itemsPerPage, pageNo);
  }

  GetAllOffices(itemsPerPage: number, pageNo: number) {
    this.message=false;
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllOffices(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.officeList = data.OfficeModels;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  ActivateInactivateOffices(id: string, inActive: string) {
    if (inActive == 'N') {
      swal({
        title: 'Are you sure?', text: "You want to inactivate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, inactivate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateOffice(id, inActive);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to activate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, activate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateOffice(id, inActive);
        }
      })
    }
  }

  ActivateInactivateOffice(id: string, inActive:string) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.activateInactivateOffices(id)
      .subscribe(
        (data) => {
          this.GetAllOffices(this.itemsPerPage, 1);
          document.getElementById('loader-spinner').style.display = "none";
          if(inActive=='N')
          swal('Inactivated!', 'Office has been inactivated.', 'success');
          else
          swal('Activated!', 'Office has been activated.', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal({ text: 'Please delete all roles belonging to this office.' });
          //this.errorHandler.handleError(error);
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
      this.userService.searchOffices(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            if(data.OfficeModels.length!=0){
              this.message=false;
            this.officeList = data.OfficeModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }
          else
          {
          document.getElementById('loader-spinner').style.display = "none";
          this.message=true;
          }
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

}
