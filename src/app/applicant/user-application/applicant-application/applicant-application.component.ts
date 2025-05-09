import { Component, OnInit } from '@angular/core';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';


@Component({
  selector: 'app-applicant-application',
  templateUrl: './applicant-application.component.html',
  styleUrls: ['./applicant-application.component.css']
})
export class ApplicantApplicationComponent implements OnInit {

  payment: any = {};
  notificationlist;
  s: Search;
  itemsPerPage: number = 50;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata: any;
  title = "Active Notifications List";
  scroll: any = {};

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetAllNotificationList(this.itemsPerPage, 1);
  }

  GetAllNotificationList(itemsPerPage: number, pageNo: number) {

    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllNotificationList(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.notificationlist = data.Notificationlist;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  UpdatePaymentDetails(payment: any) {

    // if (!form.invalid) {
    payment.APP_Challan_Doc = this.getAPPChallanDoc();
    document.getElementById('loader-spinner').style.display = "block";
    // form.value.PD_Feasibility_Report = this.getFeasibilityPDFUrl();
    this.userService.UpdateApplicantDetails(payment)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (data == "Success")
            swal('', 'Your application payment is received by KHB.<br>Confirmation and receipt along with User id and Password will be sent to you on your registered mobile number and email id. <br> Thank You!', 'success');
          else
            swal('Warning!', data, 'warning');

        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Warning!', error.error.Message, 'warning');
        });
  }

  VerifyDetails(scroll: any) {

    document.getElementById('loader-spinner').style.display = "block";
    this.userService.VerifyDetails(scroll)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (data == 'Failed')
            swal('Warning!', 'Verification Failed!', 'warning');
          else
            swal('Success!', 'Verified! Acknowledgement Number: ' + data + ' ' + '<br>Thank You!', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";

        });
  }

  APPChallanDoc(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {

      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('APP_Challan_Doc');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_Challan_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getAPPChallanDoc() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_Challan_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

}