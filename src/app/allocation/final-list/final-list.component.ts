import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-final-list',
  templateUrl: './final-list.component.html',
  styleUrls: ['./final-list.component.css']
})

export class FinalListComponent implements OnInit {
  PD: any;
  ProjectCode: any;
  ProjectScheme: any;
  ProjectPlace: any;
  NotificationNo: any;
  ReservationName: any;
  ProjectName: any;
  Reservations: any;
  s:any={};
  Projects: any;
  Notifications: any;
  FinalList: any;
  data: Observable<ArrayBuffer>;
  PD_Id: number;
  DSWOID_NO_Id: number;
  title="Final Eligible List";
  constructor(private userService: UserService,private router :Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.GetNotifications();
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

  
  GetFinalLists(DSWOID_NO_Id,PD_Id) { 
    ;
    this.GetProjectDetails(DSWOID_NO_Id,PD_Id);
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllReservationsFinalList(DSWOID_NO_Id,PD_Id);
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
