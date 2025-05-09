import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicationlist',
  templateUrl: './applicationlist.component.html',
  styleUrls: ['./applicationlist.component.css']
})
export class ApplicationlistComponent implements OnInit {

  Applicants: any;
  Projects: any;
  Notifications: any;
  data: any;
  title="Application List";
  s:any={};
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


  GetApplicants(DSWOID_NO_Id,PD_Id) {
   
    let a,b,c,d,e,f;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getApplicants(DSWOID_NO_Id,PD_Id);
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
  reloadPage(): void {
    window.location.reload();
    }
}
