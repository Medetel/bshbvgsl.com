import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-propertiesregister-list',
  templateUrl: './propertiesregister-list.component.html',
  styleUrls: ['./propertiesregister-list.component.css']
})
export class PropertiesregisterListComponent implements OnInit {

  filee: any;
  data: any;
  projectlist: any;
  propertylist;
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
  Proj_ID: any;
  @ViewChild('iPR_Excel') myInputVariable: ElementRef;
  PRD_Id: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
    this.isSearchProject = false;

  }

  ngOnInit() {
    // this.GetAllProperties(this.itemsPerPage, 1);
    this.GetAllProject();
    this.GetAllProperties(this.itemsPerPage, 1)

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
    this.userService.GetAllProperties(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.propertylist = data.propertyModels;
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
      this.userService.searchProperties(searchCriteria, searchText, itemsPerPage, pageNo, PD_Id)
        .subscribe(
          (data: any) => {
            this.propertylist = data.propertyModels;
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
    if (project == "" || project == null)
      swal("Warning!", "Please Select the Project.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchProjectsforId(project, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.propertylist = data.propertyModels;
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

  UploadPropertyExcel() {
    document.getElementById("Property_Excel").nodeValue = "";
    if (this.EXProj.PD_Id == null || this.EXProj.PD_Id == undefined || typeof (this.EXProj.PD_Id) == undefined) {
      swal('', 'Please select Project!');
    }
    else {
      this.Proj_ID = this.EXProj.PD_Id;
      this.EXProj.PD_Id = undefined;
      let file = this.filee;
      let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;

      let s: any = file.item(0).size / 1024;
      let size: any = parseFloat(s).toFixed(2);
      let uploadedFilename = file.item(0).name;
      if (uploadedFilename.match(regex) && (size <= 5048)) {
        this.fileToUpload = file.item(0);
        var reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        const data = new FormData();
        data.append("UploadedImage", file.item(0));
        let x = this.userService.uploadExcel(data, this.Proj_ID);
        document.getElementById('loader-spinner').style.display = "block";
        x.subscribe(
          (response) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Uploaded Successfully!', 'success');
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            let i: any = document.getElementById('Property_Excel');
            i.value = "";
            if (error.status == 400) {
              document.getElementById('loader-spinner').style.display = "none";
              swal('Warning!', error.error.Message, 'warning');
            }
          });
      }
      else {
        let i: any = document.getElementById('Property_Excel');
        i.value = "";
        if (!uploadedFilename.match(regex))
          swal('Warning!', "Please upload CSV file with extension .csv", 'warning');
        else if (size > 2048)
          swal('Warning!', "Please upload image file less than 2mb", 'warning');
      }
    }
  }

  reset() {
    this.myInputVariable.nativeElement.value = '';
  }
}
