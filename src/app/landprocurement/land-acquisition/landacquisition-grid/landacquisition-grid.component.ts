import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-landacquisition-grid',
  templateUrl: './landacquisition-grid.component.html',
  styleUrls: ['./landacquisition-grid.component.css']
})
export class LandacquisitionGridComponent implements OnInit {
  title = "Land Acquisition";

  itemsPerPage: number = 20;
  currentPage: number = 1;
  LandAquisitionList: any;
  data: any;
  totalItems: number;
  s: Search;
  isSearch: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllLandAcquisition(this.itemsPerPage, this.currentPage)
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo);
    else
      this.GetAllLandAcquisition(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllLandAcquisition(this.itemsPerPage, pageNumber);
  }

  GetAllLandAcquisition(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLandAquisition(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.LandAquisitionList = response.LandAcquisitionModels;
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


  delete(LA_Id_PK) {
    
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteLandAcquisition(LA_Id_PK,1);
        this.data.subscribe(
          (response: any) => {
            this.GetAllLandAcquisition(this.itemsPerPage, this.currentPage);
          },
        );
      }
    })
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    
    this.isSearch = true;
    var searchText = s.value.SearchText;
    var searchCriteria = s.value.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAlllandacuistionandpurchaseBysearch(itemsPerPage, pageNo, searchCriteria, searchText)
        .subscribe(
          (data: any) => {

            this.LandAquisitionList = data.LandAcquisitionModels;
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";

          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

}
