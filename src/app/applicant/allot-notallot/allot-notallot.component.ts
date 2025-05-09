import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allot-notallot',
  templateUrl: './allot-notallot.component.html',
  styleUrls: ['./allot-notallot.component.css']
})
export class AllotNotallotComponent implements OnInit {

  Applicants: any;
  Projects: any;
  Notifications: any;
  data: any;
  title="Application List";
  s:any={};
    proj_id: any;
    notify: any;
    Not_Id: any;
  reservation: any;
  S_ProjectID: any;
  constructor(private userService: UserService,private router :Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.GetNotifications();
    this.getAllProjectDetailsForScrutiny();
    this.GetReservation(this.S_ProjectID)
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
  GetReservation(S_ProjectID) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getReservation(S_ProjectID);
    this.data.subscribe(
    (response: any) => {
    this.reservation = response;
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
  }

  GetApplicantsStatus(DSWOID_NO_Id,PD_Id,RES_Id,Status) {
    
    let a,b,c,d,e,f;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetApplicantsStatus(DSWOID_NO_Id,PD_Id,RES_Id,Status);
    this.data.subscribe(
      (response: any) => {
        this.Applicants= response;
        this.Applicants.forEach(function (value) {
          a=value.ProjectName;
          b=value.RES_Name;
          c=value.DSWOId_NO_Number;
          d=value.DI_District;
          e=value.PD_Scheme;
          f=value.PD_Project_Code;
       });
      //  this.ProjectName=a;
      //  this.ReservationName=b;
      //  this.NotificationNo=c;
      //  this.ProjectPlace=d;
      //  this.ProjectScheme=e;
      //  this.ProjectCode=f;
      //  this.ProvisionalList.APP_AppliedDate = ((this.ProvisionalList.APP_AppliedDate).split('T'))[0];
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
}
