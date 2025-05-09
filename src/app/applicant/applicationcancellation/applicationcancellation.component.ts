import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-applicationcancellation',
  templateUrl: './applicationcancellation.component.html',
  styleUrls: ['./applicationcancellation.component.css']
})
export class ApplicationcancellationComponent implements OnInit {
  APP_Id: any;
  APP_Status: any;
  title = "Application Cancellation";
  AppData: any = {};
  Cancel: any = {};
  fileToUpload: File = null;
  formSubmitted: boolean;
  UserName: any;
  ParamObj: any = {};
  flag: number = 0;
  PR_Id: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }

  ngOnInit() {

    this.PR_Id = localStorage.getItem('Prop_Id');
    localStorage.removeItem('Prop_Id');
    this.route.params.subscribe(params => {
      this.APP_Id = params['APP_Id']
      this.APP_Status = params['APP_Status']
    }
    );
    this.APP_Status = ((this.APP_Status).split('('))[0];
    if (this.APP_Id != null && this.APP_Status != 'Allotted')
      this.GetApplicantDetailsforCancel(this.APP_Id);
    else {
      this.GetApplicantDetailsforPostAllotCancel(this.APP_Id);
    }

  }

  GetApplicantDetailsforCancel(APP_Id: any) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantDetailsforCancel(APP_Id)
      .subscribe(
        (data: any) => {
          this.AppData = data;
          if (this.AppData.APP_IsJoint == 'N')
            this.AppData.APP_IsJoint = 'No';
          else
            this.AppData.APP_IsJoint = 'Yes';
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetApplicantDetailsforPostAllotCancel(APP_Id: any) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantDetailsforPostAllotCancel(APP_Id)
      .subscribe(
        (data: any) => {
          this.AppData = data;
          if (this.AppData.APP_IsJoint == 'N')
            this.AppData.APP_IsJoint = 'No';
          else
            this.AppData.APP_IsJoint = 'Yes';
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  CancelFileInput(file: FileList) {
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

        }, (error) => {
          let i: any = document.getElementById('CR_Doc_File');
          i.value = "";
          if (error.status == 400) {
            // this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('CR_Doc_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getCancelPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('CR_Doc_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  onSubmit(form: NgForm, APP_No: any, Amount: any, APP_Status: any) {
    if (this.APP_Status == 'EXCNG') {
      this.PostCancellation(form, APP_No, Amount)
      return true;
    }
    if (!form.invalid) {
      document.getElementById('loader-spinner').style.display = "block";
      form.value.PAC_Doc = this.getPAC_Doc();
      // this.UserName = localStorage.getItem('userName');
      this.userService.CreateCancelRequest(form.value, APP_No, Amount, APP_Status)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Refund Request Submitted to BSHB Successfully!', 'success');
            this.router.navigate(['/home/appstatus']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            if (error.status == 400) {
              swal('Warning!', error.error.Message, 'warning');
            } else if (error.status == 401) {
              this.errorHandler.handleError(error);
            }
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }
  PostCancellation(form: NgForm, APP_No: any, Amount: any) {
    debugger;
    if (!form.invalid) {
      if (Amount == null) { Amount = 0; }
      if (APP_No != null && this.flag == 0) {
        this.flag = 1;
      }
      else {
        swal('', 'Already Submitted!', 'warning');
        return false;
      }
      if (Amount == null) { Amount = 0; }
      document.getElementById('loader-spinner').style.display = "block";
      form.value.PAC_Doc = this.getPAC_Doc();
      form.value.PAC_Pr_id_fk=this.PR_Id;
      // this.UserName = localStorage.getItem('userName');
      this.userService.PostCancellation(form.value, APP_No, Amount)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Cancelltion request Submitted to BSHB Successfully!', 'success');
            this.router.navigate(['/home/appstatus']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            if (error.status == 400) {
              swal('Warning!', error.error.Message, 'warning');
            } else if (error.status == 401) {
              this.errorHandler.handleError(error);
            }
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  PAC_Docment(file: FileList) {
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
          
        }, (error) => {
          let i: any = document.getElementById('PAC_Doc');
          i.value = "";
          if (error.status == 400) {
            //   this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PAC_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }


  getPAC_Doc() {
    let imagename = null;
    try {
      imagename = document.getElementById('PAC_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}
