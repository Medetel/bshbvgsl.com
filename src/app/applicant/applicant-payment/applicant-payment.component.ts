import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-applicant-payment',
  templateUrl: './applicant-payment.component.html',
  styleUrls: ['./applicant-payment.component.css']
})
export class ApplicantPaymentComponent implements OnInit {

  applicant: any = {};

  PD: any = {};
  APP_Id: any;
  NO_Id: any;
  AFD: any = {};
  title = "Application - View";
  app: any = {};
  data: any;
  fileToUpload: File = null;
  formInvalid: boolean = false;
  PAPhotoimageUrl: string = "assets/images/image-default.png";
  mode: string = "save";
  // PayMode: any;
  LO_Id: any;
  show: string = "Y";
  Notifications: any = [];
  Projects: any = [];
  notify: number;
  Not_Id: any;
  proj_id: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    //this.GetApplicationDetails(0)
    this.GetNotifications();
    this.getAllProjectDetailsForScrutiny()
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

  getAppViewProjectDetails(NO_Id, APP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAppViewProjectDetails(NO_Id, APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.PD = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetApplicationDetails(APP_Id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetApplicationDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (response != null) {
          this.show = "Y";
        }
        if (response != null) {
          this.show = "N";
          this.AFD = response;
          if (this.AFD.APP_IsJoint == 'N')
            this.AFD.APP_IsJoint = 'No';
          else
            this.AFD.APP_IsJoint = 'Yes';
         
        }
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
      this.data = this.userService.getProjectDetailsForScrutiny(Notification_Id);
      this.data.subscribe(
        (response: any) => {
          this.Projects = response;

          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
  }

  AddTotal(Balance_Amt, Id_Amt) {

    let tot = 0;
    tot = parseFloat(Balance_Amt || 0) + parseFloat(Id_Amt || 0);
    this.applicant.Tot_Amt = tot;
  }
  UpdateApplicantPayment(applicant, APP_No) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.UpdateApplicantPayment(applicant, APP_No);
    this.data.subscribe(
      (response) => {
        swal('Success!', 'Payment updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.show = 'Y'
        this.applicant = {};
        //this.router.navigate(['/home/casetype']) ;          
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