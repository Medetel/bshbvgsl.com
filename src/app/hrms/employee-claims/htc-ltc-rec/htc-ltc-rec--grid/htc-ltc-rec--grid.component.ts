import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-htc-ltc-rec--grid',
  templateUrl: './htc-ltc-rec--grid.component.html',
  styleUrls: ['./htc-ltc-rec--grid.component.css']
})
export class HtcLtcRecGridComponent implements OnInit {


  title = "View HTC-LTC"

  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata: any;
  HTClist: any = {};
  Districtlist: any = [];
  h: any = {};
  LVCONS_ID: number;
  DI_Id: number;
  data: any;
  Edit: any;
  
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetallData();
    //this.GetAllMedicalDetails(this.itemsPerPage, 1);
    this.h.DivisionId = +localStorage.getItem('divisonId');
    this.GetAllHTCRecDetails(this.h.DivisionId, this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllHTCRecDetails(this.DI_Id, this.itemsPerPage, 1);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllHTCRecDetails(this.DI_Id, this.itemsPerPage, 1);
  }


  GetallData() {

    this.data = this.userService.GetAllDistrictMedical();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
      })
  }

  GetAllHTCRecDetails(DI_Id, itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllHTCDetailsRECS(DI_Id, itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.HTClist = data.HTCModel;
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
    let searchText = this.s.SearchText.replace(/\s/g, "");
    let searchCriteria = this.s.SearchCriteria.replace(/\s/g, "");
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchTrainee(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.HTClist = data.HTCModel;
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
}


