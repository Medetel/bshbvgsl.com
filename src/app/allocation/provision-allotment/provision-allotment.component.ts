import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Search } from '../../shared/user.model';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-provision-allotment',
  templateUrl: './provision-allotment.component.html',
  styleUrls: ['./provision-allotment.component.css']
})
export class ProvisionAllotmentComponent implements OnInit {
  Obj_Id: any;
  AFD: any = {};
  u: any = {};
  PND: any = {};
  Projects: any;
  Notifications: any;
  data: any;
  title = "Update objection"
  title1 = "Eligible/InEligible Category List"
  ap: any;
  fileToUpload: File = null;
  UO_UploadimageUrl1: string = "assets/images/image-default.png";
  formInvalid: boolean = false;
  ApplicationList;
  showMod:any=true;
  formSubmitted: boolean;
  Verified: any;
  s: Search;
  isSearch: boolean;
  object: any;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  proj_id: any;
  Not_Id: any;
  notify: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
    this.s = new Search();
    this.isSearch = false;
  }


  ngOnInit() {
    this.GetNotifications();
    this.getAllProjectDetailsForScrutiny()
    this.u.O_Verified = 'Y';
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.SearchApplicants(this.s.SearchText, this.itemsPerPage, pageNumber);
    // else if (this.isSearchProject)
    //   this.SearchProjects(this.Pro.PD_Id, this.itemsPerPage, pageNumber)
    else
      this.GETApplicationsList(this.u.S_NotificationID, this.u.S_ProjectID, this.itemsPerPage, pageNumber);
  }

  SearchApplicants(SearchText, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    let searchText = this.s.SearchText;

    if (searchText == "" || searchText == null)
      swal("Warning!", "Please enter the search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchApplicants(searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.ApplicationList = data.ApplicationForms;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            // this.GETApplicationsList(DSWOID_NO_Id,PD_Id,itemsPerPage, this.currentPage);
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

  GetNotifications() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getNotifications();
    this.data.subscribe(
      (response: any) => {
        this.Notifications = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  getAllProjectDetailsForScrutiny() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProjectDetailsForScrutiny();
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  GetNotificationProjects(Notification_Id, S_ProjectID) {

    if (S_ProjectID != null) {
      this.proj_id = S_ProjectID;
      if (this.notify == null)
        this.notify = 2;
    }

    if (Notification_Id != null) {
      this.Not_Id = Notification_Id;
      if (this.notify == null)
        this.notify = 1;
    }

    if(this.notify==1 && Notification_Id != null){
      this.proj_id =null;
    }
    if(this.notify==2 && S_ProjectID != null){
      this.Not_Id =null;
    }

    if (Notification_Id == null && this.notify == 2) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getNotificationDetailsForScrutiny(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Notifications = response;

          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }

    else if (S_ProjectID == null && this.notify == 1) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getProjectDetailsForScrutiny(Notification_Id);
      this.data.subscribe(
        (response: any) => {
          this.Projects = response;
          
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    if (this.Not_Id != null && this.proj_id != null)
          this.GETProjectNotificationDetails(this.Not_Id, this.proj_id)
  }


  GETProjectNotificationDetails(DSWOID_NO_Id, PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectNotificationDetails(DSWOID_NO_Id, PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.PND = response;
        if (this.PND.DSWOId_NO_Date != null) {
          const dateObj = new Date(this.PND.DSWOId_NO_Date);
          this.PND.DSWOId_NO_Date = `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
        }
        
        if (this.PND.DSWOId_NO_LastDate != null) {
          const lastDateObj = new Date(this.PND.DSWOId_NO_LastDate);
          this.PND.DSWOId_NO_LastDate = `${('0' + lastDateObj.getDate()).slice(-2)}/${('0' + (lastDateObj.getMonth() + 1)).slice(-2)}/${lastDateObj.getFullYear()}`;
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetApplicationFormDetails(APP_No: any) {
    this.showMod=true;
    this.u.UO_Remarks = "";
    this.showMod = true;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getApplicationDetailsForUpdateObjection(APP_No);
    this.data.subscribe(
      (response: any) => {
        if (response != null) {
          this.AFD = response;
          this.u.APP_No = APP_No;
          this.u.UO_Verified = this.AFD.APP_IsEligible;
          if (response.APP_IsEligible == 'Y')
            this.AFD.APP_IsEligible = 'Eligible';
          else if (response.APP_IsEligible == 'N')
            this.AFD.APP_IsEligible = 'InEligible';
          else
            this.AFD.APP_IsEligible = 'Scrutiny Pending';
        }
        else
          swal('Warning!', "Application no does not exist", 'warning');
        this.showModal();
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  closeModals() {
    this.showMod = false;
  }
  showModal() {
    
    this.showMod = true;
  }


  GETApplicationsList(DSWOID_NO_Id, PD_Id, itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    this.s.SearchText = undefined;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GETApplicationsList(DSWOID_NO_Id, PD_Id, itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.ApplicationList = response.ApplicationForms;
        this.totalItems = response.TotalItemsCount;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }



  FileUpload1(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.u.UO_UploadimageUrl1ErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('UO_Upload1');
          i.value = "";
          if (error.status == 400) {
            this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('UO_Upload1');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getFileUpload1() {
    let imagename = null;
    try {
      imagename = document.getElementById('UO_Upload1');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  getFileUpload2() {
    let imagename = null;
    try {
      imagename = document.getElementById('UO_Upload2');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  getFileUpload3() {
    let imagename = null;
    try {
      imagename = document.getElementById('UO_Upload3');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  getFileUpload4() {
    let imagename = null;
    try {
      imagename = document.getElementById('UO_Upload4');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  FileUpload2(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.u.UO_UploadimageUrl2ErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('UO_Upload2');
          i.value = "";
          if (error.status == 400) {
            //   this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('UO_Upload2');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  FileUpload3(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.u.UO_UploadimageUrl3ErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('UO_Upload3');
          i.value = "";
          if (error.status == 400) {
            //   this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('UO_Upload3');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  FileUpload4(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.u.UO_UploadimageUrl4ErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('UO_Upload4');
          i.value = "";
          if (error.status == 400) {
            //   this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('UO_Upload4');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  SaveObjection(APP_Id, Objection: NgForm) {
    
    if (!Objection.invalid) {
      if (this.u.UO_Verified == null || this.u.UO_Verified == undefined || typeof (this.u.UO_Verified) == undefined) {
        swal('', 'Please select Eligible or InEligible!');
        // this.Verified="Please select";
      }
      this.formInvalid = false;
      document.getElementById('loader-spinner').style.display = "block";
      Objection.value.UO_Upload1 = this.getFileUpload1();
      Objection.value.UO_Upload2 = this.getFileUpload2();
      Objection.value.UO_Upload3 = this.getFileUpload3();
      Objection.value.UO_Upload4 = this.getFileUpload4();
      //   br.value.SR_Pincode=this.s.SR_Pincode;
      this.data = this.userService.saveObjection(APP_Id, Objection.value);
      this.data.subscribe(
        (response) => {
          
          //this.Obj_Id=response;
          Objection.reset();
          Objection.resetForm();
          this.formInvalid = false;
          swal('Success!', 'Application No-' + APP_Id + ' has been updated successfully.', 'success');
          this.AFD = {};
          this.GETApplicationsList(this.u.S_NotificationID, this.u.S_ProjectID, this.itemsPerPage, 1)
          //this.router.navigate(['home/provision-allotment]');
          // swal1('Success!', 'Application APP-No' +response +'details has been saved successfully.', 'success','route');
          document.getElementById('loader-spinner').style.display = "none";
          this.showMod = false;
          

          //this.router.navigate(['home/applicant/applicantview/',this.APP_Id]);
          // window.location.href(='home/applicantview/';
        }, (error) => {
          console.log(error);
          document.getElementById('loader-spinner').style.display = "none";
        });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  closeModal(){
    
  }

}
