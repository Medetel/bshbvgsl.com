import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-revisedpropertyregister-grid',
  templateUrl: './revisedpropertyregister-grid.component.html',
  styleUrls: ['./revisedpropertyregister-grid.component.css']
})
export class RevisedpropertyregisterGridComponent implements OnInit {

  filee: any;
  data: any;
  projectlist: any;
  revpropertylist;
  s: Search;
  project: any;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  isSearchProject: boolean;
  fileToUpload: File = null;
  Pro: any = {};
  EXProj: any = {};
  PRD_Id: any;
  // projectName: any;
  // @ViewChild('iPR_Excel') myInputVariable: ElementRef;
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
    this.isSearchProject = false;

  }

  ngOnInit() {

    // this.GetAllProperties(this.itemsPerPage, 1);
    this.GetAllProject();
    this.GetAllProperties(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {

    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber, this.PRD_Id);
    else if (this.isSearchProject)
      this.SearchProjects(this.Pro.PD_Id, this.itemsPerPage, pageNumber)
    else
      this.GetAllProperties(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {

    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo, this.PRD_Id);
    else if (this.isSearchProject)

      this.SearchProjects(this.Pro.PD_Id, this.itemsPerPage, pageNo)
    else
      this.GetAllProperties(this.itemsPerPage, pageNo);
  }

  GetAllProject() {
    this.data = this.userService.GetAllProject();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {
      });
  }

  GetAllProperties(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllRevProperties(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.revpropertylist = data.propertyModels;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSearch(s, itemsPerPage: number, pageNo: number, PD_Id: any) {
    this.PRD_Id = PD_Id;
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.searchRevProperties(searchCriteria, searchText, itemsPerPage, pageNo, PD_Id)
        .subscribe(
          (data: any) => {
            this.revpropertylist = data.propertyModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  SearchProjects(project, itemsPerPage: number, pageNo: number) {

    this.isSearchProject = true;
    if (itemsPerPage == null) {
      itemsPerPage = 5;
    }
    if (project == "" || project == null)
      swal("Warning!", "Please Select the Project.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchRevProjectsforId(project, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.revpropertylist = data.propertyModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  changestatus(PR_Id, PR_Status) {

    if (PR_Status == 'Available') {
      PR_Status = 'Blocked'
    } else {
      PR_Status = 'Available'
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.Changestatus(PR_Id, PR_Status)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Success!', 'success');
          this.GetAllProperties(this.itemsPerPage, 1);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  FilePropertyExcel(files: FileList) {
    this.filee = files;
  }
  clear() {
    this.isSearch = false;
    this.s.SearchText = null;
    this.s.SearchCriteria = null;
  }
}