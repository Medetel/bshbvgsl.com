import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { ActivatedRoute,Router } from "@angular/router";
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-view-auctioned-properties',
  templateUrl: './view-auctioned-properties.component.html',
  styleUrls: ['./view-auctioned-properties.component.css']
})
export class ViewAuctionedPpropertiesComponent implements OnInit {
  private sub: any;
  Bidder:any={};
  Bidderdetails1:any;
  BidderDet:any={};
  PropertyDet:any={};
  BaseTotal: number;
  BidTotal: number;

  B_mode: string;
  area: any;
  DSWOIDNotification: any;
  data: any;
  title = "Demand Survey with ID";
  title1 = "Demand Survey without ID";
  title2 = "Separate notification for DQ";
  title3 = "Allotment Notifiaction";
  title4 = "Notification for auction";
  title5 = "CA Site";
  title7 = "Notification for Lottery";
  title8 = "Notification for Lottery Schedule";

  numericpattern = "[0-9.]*";
  phoneno = "[0-9]*";
  auctionForm = false;
  ViewBiddersForm = false;
  UpdateBidderForm = false;
  auctionGrid = true;
  selectProperty = false;
  minBid = false;
  Auction: any = {};
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  notificationlist;
  auctionnot: any = {};
  auctionproperties;
  selectpropertieslist;
  search: any = {};
  price: any;
  properties;
  auctionapproval = false;
  AuctionCD: any = {};
  CDDetails: any = [];
  cd: any = {};
  formSubmitted: boolean;
  fileToUpload: File = null;
  gridview: any;
  auctionbidders;
  bidder: any = {};
  Bidderdetails;
  show = false;
  projectlist;
  totalprop: any = {};
  prices: any = {};
  userRole: any;
  bidstatus: number;
  R: any = {};
  AN_Id: number;
  Status: string;
  formInvalid: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, public router:Router,private userService: UserService, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');

     this.sub = this.activatedRoute.params.subscribe(params => {    
      //console.log("PR id :" +params['PR_Id']);       
      this.getAllotedPropertyDetail(params['PR_Id']); 
     });
 
  }
       
    getAllotedPropertyDetail(PR_Id:any) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllotedPropertyDetailById(PR_Id)
      .subscribe(
        (data: any) => {          
          document.getElementById('loader-spinner').style.display = "none";
          //console.log("data : " +JSON.stringify(data))
          this.PropertyDet = data;         
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  
  CancelProperty(CP: NgForm) {    
    
    //console.log(JSON.stringify(cancelData));
    if(CP.value.Cancel_Remarks=="" || CP.value.Cancel_Remarks==null)
    {
       //alert ('Please enter remarks for the cancelling the property.')
       //return;
       swal('warning!', 'Please enter the remarks for the cancelling the property.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
    }   
    var cancelData={
      PR_Id:this.PropertyDet.PR_Id,
      EMD_Amt:this.PropertyDet.B_EMD_Amt,
      Forfeited_Amt:this.PropertyDet.Forfeited_Amt,
      Refund_Amt:this.PropertyDet.Refund_Amt,
      Cancel_Remarks:CP.value.Cancel_Remarks
    }      
    
    swal({
      title: 'Are you sure?', text: "You want to Cancel! Once cancelled, the property status will change to Stray.", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.value) {
        this.CancelAllotedProperty(cancelData);
      }
    })      
    
    
  }


    CancelAllotedProperty(cancelData) {    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.CancelAllotedProperties(cancelData)
      .subscribe(
        (data) => {        
          document.getElementById('loader-spinner').style.display = "none";        
          swal('Success!', ' Property cancelled successfully.', 'success').then((result) => {
            if (result.value) {           
              this.router.navigate(['/home/auctionedpropertiescancel']);
            }
          })

         
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";        
          this.errorHandler.handleError(error);
        });
  }


}
