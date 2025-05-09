import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-khbnotification',
  templateUrl: './khbnotification.component.html',
  styleUrls: ['./khbnotification.component.css']
})
export class KhbnotificationComponent implements OnInit {

  Reservations: any;
  PrintAllotmentList: any = {};
  ProjectID: any;
  NotificationID: any;
  CaTName:any;
  notificationDetails:any={};
  today:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.NotificationID = params['NotificationID'];
      this.ProjectID = params['ProjectID'];
      this.CaTName = params['CaTName'];
    })
    this.GetKhbNotification(this.NotificationID,this.ProjectID,this.CaTName);
  }

  myFunction(){
    window.print();
  }
  GetKhbNotification(NotificationID,ProjectID,CaTName){
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getKhbNotification(NotificationID,ProjectID,CaTName)
      .subscribe(
        (response:any) => {
        this.PrintAllotmentList=response;
        this.today = new Date();
    //     this.Response.forEach(function (value, key) {
    //       value.Reservations.forEach(function (value1, key1) {
    //         value1.AllotedList.forEach(function (value2, key2) {
    //       x=value2.AllotmentLetterModel;
    //       this.AllotmentLetterModel.push(x);
    //     }.bind(this));
    //   });
    // });
    
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }
}
