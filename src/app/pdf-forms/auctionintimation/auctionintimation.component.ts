import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-auctionintimation',
  templateUrl: './auctionintimation.component.html',
  styleUrls: ['./auctionintimation.component.css']
})
export class auctionintimationComponent implements OnInit {
  
AuctionNoId:any;
 today:any;
 Intimationletter;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
      debugger;
        this.route.params.subscribe(params => {
        this.AuctionNoId = params['AuctionId'];
      })
      if(this.AuctionNoId!=null)
      this.GetAuctionIntimation(this.AuctionNoId);
  }
  GetAuctionIntimation(AuctionNoId){
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAuctionIntimation(AuctionNoId)
      .subscribe(
        (response:any) => {
        this.Intimationletter=response;
        let percent, amt, total;
        for (let i = 0; i < this.Intimationletter.length; i++) {
          total = this.Intimationletter[i].PR_Plot_Area * 10.764;
          this.Intimationletter[i].bidAmt = total * this.Intimationletter[i].B_Bid_Rate_Per_Sqft;
        }
        this.today = new Date();

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