import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provisionlist',
  templateUrl: './provisionlist.component.html',
  styleUrls: ['./provisionlist.component.css']
})
export class ProvisionlistComponent implements OnInit {
  PD: any;
  ProjectCode: any;
  ProjectScheme: any;
  ProjectPlace: any;
  NotificationNo: any;
  ReservationName: any;
  ProjectName: any;
  Reservations: any;
  ProvisionalListIneligible: any;
  ProvisionalListEligible: any;
s:any={};
  Projects: any;
  Notifications: any;
  ProvisionalList: any;
  data: any;
  PD_Id: any;
  DSWOID_NO_Id: any;
  title="Provisional Eligible List";
  constructor(private userService: UserService,private router :Router,private route:ActivatedRoute) { }
  ProvisionalListIneligibleCount = 0;
  ProvisionalListEligibleCount = 0;

  ngOnInit() {
    
    this.GetNotifications();
  }

  GetReservations() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getReservations();
    this.data.subscribe(
      (response: any) => {
        this.Reservations = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
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

  GetProjects(DSWOID_NO_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectDetailsForScrutiny(DSWOID_NO_Id);
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  

  GetProvisionalLists(DSWOID_NO_Id,PD_Id) { 
    
    this.GetProjectDetails(DSWOID_NO_Id,PD_Id);
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllReservationsProvisionalList(DSWOID_NO_Id,PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.Reservations= response;
      //  this.ProvisionalList.APP_AppliedDate = ((this.ProvisionalList.APP_AppliedDate).split('T'))[0];
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetProjectDetails(DSWOID_NO_Id,PD_Id){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectNotificationDetails(DSWOID_NO_Id,PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.PD= response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  reloadPage(): void {
    window.location.reload();
    }
}
