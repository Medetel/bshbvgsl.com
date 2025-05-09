import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-order-letter',
  templateUrl: './order-letter.component.html',
  styleUrls: ['./order-letter.component.css']
})
export class OrderLetterComponent implements OnInit {

  PrintOrderList: any;
  ProjectID: any;
  NotificationID: any;
  Type: any;
  notificationDetails: any = {};
  today: any;
  Adhaar:any={};
  AppId: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    debugger;
    this.route.params.subscribe(params => {
      this.AppId=params['AppId'];
      this.NotificationID = params['NotificationID'];
      this.ProjectID = params['ProjectID'];
      this.Type = params['Type'];
    })
    this.GetorderLetter(this.AppId,this.NotificationID, this.ProjectID, this.Type);
  }

  myFunction() {
    window.print();
  }
  GetorderLetter(AppId,NotificationID, ProjectID, Type) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetorderLetter(AppId,NotificationID, ProjectID, Type)
      .subscribe(
        (response: any) => {
          this.PrintOrderList = response;
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

  EsignAdhaar(notificationDetails:any, APP_Id:any) {
    debugger;
    window.open("http://localhost:14080/Esign/OrderCancellation.aspx?AdhaarVerNo=" + APP_Id, "_blank")

    // notificationDetails.AdhaarHolderName=AdhaarHolderName;
    // document.getElementById('loader-spinner').style.display = "block";
    // this.userService.EsignAdhaar(notificationDetails)
    //   .subscribe(
    //     (response: any) => {
    //       this.PrintOrderList = response;
    //       this.today = new Date();
    //       //     this.Response.forEach(function (value, key) {
    //       //       value.Reservations.forEach(function (value1, key1) {
    //       //         value1.AllotedList.forEach(function (value2, key2) {
    //       //       x=value2.AllotmentLetterModel;
    //       //       this.AllotmentLetterModel.push(x);
    //       //     }.bind(this));
    //       //   });
    //       // });

    //       document.getElementById('loader-spinner').style.display = "none";
    //     }, (error) => {
    //       document.getElementById('loader-spinner').style.display = "none";
    //       this.errorHandler.HandlerError(error);
    //     });
  }
}
