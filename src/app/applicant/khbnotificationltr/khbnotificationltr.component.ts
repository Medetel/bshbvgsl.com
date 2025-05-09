import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-khbnotificationltr',
  templateUrl: './khbnotificationltr.component.html',
  styleUrls: ['./khbnotificationltr.component.css']
})
export class KhbnotificationltrComponent implements OnInit {

  Reservations: any;
  PrintAllotmentList: any;
  PD_Id: any;
  APP_Id: any;
  notificationDetails:any={};
  today:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.APP_Id = params['APP_Id'];
      this.PD_Id = params['PD_Id'];
    })
    this.GetKhbNotification(this.APP_Id,this.PD_Id);
  }

  myFunction(){
    window.print();
  }
  GetKhbNotification(APP_Id,PD_Id){
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getKhbNotificationLetter(APP_Id,PD_Id)
      .subscribe(
        (response:any) => {
        this.PrintAllotmentList=response;
        this.today = new Date();  
    
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }
}
