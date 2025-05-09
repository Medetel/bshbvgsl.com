import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-lottery-report',
  templateUrl: './lottery-report.component.html',
  styleUrls: ['./lottery-report.component.css']
})
export class LotteryReportComponent implements OnInit {
  title = "Lottery Report";
  s: any = {};
  data: any;
  Projects: any = [];
  Notifications: any = [];
  proj_id: any;
  Not_Id: any;
  notify: any;
  Applications: any;
  SmsApplicantList: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
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

  GetLotteryApplications(DSWOID_NO_Id, PD_Id, LotDate) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetLotteryApplications(DSWOID_NO_Id, PD_Id, LotDate);
    this.data.subscribe(
      (response: any) => {
        this.Applications = response;
        // for (let j = 0; j < this.Applications.length; j++) {
        //   for (let k = 0; k < this.Applications[j].AllottedReservationModel.length; k++) {
        //     for (let i = 0; i < this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels.length; i++) {
        //       this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i].SMS = false;
        //     }
        //   }
        // }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  changeCheckbox(indj, indk, indi) {
    
    for (let j = 0; j < this.Applications.length; j++) {
      if (j == indj) {
        for (let k = 0; k < this.Applications[j].AllottedReservationModel.length; k++) {
          if (k == indk) {

            for (let i = 0; i < this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels.length; i++) {
              if (i == indi) {
                if (this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i].SMS == "false") {
                  this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i].SMS = "true";
                  this.SmsApplicantList.push(this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i]);
                  break;
                }
                else {
                  this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i].SMS = "false";
                  for (let m = 0; m < this.SmsApplicantList.length; m++) {
                    if (this.SmsApplicantList[m].APP_No==this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i].APP_No) { 
                      this.SmsApplicantList[m].SMS="false";
                    }
                  }
                  // this.SmsApplicantList.splice(this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i]);
                  break;
                }

              }
            }
          }
        }
      }
    }
  }

  SendElotterySms() {
    
    // for (let j = 0; j < this.Applications.length; j++) {
    //   for (let k = 0; k < this.Applications[j].AllottedReservationModel.length; k++) {
    //     for (let i = 0; i < this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels.length; i++) {
    //       if (this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i].SMS == true) {
    //         this.SmsApplicantList.push(this.Applications[j].AllottedReservationModel[k].AllottedApplicantLotteryModels[i]);
    //       }
    //     }
    //   }
    // }

    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SendElotterySms(this.SmsApplicantList)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          // swal('', "Elottery Allotment Finalized Successfully!", 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  myFunction() {
    window.print();
  }

}
