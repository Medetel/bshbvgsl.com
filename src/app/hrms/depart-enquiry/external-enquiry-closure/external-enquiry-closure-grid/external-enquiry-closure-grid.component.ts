import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-external-enquiry-closure-grid',
  templateUrl: './external-enquiry-closure-grid.component.html',
  styleUrls: ['./external-enquiry-closure-grid.component.css']
})
export class ExternalEnquiryClosureGridComponent implements OnInit {

  title = "View External Enquiry Closure ";
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata: any;
  Examlist: any = {};
  E: any = {};
  EXAMINATION_ID: number;
  data: any;
  EId: any;
  EEN_ID: number;
  e: any = {};
hide:any;
mode:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllExeternalDetails(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllExeternalDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllExeternalDetails(this.itemsPerPage, pageNo);
  }

  GetAllExeternalDetails(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllExeternalEnqEnclosr(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Examlist = data.ExternalEnqModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  Cancel(){

  }
  
  ClosureEnquiryid(Id) {
    this.EId = Id
  }

  SaveClosure(Closure: any) {
    debugger;
    console.log("hi")
    console.log(Closure)
    Closure.EEN_ID = this.EId
    this.data = this.userService.PostClosures(Closure);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'External Enq.Closure Added Successfully .', 'success');
        this.e = {};


        swal('Success!', 'External Enq.Closure Added Successfully .', 'success');
        this.router.navigate(['/home/dept-enquiry/ex-enquiry-closure-grid']);

      })

  }
  //search
  // onSearch(s, itemsPerPage: number, pageNo: number) {

  //   this.isSearch = true;
  //   let searchText = this.s.SearchText.replace(/\s/g, "");
  //   let searchCriteria = this.s.SearchCriteria.replace(/\s/g, "");
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {
  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.SearchExternalenq(searchCriteria, searchText, itemsPerPage, pageNo)
  //       .subscribe(
  //         (data: any) => {
  //           this.Examlist = data.ExternalEnqModel;
  //           this.totalItems = data.TotalItemsCount;
  //           this.currentPage = pageNo;
  //           document.getElementById('loader-spinner').style.display = "none";
  //         }, (error) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //           //swal('Search Failed.');
  //           this.errorHandler.handleError(error);
  //         });
  //   }
  // }

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
      // swal("Warning!", "Please enter the search criteria and search text.", "warning");
    // else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchExternalenq(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Examlist = data.ExternalEnqModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    // }
  }
  imageUpload3(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.IS_UploadPath = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImageenq(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('EEN_Other_UPLOAD');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('EEN_Other_UPLOAD');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getFeasibilityDocBriefFUrl3() {
    let imagename = null;
    try {
      imagename = document.getElementById('EEN_Other_UPLOAD');
      console.log('CourtDoc file');
      console.log(imagename.files[0].name);
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  //om upload
  imageUpload4(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.IS_UploadPath = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImageenq(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('EEN_OM_UPLOAD');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('EEN_OM_UPLOAD');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getFeasibilityDocBriefFUrl4() {
    let imagename = null;
    try {
      imagename = document.getElementById('EEN_OM_UPLOAD');
      console.log('CourtDoc file');
      console.log(imagename.files[0].name);
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  //upload file
  imageUpload1(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.IS_UploadPath = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImageenq(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('EEN_COMP_UPLOAD');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('EEN_COMP_UPLOAD');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getFeasibilityDocBriefFUrl1() {
    let imagename = null;
    try {
      imagename = document.getElementById('EEN_COMP_UPLOAD');
      console.log('CourtDoc file');
      console.log(imagename.files[0].name);
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

}