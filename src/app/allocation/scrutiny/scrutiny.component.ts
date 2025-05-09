import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrutiny',
  templateUrl: './scrutiny.component.html',
  styleUrls: ['./scrutiny.component.css']
})
export class ScrutinyComponent implements OnInit {
  a: any;
  S_Property_Type: any;
  S_CA_Id_FK: any;
  S_ProjectID: any;
  S_NotificationID: any;
  S_Reservation_Id_FK: any;
  Applications: any = {};
  PropertyTypes: any;
  s: any = {};
  PND: any={};
  Projects: any = [];
  Notifications: any = [];
  PD: any;
  Reservations: any;
  Categories: any;
  data: any;
  title = "Scrutiny";
  title1 = "Application Received";
  title2 = "Eligible/InEligible Category List"
  proj_id: any;
  Not_Id: any;
  notify: any;
  projdata: any = [];
  NO_Id: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }




  ngOnInit() {
    this.GetNotifications();
    this.getAllProjectDetailsForScrutiny()
    // this.GetCategory();
    // this.GetReservations();

    // this.GetPropertyTypes();

    this.route.params.subscribe(params => {

      this.s.S_NotificationID = parseInt(params['S_NotificationID']);
      this.s.S_ProjectID = parseInt(params['S_ProjectID']);
      this.s.S_CA_Id_FK = parseInt(params['S_CA_Id_FK']);
      this.s.S_Reservation_Id_FK = parseInt(params['S_Reservation_Id_FK']);
      this.s.S_Property_Type = parseInt(params['S_Property_Type']);
      //  if(this.s.S_NotificationID!=null || typeof this.s.S_NotificationID === "number"){

      //  this.GetProjects(this.s.S_NotificationID);
      //  }
      if (this.s.S_NotificationID != null || this.s.S_ProjectID != null || this.s.S_NotificationID != null || this.s.S_ProjectID != null) {
        this.GETProjectNotificationDetails(this.s.S_NotificationID, this.s.S_ProjectID);
      }
      if (this.s.S_NotificationID != null && this.s.S_ProjectID != null && this.s.S_CA_Id_FK != null && this.s.S_Reservation_Id_FK != null && this.s.S_Property_Type != null) {
        this.GETApplications(this.s.S_NotificationID, this.s.S_ProjectID, this.s.S_CA_Id_FK, this.s.S_Reservation_Id_FK, this.s.S_Property_Type);
      }
    });
    //   this.s.S_NotificationID=  this.a;
    //  this.s.S_CA_Id_FK=  this.S_CA_Id_FK;
    //   this.s.S_Reservation_Id_FK=  this.S_Reservation_Id_FK;
    //   this.GetProjects(this.S_ProjectID);

  }

  // GetPropertyId(Property_Type) {

  // }


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

    if (Notification_Id != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getAllCategoryforScrunity(Notification_Id);
      this.data.subscribe(
      (response: any) => {
      this.Categories = response;
      document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
      document.getElementById('loader-spinner').style.display = "none";
      });
      }
    if (this.proj_id != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllPropertyTypes(this.proj_id);
      this.data.subscribe(
        (response: any) => {
          this.PropertyTypes = response;
          if (this.Not_Id != null && this.proj_id != null)
          this.GETProjectNotificationDetails(this.Not_Id, this.proj_id)
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }

    if (S_ProjectID != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllReservationsforProject(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Reservations = response;
          document.getElementById('loader-spinner').style.display = "none";
          
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    
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


  GETApplications(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, PT_PropertyType) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getApplicationsForScrutiny(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, PT_PropertyType);
    this.data.subscribe(
      (response: any) => {
        this.Applications = response.ApplicationForms;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

}
