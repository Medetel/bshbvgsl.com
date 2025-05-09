import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search, Search1 } from '../../../shared/user.model';

@Component({
  selector: 'app-allotment-allotted-property',
  templateUrl: './allotment-allotted-property.component.html',
  styleUrls: ['./allotment-allotted-property.component.css']
})
export class AllotmentAllottedPropertyComponent implements OnInit {
  title = "Vacant properties"
  title2 = "Allotted Properties"
  VacantList;
  s: Search;
  itemsPerPage: number = 5;
  AlitemsPerPage: number = 5;
  currentPage: number = 1;
  AlcurrentPage: number = 1;
  totalItems: number;
  AltotalItems: number;
  isSearch: boolean;
  PD_Id: any;
  Phase_Name: any;
  PD_Project_Name: any;
  AllottedList;
  Sch_Id: any;
  type: any;
  ss: Search1;
  isSearch1: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.ss = new Search1();
    this.isSearch1 = false;
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.PD_Id = params['PD_Id'],
        this.PD_Project_Name = params['PD_Project_Name'],
        this.Phase_Name = params['Phase_Name'],
        this.Sch_Id = params['Sch_Id']

    }
    );
    if (this.PD_Id != null)
      this.GetCancelAllottedList(this.AlitemsPerPage, 1);
    this.GetCancelVacantList(this.PD_Id, this.itemsPerPage, 1);

  }

  pageChanged(pageNumber: number) {
    
    // if (this.isSearch)
    //   this.onSearch(this.s, this.itemsPerPage, pageNumber);
    // else
    this.GetCancelVacantList(this.PD_Id, this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    
    // if (this.isSearch)
    //   this.onSearch(this.s, this.itemsPerPage, pageNo);
    // else
    this.GetCancelVacantList(this.PD_Id, this.itemsPerPage, pageNo);
  }

  pageChangedAllot(pageNumber: number) {
    
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetCancelAllottedList(this.itemsPerPage, pageNumber);
  }

  GetCancelVacantList(PD_Id, itemsPerPage: number, pageNo: number) {
    // this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetCancelVacantList(PD_Id, itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.VacantList = data.CancelVacantModel;
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
    let searchText = s.value.SearchText1;
    let searchCriteria = s.value.SearchCriteria1;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchAllottedList(searchCriteria, searchText, itemsPerPage, pageNo,this.PD_Id)
        .subscribe(
          (data: any) => {
            this.AllottedList = data.CancelAllottedModel;
            this.AltotalItems = data.TotalItemsCount;
            this.AlitemsPerPage = itemsPerPage;
            this.AlcurrentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

  GetCancelAllottedList(itemsPerPage: number, pageNo: number) {
    // this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetCancelAllottedList(this.PD_Id, itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.AllottedList = data.CancelAllottedModel;
          this.AltotalItems = data.TotalItemsCount;
          this.AlitemsPerPage = itemsPerPage;
          this.AlcurrentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }



  payment() {
    swal({
      //title: '<i>HTML</i> <u>example</u>',
      //type: 'info',
      html:
        '<input placeholder="Bank Name" type="text" class="form-control"><br>' +
        '<input placeholder="Branch" type="text" class="form-control"><br>' +
        '<input placeholder="DD No/Challan." type="text" class="form-control"><br>' +
        '<input placeholder="DD Date" type="text" class="form-control"><br>' +
        '<input placeholder="Amount" type="text" class="form-control"><br>',
      // '<label>DD Copy</label><input style="width:70%;display:inline-block;margin-left:20px;"  type="file" class="form-control">' ,

      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Save',
      cancelButtonText:
        'Cancel',
    })
  }


}
