import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-deputation-rec-grid',
  templateUrl: './deputation-rec-grid.component.html',
  styleUrls: ['./deputation-rec-grid.component.css']
})
export class DeputationRecGridComponent implements OnInit {
  title = "View Employee Deputation Out";
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata: any;
  Deputationlist: any = {};
  D: any = {};
  DEPUTATION_ID: number;
  data: any;
  DI_Id: number;
  Districtlist: any;
  Edit:any;
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    //this.GetAllMedicalDetails(this.itemsPerPage, 1);
    this.D.DivisionId = +localStorage.getItem('divisonId');
    this.GetAllDeputationRecDetails(this.D.DivisionId, this.itemsPerPage, 1);

  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllDeputationRecDetails(this.DI_Id, this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllDeputationRecDetails(this.DI_Id, this.itemsPerPage, pageNo);
  }

  GetAllDeputationRecDetails(DI_Id, itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllDeputationRecDetails(DI_Id, itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Deputationlist = data.DeputationModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  //delete
  delete(DEPUTATION_ID) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteDepuation(DEPUTATION_ID);
        this.data.subscribe(
          (response: any) => {
            this.GetAllDeputationRecDetails(this.DI_Id, this.itemsPerPage, this.currentPage);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            if (error.status == 401 || error.status == 500) {
              this.errorHandler.handleError(error);
            }
            else if (error.status == 400) {
              swal('Warning!', error.error.Message, 'warning');
            }
          }
        );
      }
    })
  }
  onSearch(s, itemsPerPage: number, pageNo: number) {

    debugger;
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchCriteria == 'DOC_CODE') {
      const [name, street, unit] = searchText.split('/');
      let searchtxt = name;
      let searchtxt1 = street;
      let searchtxt2 = unit;
      searchText = searchtxt + searchtxt1 + searchtxt2;
    }
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchDeputation(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Deputationlist = data.DeputationModel;

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
