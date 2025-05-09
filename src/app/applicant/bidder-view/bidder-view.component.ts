import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-bidder-view',
  templateUrl: './bidder-view.component.html',
  styleUrls: ['./bidder-view.component.css']
})
export class BidderViewComponent implements OnInit {

  Bidder: any = {};
  Bidderdetails: any;
  BidderDet: any = {};
  BaseTotal: number;
  BidTotal: number;

  constructor(private userService: UserService, private errorHandler: ErrorHandler) { }

  ngOnInit() {
  }

  clear() {
    this.Bidderdetails = []
    this.BidderDet = {}
    this.BaseTotal = null
    this.BidTotal = null
  }

  Getbidderdetails(biddder: any) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.Getbidderdetails(biddder.Biddercriteria, biddder.Biddersearch)
      .subscribe(
        (data: any) => {

          document.getElementById('loader-spinner').style.display = "none";
          this.Bidderdetails = data;         
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  Getbidderdetailsbyid(B_id: any) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.Getbidderdetailsbyid(B_id)
      .subscribe(
        (data: any) => {

          document.getElementById('loader-spinner').style.display = "none";
          this.BidderDet = data;
          this.getTotalBase(this.BidderDet.B_Base_Price, this.BidderDet.PR_Plot_Area);
          this.getTotalBid(this.BidderDet.B_Bid_Rate_Per_Sqft, this.BidderDet.PR_Plot_Area);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  getTotalBase(B_Base_Price: any, PR_Plot_Area: any) {
    let BaseTotal = (PR_Plot_Area * 10.764) * B_Base_Price;
    this.BaseTotal = +BaseTotal.toFixed(2);
  }

  getTotalBid(B_Bid_Rate_Per_Sqft, PR_Plot_Area) {
    let BidTotal = (PR_Plot_Area * 10.764) * B_Bid_Rate_Per_Sqft;
    this.BidTotal = +BidTotal.toFixed(2);
  }

}