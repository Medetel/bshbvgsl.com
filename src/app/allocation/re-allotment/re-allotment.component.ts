import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { Search } from '../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-re-allotment',
  templateUrl: './re-allotment.component.html',
  styleUrls: ['./re-allotment.component.css']
})
export class ReAllotmentComponent implements OnInit {
  title = "Vacant Properties"
  title1 = "Allotted Properties"
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  currentPageA: number = 1;
  totalItemsA: number;
  itemsPerPageA: number = 5;
  isSearch: boolean;
  s: Search;
  proplist: any;
  Applicantlist: any;
  Excng: any = {};
  fileToUpload: File = null;
  data: any;
  ProjectNameList: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllProjectsName();
    this.GetAllPropertiesforexcng(this.itemsPerPage, 1);
    this.GetApplicantDataforExcng(5, 1)
    
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllPropertiesforexcng(this.itemsPerPage, pageNumber);
  }

  GetAllPropertiesforexcng(itemsPerPage: number, pageNo: number) {
    
    this.s.SearchCriteriap=""
    this.s.SearchTextp=""
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllPropertiesforexcng(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          // document.getElementById('loader-spinner').style.display = "none";
          this.proplist = data.propertyModels;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          // this.GetApplicantDataforExcng(5, 1)
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  // onSearch(s, itemsPerPage: number, pageNo: number) {
  //   
  //   this.isSearch = true;
  //   let searchText = this.s.SearchText;
  //   let searchCriteria = this.s.SearchCriteria;
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {
  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.SearchProjects(searchCriteria, searchText, itemsPerPage, pageNo)
  //       .subscribe(
  //         (data: any) => {
  //           this.proplist = data.propertyModels;
  //           this.totalItems = data.TotalItemsCount;
  //           this.currentPage = pageNo;
  //           document.getElementById('loader-spinner').style.display = "none";
  //         }, (error) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //           //swal('Search Failed.');
  //           this.errorHandler.HandlerError(error);
  //         });
  //   }
  // }

  GetApplicantDataforExcng(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantDataforExcng(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          this.Applicantlist = data.ApplicantModel;
          document.getElementById('loader-spinner').style.display = "none";
          this.totalItemsA = data.TotalItemsCount;
          this.itemsPerPageA = itemsPerPage;
          this.currentPageA = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  SelectAllotProp(PR_Property_No: any, CA_CategoryName: any, PD_Project_Name: any, PR_Id: any, App_No: any) {
    this.Excng.PE_Old_Pr_No = PR_Property_No;
    this.Excng.PD_Project_Name = PD_Project_Name;
    this.Excng.CA_CategoryName = CA_CategoryName;
    this.Excng.OldPropId = PR_Id;
    this.Excng.PE_Reg_No = App_No;
  }

  SelectVacantProp(PR_Prop_FinalCost: any, PT_Property_Type: any, CA_CategoryName: any, PR_Property_No: any, PR_Plot_Area: any, CA_Dimension: any, PR_Id: any) {
    this.Excng.PR_Prop_FinalCost = PR_Prop_FinalCost;
    this.Excng.PT_Property_Type = PT_Property_Type;
    this.Excng.App_CA_CategoryName = CA_CategoryName;
    this.Excng.PE_Excng_Pr_No = PR_Property_No;
    this.Excng.PR_Plot_Area = PR_Plot_Area;
    this.Excng.ExPropId = PR_Id;
  }

  SaveExchange(Excng: any) {
    if (Excng.PE_Excng_date != null && Excng.PE_Old_Pr_No != null && Excng.PE_Excng_Pr_No != null) {
      document.getElementById('loader-spinner').style.display = "block";
      // Excng.
      Excng.PE_Upload_doc = this.getPEUrl();
      this.userService.SaveExchange(Excng)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Property Exchanged Successfully!', 'success');
            // this.router.navigate(['/home/planning']);
            this.Excng = {};
          }, (error) => {
            this.Excng = {};
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
    else {
      swal('', 'Please Fill Mandatory Field!', 'warning');
    }
  }

  PE_Upload_doc(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.FeasibilityPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          // console.log(response);
          // this.app.APP_PA_PhotoErrorMessage="";

        }, (error) => {
          let i: any = document.getElementById('PE_Upload_doc');
          i.value = "";
          if (error.status == 400) {
            // this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PE_Upload_doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getPEUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('PE_Upload_doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchApplicantDataforex(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Applicantlist = data.ApplicantModel;
            document.getElementById('loader-spinner').style.display = "none";
            this.totalItemsA = data.TotalItemsCount;
            this.itemsPerPageA = itemsPerPage;
            this.currentPageA = pageNo;
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }
  GetAllProjectsName() {
    
    document.getElementById('loader-spinner').style.display = "block";
    //this.data = this.userService.getAllProjects();
    this.data = this.userService.getAllProjectsBasedOnRole();
    console.log(this.data);
    this.data.subscribe(
      (response: any) => {
        this.ProjectNameList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }
  onSearchProperty(SearchCriteriap: any, SearchTextp: any, itemsPerPage: number, pageNo: number) {
    
    var searchText = SearchTextp;
    var searchCriteria = SearchCriteriap;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchPropertyforEx(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.proplist = data.propertyModels;
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }
  get(id){

  }
}
