import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-auctionnotification',
  templateUrl: './auctionnotification.component.html',
  styleUrls: ['./auctionnotification.component.css']
})
export class auctionnotificationComponent implements OnInit {
  
AuctionNoId:any;
 today:any;
 notificationletter:any={};
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
      debugger;
        this.route.params.subscribe(params => {
        this.AuctionNoId = params['AuctionId'];
      })
      if(this.AuctionNoId!=null)
      this.GetAuctionNotificationDetails(this.AuctionNoId);
  }
  GetAuctionNotificationDetails(AuctionNoId){
    debugger
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAuctionNotificationDetails(AuctionNoId)
      .subscribe(
        (response:any) => {
        this.notificationletter=response;
          for (let i = 0; i < this.notificationletter.PropertiesforAuctionModel.length; i++) {
            this.notificationletter.PropertiesforAuctionModel[i].Sqft= this.notificationletter.PropertiesforAuctionModel[i].PR_Plot_Area * 10.764;
          }
        this.today = new Date();
        console.log(response);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }
  myFunction(){
    window.print();
  }

}