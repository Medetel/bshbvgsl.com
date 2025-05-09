import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-not-alloted-refund-form',
  templateUrl: './not-alloted-refund-form.component.html',
  styleUrls: ['./not-alloted-refund-form.component.css']
})
export class NotAllotedRefundFormComponent implements OnInit {
  title = "Not Allotted Refund";
  title1 = "Not Allotted List";
  notification: any = {};
  project: any = {};
  projectlist;
  notificationlist;
  data: any;
  projectDetails: any = {};
  eligible: any = {};
  applicantlist: any = {};
  refund: any = {};
  applicantpush: any = {};
  mode: any;
  NAR_Id: any;
  fileToUpload: File = null;
  TotalAmount: any;
  UserName: any;
  refundstatus = false;
  NAR_Refund_Id:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    
    this.GetNotifications();
    this.route.params.subscribe(params => {
      this.NAR_Id = params['NAR_Id']
      this.mode = params['mode']
    }

    );

    if (this.NAR_Id != null) {
      this.GetListViewforRefund(this.NAR_Id)
    }
  }

  GetNotifications() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getRefNotifications();
    this.data.subscribe(
      (response: any) => {
        this.notificationlist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetListViewforRefund(NAR_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetListViewforRefund(NAR_Id);
    this.data.subscribe(
      (response: any) => {
        this.refund = response;
        this.GetProjects(this.refund.NAR_Not_Id_Fk)
        this.GetProjectDetailsforRefund(this.refund.NAR_Proj_Id_Fk,'Empty')
        if (this.refund.NAR_Ref_Type == "O_E") {
          this.GeteligibleCancelList(this.refund.NAR_Not_Id_Fk, this.refund.NAR_Proj_Id_Fk, 'Empty')
        }
        else if (this.refund.NAR_Ref_Type == "OF_E") {
          this.Geteligible(this.refund.NAR_Not_Id_Fk, this.refund.NAR_Proj_Id_Fk, 'Empty')
        }
        else { this.GetIneligible(this.refund.NAR_Not_Id_Fk, this.refund.NAR_Proj_Id_Fk,'Empty') }
        // this.StatutoryClerances = response.StatutoryClearancesList;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      }
    );
  }


  GetProjects(DSWOID_NO_Id) {
    if (DSWOID_NO_Id != undefined) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getProjectDetailsForRefund(DSWOID_NO_Id);
      this.data.subscribe(
        (response: any) => {
          this.projectlist = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
    }
    else { swal('warning', 'Notification No. is Required!', 'warning'); }
  }

  GetProjectDetailsforRefund(projectCode, App_No) {
    
    
    if (projectCode == null) {
      projectCode = 0
    }
    if (App_No == null || App_No == '' || App_No == 'undefined') {
      App_No = "Empty"
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProjectDetailsforRefund(projectCode, App_No);
    this.data.subscribe(
      (response: any) => {
        console.log(response);
        this.projectDetails = response;
        // this.StatutoryClerances = response.StatutoryClearancesList;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      }
    );
  }

  Geteligible(Not_Id, Proj_Id, App_No) {
    if (App_No == null) {
      App_No = "Empty"
    }
    if (Not_Id == null) {
      Not_Id = 0
    }
    if (Proj_Id == null) {
      Proj_Id = 0
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.Geteligible(Not_Id, Proj_Id, App_No);
    this.data.subscribe(
      (response: any) => {
        console.log(response);
        this.applicantlist = response;
        for (let i = 0; i < this.applicantlist.refundApplicantModel.length; i++) {
          if (this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request == 1) {
            this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = true;
          }
          else { this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = false; }
        }
        // this.StatutoryClerances = response.StatutoryClearancesList;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      }
    );
  }

  GeteligibleCancelList(Not_Id, Proj_Id, App_No) {
    if (App_No == null) {
      App_No = "Empty"
    }
    if (Not_Id == null) {
      Not_Id = 0
    }
    if (Proj_Id == null) {
      Proj_Id = 0
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GeteligibleCancelList(Not_Id, Proj_Id, App_No);
    this.data.subscribe(
      (response: any) => {
        console.log(response);
        this.applicantlist = response;
        for (let i = 0; i < this.applicantlist.refundApplicantModel.length; i++) {
          if (this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request == 1) {
            this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = true;
          }
          else { this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = false; }
        }
        // this.StatutoryClerances = response.StatutoryClearancesList;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      }
    );
  }

  GetIneligible(Not_Id, Proj_Id,App_No) {
    if (App_No == null) {
      App_No = "Empty"
    }
    if (Not_Id == null) {
      Not_Id = 0
    }
    if (Proj_Id == null) {
      Proj_Id = 0
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetIneligible(Not_Id, Proj_Id,App_No);
    this.data.subscribe(
      (response: any) => {
        console.log(response);
        this.applicantlist = response;
        for (let i = 0; i < this.applicantlist.refundApplicantModel.length; i++) {
          if (this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request == 1) {
            this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = true;
          }
          else { this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = false; }
        }
        // this.StatutoryClerances = response.StatutoryClearancesList;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      }
    );
  }

  onSubmit(NAL: NgForm) {
    
    if (!NAL.invalid) {

      document.getElementById('loader-spinner').style.display = "block";
      // if (Notdetail.value.AN_EMD == null || Notdetail.value.AN_EMD == "" || Notdetail.value.AN_EMD == undefined) { Notdetail.value.AN_EMD = 50000; }
      // NAL.value.AN_Upload = this.getANPDFUrl();
      for (let i = 0; i < this.applicantlist.refundApplicantModel.length; i++) {
        if (this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request == true) {
          this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = 1;
          this.refundstatus = true;
          if (this.applicantlist.refundApplicantModel[i].Amount == null) {
            this.applicantlist.refundApplicantModel[i].Amount = 0;
          }
        }
        else { this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = 0; }
      }

      // for (let j = 0; j < this.applicantlist.refundApplicantModel.length; j++) {
      //   if (this.applicantlist.refundApplicantModel[j].NAAR_Refund_Request == 0) {
      //     this.applicantlist.refundApplicantModel.splice(j, 1);
      //   }
      // }
      if (this.refundstatus == true) {
        NAL.value.NAR_Upload_Doc = this.getNAR_Upload();
        NAL.value.NotAllottedApplicantRefundModel = this.applicantlist.refundApplicantModel;
        this.userService.insertRefunddata(NAL.value)
          .subscribe(
            (data) => {
              this.SaveRefundDetails(NAL.value.NAR_Ref_Type);
              ///swal('', 'Saved Successfully!', 'success');
              // this.router.navigate(['/home/notallotedrefund']);

            }, (error) => {
              document.getElementById('loader-spinner').style.display = "none";
              if (error.status == 401) {
                this.errorHandler.handleError(error);
              }
              else if (error.status == 400) {
                swal('Warning!', error.error.Message, 'warning');
              }
            });
      }
      else {
        swal('warning', 'Please select from refund list!', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
      }
    } else {
      document.getElementById('loader-spinner').style.display = "none";
      swal('warning', 'Please fill all Mandatory Fields!', 'warning');
      // this.formSubmitted = true;
    }
  }

  SaveRefundDetails(NAR_Ref_Type) {
    
    for (let i = 0; i < this.applicantlist.refundApplicantModel.length; i++) {
      if (this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request == true) {
        this.TotalAmount = this.applicantlist.refundApplicantModel[i].Amount.split('.')[0];
        // this.UserName = localStorage.getItem('userName');
        // document.getElementById('loader-spinner').style.display = "block";
        this.userService.CreateRefundRequest(this.applicantlist.refundApplicantModel[i].APP_Id, this.TotalAmount)
          .subscribe(
            (data) => {
              document.getElementById('loader-spinner').style.display = "none";
              if (NAR_Ref_Type == "O_E") {
                this.GeteligibleCancelList(this.refund.NAR_Not_Id_Fk, this.refund.NAR_Proj_Id_Fk, 'Empty')
              }
              else if (NAR_Ref_Type == "OF_E") {
                this.Geteligible(this.refund.NAR_Not_Id_Fk, this.refund.NAR_Proj_Id_Fk, 'Empty')
              }
              else { this.GetIneligible(this.refund.NAR_Not_Id_Fk, this.refund.NAR_Proj_Id_Fk,'Empty') }
              // if (this.applicantlist.refundApplicantModel.length == i) {
              swal('', 'Refund Request Submitted to finance successfully!', 'success');
              this.router.navigate(['/home/notallotedrefund']);
              // }
            }, (error) => {
              document.getElementById('loader-spinner').style.display = "none";
              if (error.status == 401) {
                this.errorHandler.handleError(error);
              }
              else if (error.status == 400) {
                swal('Warning!', error.error.Message, 'warning');
              }
            });
      }
    }
  }

  changeCheckbox(APP_Id: number) {
    // Find the applicant by APP_Id
    for (let i = 0; i < this.applicantlist.refundApplicantModel.length; i++) {
      if (this.applicantlist.refundApplicantModel[i].APP_Id === APP_Id) {
        // Toggle the NAAR_Refund_Request value
        this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request = 
          !this.applicantlist.refundApplicantModel[i].NAAR_Refund_Request;
        break;
      }
    }
  }
  

  NAR_Upload_Doc(file: FileList) {
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
          let i: any = document.getElementById('NAR_Upload_Doc');
          i.value = "";
          if (error.status == 400) {
            // this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('NAR_Upload_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getNAR_Upload() {
    let imagename = null;
    try {
      imagename = document.getElementById('NAR_Upload_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


}
