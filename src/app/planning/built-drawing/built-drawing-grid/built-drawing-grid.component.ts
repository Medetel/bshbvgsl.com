import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-built-drawing-grid',
  templateUrl: './built-drawing-grid.component.html',
  styleUrls: ['./built-drawing-grid.component.css']
})
export class BuiltDrawingGridComponent implements OnInit {
  title = "Built Drawing";
  KhbDrawinglist;
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllKhbDrawings(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllKhbDrawings(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllKhbDrawings(this.itemsPerPage, pageNo);
  }

  GetAllKhbDrawings(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllKhbDrawings(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.KhbDrawinglist = data.KhbDrawingModel;
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
      this.userService.SearchKhbDrawings(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.KhbDrawinglist = data.KhbDrawingModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }
  
  ActivateInactivateKhbDrawings(id: string, inActive: string) {
    if (inActive == 'N') {
      swal({
        title: 'Are you sure?', text: "You want to inactivate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, inactivate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateKhbDrawing(id, inActive);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to activate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, activate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateKhbDrawing(id, inActive);
        }
      })
    }
  }

  ActivateInactivateKhbDrawing(id: string, inActive:string) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.ActivateInactivateKhbDrawing(id)
      .subscribe(
        (data) => {
          this.GetAllKhbDrawings(this.itemsPerPage, 1);
          document.getElementById('loader-spinner').style.display = "none";
          if(inActive=='N')
          swal('Inactivated!', 'Consultant has been inactivated.', 'success');
          else
          swal('Activated!', 'Consultant has been activated.', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          // swal({ text: 'Please delete all pro belonging to this office.' });
          //this.errorHandler.handleError(error);
        });
  }

}
