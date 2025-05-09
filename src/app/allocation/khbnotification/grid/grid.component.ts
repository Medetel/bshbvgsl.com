import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

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

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }

  ngOnInit() {
    
    this.userRole = localStorage.getItem('userRole');
    
    this.GetDSWOIDNotification();
  }


  pageChanged(pageNumber: number) {
    this.GetAllNotifications(this.itemsPerPage, pageNumber);
  }

  GetAllProject() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllProjectforAuction();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetDSWOIDNotification() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getDSWOIDNotification();
    this.data.subscribe(
      (response: any) => {
        this.DSWOIDNotification = response;
        this.GetAllNotifications(this.itemsPerPage, 1);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetAllNotifications(itemsPerPage: number, pageNo: number) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllNotifications(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.notificationlist = data.AuctionNotificationModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }



  Showauctionform() {
    if (this.auctionForm == false) {
      this.auctionForm = true;
      this.title4 = "Add Auction";
      this.auctionGrid = false;
      this.formSubmitted = false;
      this.Auction = {};
      this.AuctionCD = {};
      this.CDDetails = [];
      this.Auction.AN_EMD = 50000;
      this.GetAllProject()
    }
  }



  Showauctiongrid() {
    if (this.auctionGrid == false) {
      this.auctionGrid = true;
      this.title4 = "Notification for auction";
      this.GetAllNotifications(10, 1);
      this.auctionForm = false;
      this.UpdateBidderForm = false;
      this.ViewBiddersForm = false;
      this.selectProperty = false;
      this.minBid = false;
      this.auctionapproval = false
    }
  }


 
  ShowUpdateBidder(AN_Id) {
    if (this.UpdateBidderForm == false) {
      this.UpdateBidderForm = true;
      this.title4 = "Proceedings of Auction";
      this.auctionGrid = false;
      this.GetPropertiesforAuction(AN_Id);
      this.formSubmitted = false;
    }
  }

  ShowViewBidder(AN_Id) {
    if (this.ViewBiddersForm == false) {
      this.ViewBiddersForm = true;
      this.title4 = "Intimation Letter";
      this.auctionGrid = false;
      this.GetBiddersforIntimation(AN_Id);
    }
  }


  ShowSelectProperty(AN_Id) {
    if (this.selectProperty == false) {
      this.selectProperty = true;
      this.title4 = "Select Properties";
      this.auctionGrid = false;
      this.GetPropertiesforAuction(AN_Id);
    }
  }

  ShowAuctionApproval(AN_Id) {
    if (this.auctionapproval == false) {
      this.auctionapproval = true;
      this.title4 = "Auction Approval";
      this.auctionGrid = false;
      this.GetBidderforApproval(AN_Id);
    }
  }

  GetPropertiesforAuction(AN_Id) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetPropertiesforAuction(AN_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.auctionnot = data;
          this.auctionproperties = data.PropertiesforAuctionModel;
          let percent, amt, total, totalplinth;
          for (let i = 0; i < this.auctionproperties.length; i++) {
            total = this.auctionproperties[i].PR_Plot_Area * 10.764;
            this.auctionproperties[i].baseAmt = total * this.auctionproperties[i].Price;
          }
          for (let i = 0; i < this.auctionproperties.length; i++) {
            totalplinth = this.auctionproperties[i].PR_Plot_Area * 10.764;
            this.auctionproperties[i].AreaSqft = totalplinth;
          }
          this.B_mode = "";
          for (let i = 0; i < this.auctionproperties.length; i++) {
            if (this.auctionproperties[i].Price == null)
              this.B_mode = "save";
          }
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetBidderforApproval(AN_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetBidderforApproval(AN_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.auctionnot = data;
          this.auctionbidders = data.PropertiesforApprovalModel;
          let percent, amt, total;

          // for (let i = 0; i < this.auctionproperties.length; i++) {
          //   total = this.auctionproperties[i].PR_Plot_Area * 10.764;
          //   this.auctionproperties[i].baseAmt = total * this.auctionproperties[i].Price;
          // }

          for (let i = 0; i < this.auctionbidders.length; i++) {
            this.auctionbidders[i].percent = 0;
            amt = this.auctionbidders[i].B_Bid_Rate_Per_Sqft - this.auctionbidders[i].PR_Base_Price;
            total = amt / this.auctionbidders[i].PR_Base_Price;
            this.auctionbidders[i].percent = total * 100;
          }

          // for (let i = 0; i < this.auctionbidders.length; i++) {
          //   total = this.auctionbidders[i].PR_Plot_Area * 10.764;
          //   this.auctionbidders[i].baseAmt = total * this.auctionbidders[i].PR_Base_Price;
          // }
          // for (let i = 0; i < this.auctionbidders.length; i++) {
          //   total = this.auctionbidders[i].PR_Plot_Area * 10.764;
          //   this.auctionbidders[i].bidAmt = total * this.auctionbidders[i].B_Bid_Rate_Per_Sqft;
          // }

        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetBiddersforIntimation(AN_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetBiddersforIntimation(AN_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.auctionnot = data;
          this.Bidderdetails = data.PropertiesforBidderModel;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetPropertiesforSelect(AN_Id) {
    this.search = {};
    this.GetPropertiescountforSelect(AN_Id);
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetPropertiesforSelect(AN_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.selectpropertieslist = data;
          for (let i = 0; i < this.selectpropertieslist.length; i++) {
            if (this.selectpropertieslist[i].PR_AuctionProperty == 1) {
              this.selectpropertieslist[i].disab = "dis";
            }
          }
          for (let i = 0; i < this.selectpropertieslist.length; i++) {
            if (this.selectpropertieslist[i].PR_AuctionProperty == 1) {
              this.selectpropertieslist[i].PR_AuctionProperty = true;
            }
            else { this.selectpropertieslist[i].PR_AuctionProperty = false; }
          }
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetPropertiescountforSelect(AN_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetPropertiescountforSelect(AN_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.totalprop = data;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  SavePropertiesforAuction(selectpropertieslist, AN_Id) {
    for (let i = 0; i < this.selectpropertieslist.length; i++) {
      if (this.selectpropertieslist[i].PR_AuctionProperty == false) {
        this.selectpropertieslist[i].PR_AuctionProperty = 0;
      }
      else { this.selectpropertieslist[i].PR_AuctionProperty = 1; }
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SavePropertiesforAuction(selectpropertieslist, AN_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Saved Successfully!', 'success');
          this.GetPropertiesforAuction(AN_Id);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  ShowMin(AN_Id) {
    if (this.minBid == false) {
      this.minBid = true;
      this.title4 = "Update Base Price";
      this.auctionGrid = false;
      this.GetPropertiesforAuction(AN_Id);
    }
  }

  SearchProperties(SearchCriteria, SearchText,AN_Id) {
    
    if (SearchText == "" || SearchText == null || SearchCriteria == "" || SearchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchProperties(SearchCriteria, SearchText,AN_Id)
        .subscribe(
          (data: any) => {
            this.selectpropertieslist = data;

            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  SaveBasePrice(auctionproperties, AN_Id) {
    
    let baseprice = 0;

    for (let i = 0; i < this.auctionproperties.length; i++) {
      if (this.auctionproperties[i].PR_Base_Price != null) {
        baseprice = 1;
      }
      if (this.auctionproperties[i].PR_Base_Price == "") {
        baseprice = 0;
      }
    }
    if (baseprice == 1) {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SaveBasePriceforProperties(auctionproperties)
        .subscribe(
          (data: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Saved Successfully!', 'success');
            this.GetPropertiesforAuction(AN_Id);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
    else {
      swal('warning', 'Please Enter Base Price!', 'warning');
    }
  }

  Deleteproperty(PR_Id, Price, AN_Id) {
    if (PR_Id != null) {
      swal({
        title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          document.getElementById('loader-spinner').style.display = "block";
          this.userService.Deleteproperty(PR_Id)
            .subscribe(
              (data) => {
                document.getElementById('loader-spinner').style.display = "none";
                swal('', 'Deleted Successfully!', 'success');
                this.GetPropertiesforAuction(AN_Id);
              }, (error) => {
                document.getElementById('loader-spinner').style.display = "none";
                this.errorHandler.handleError(error);
              });
        }
      })
    }

  }
  changeCheckbox(PR_Id, PR_AuctionProperty) {
    for (let i = 0; i < this.selectpropertieslist.length; i++) {
      if (this.selectpropertieslist[i].PR_Id == PR_Id) {
        if (this.selectpropertieslist[i].PR_AuctionProperty == false) {
          this.selectpropertieslist[i].PR_AuctionProperty = true;
          break;
        }
        else { this.selectpropertieslist[i].PR_AuctionProperty = false; }
        break;
      }
    }
  }

  AddPublishDetails(cd) {
    let bool = 0;
    if (cd.ANC_Website == "" || cd.ANC_ContactNo == "") { bool = 1 }
    if ((cd.ANC_Website != null || cd.ANC_ContactNo != null || cd.ANC_Website != undefined || cd.ANC_ContactNo != undefined) && bool != 1) {
      let CDTemp = {
        ANC_Website: cd.ANC_Website,
        ANC_ContactNo: cd.ANC_ContactNo,
        ANC_ExtensionNo: cd.ANC_ExtensionNo
      }
      this.CDDetails.push(CDTemp);
      this.cd = {};
      this.AuctionCD.ANC_Website = "";
      this.AuctionCD.ANC_ContactNo = "";
      this.AuctionCD.ANC_ExtensionNo = "";
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
      // this.formSubmitted = true;
    }
  }

  DeletePublishDetails(pos) {
    
    if (pos != null) {
      swal({
        title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.CDDetails.splice(pos, 1);
        }
      })
    }
  }

  ANUpload(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.FeasibilityPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          // console.log(response);
          // this.app.APP_PA_PhotoErrorMessage="";

        }, (error) => {
          let i: any = document.getElementById('AN_Upload');
          i.value = "";
          if (error.status == 400) {
            // this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('AN_Upload');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getANPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('AN_Upload');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  SaveNotification(Notdetail: NgForm) {

    if (!Notdetail.invalid) {

      document.getElementById('loader-spinner').style.display = "block";
      if (Notdetail.value.AN_EMD == null || Notdetail.value.AN_EMD == "" || Notdetail.value.AN_EMD == undefined) { Notdetail.value.AN_EMD = 50000; }
      Notdetail.value.AN_Upload = this.getANPDFUrl();
      Notdetail.value.AuctionNotificationCDModel = this.CDDetails;
      this.userService.SaveNotification(Notdetail.value)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Saved Successfully!', 'success');
            this.Showauctiongrid();
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            if (error.status == 401) {
              this.errorHandler.handleError(error);
            }
            else if (error.status == 400) {
              swal('Warning!', error.error.Message, 'warning');
            }
          });
    } else {
      document.getElementById('loader-spinner').style.display = "none";
      swal('warning', 'Please fill all Mandatory Fields!', 'warning');
      this.formSubmitted = true;
    }
  }

  BidderApproveorReject(PRId, Status, AN_Id) {
    
    if (Status == 'R') {
      swal({
        title: 'Are you sure?', text: "You want to Reject!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Reject it!'
      }).then((result) => {
        if (result.value) {
          this.ApproveorRejectBidder(PRId, Status, AN_Id);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to Approve!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Approve it!'
      }).then((result) => {
        if (result.value) {
          this.ApproveorRejectBidder(PRId, Status, AN_Id);
        }
      })
    }
  }

  ApproveorRejectBidder(PRId, Status, AN_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.ApproveorRejectBidder(PRId, Status)
      .subscribe(
        (data) => {
          this.GetBidderforApproval(AN_Id);
          document.getElementById('loader-spinner').style.display = "none";
          if (Status == 'R')
            swal('Rejected!', 'Rejected Successfully.', 'success');
          else
            swal('Approved!', 'Approved Successfully.', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          // swal({ text: 'Please delete all pro belonging to this office.' });
          this.errorHandler.handleError(error);
        });
  }

  BidderPhoto(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.PAPhotoimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          // this.app.APP_PA_PhotoErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('B_Photo_Sign');
          i.value = "";
          if (error.status == 400) {
            // this.PAPhotoimageUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('B_Photo_Sign');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getPhotoImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('B_Photo_Sign');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  BidderAddresProof(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.PAPhotoimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          // this.app.APP_PA_PhotoErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('B_AddresProof');
          i.value = "";
          if (error.status == 400) {
            // this.PAPhotoimageUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('B_AddresProof');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getBidderAddresProof() {
    let imagename = null;
    try {
      imagename = document.getElementById('B_AddresProof');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  BidderIdProof(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.PAPhotoimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          // this.app.APP_PA_PhotoErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('B_IdProof');
          i.value = "";
          if (error.status == 400) {
            // this.PAPhotoimageUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('B_IdProof');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getBidderIdProof() {
    let imagename = null;
    try {
      imagename = document.getElementById('B_IdProof');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  GetPropertyDetails(PRId: any, Property_No: any, AN_EMD: any, Price: any, PR_Plot_Area: any) {
    this.bidder.B_Prop_No = Property_No;
    this.bidder.B_Pr_Id_Fk = PRId;
    this.bidder.B_EMD_Amt = AN_EMD;
    this.bidder.B_Base_Price = Price;
    this.area = PR_Plot_Area;
    this.getTotalBase(this.bidder.B_Base_Price);
    // this.show=true;
  }

  getTotalBase(B_Base_Price) {
    let BaseTotal = (this.area * 10.764) * B_Base_Price;
    this.prices.BaseTotal =+BaseTotal.toFixed(2);
    console.log("num3.toFixed(2) is "+this.prices.BaseTotal.toFixed(2))
  }

  getTotalBid(B_Bid_Rate_Per_Sqft) {
    
    let BidTotal=(this.area * 10.764) * B_Bid_Rate_Per_Sqft;
    this.prices.BidTotal = +BidTotal.toFixed(2);
    let B_perc_payment= 0.25 * this.prices.BidTotal;
    this.bidder.B_perc_payment = +B_perc_payment.toFixed(2);
  }

  Changeprice(j, PR_Base_Price) {
    
    let totals;
    for (let i = 0; i < this.auctionproperties.length; i++) {
      if (i == j) {
        totals = this.auctionproperties[i].PR_Plot_Area * 10.764;
        this.auctionproperties[i].baseAmt = totals * PR_Base_Price;
      }
    }

    // for (let i = 0; i < this.auctionproperties.length; i++) {
    //   totals = this.auctionproperties[i].PR_Plot_Area * 10.764;
    //   this.auctionproperties[i].baseAmt = totals * PR_Base_Price;
    // }
  }

  SaveBidder(bidder: NgForm, AN_Id) {
    
    if (!bidder.invalid) {
      this.bidstatus=1;
      bidder.value.B_AddresProof = this.getBidderAddresProof();
      bidder.value.B_IdProof = this.getBidderIdProof();
      bidder.value.B_Photo_Sign = this.getPhotoImage();
      //alert(JSON.stringify(bidder.value))
      this.userService.SaveBidder(bidder.value, AN_Id)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Saved Successfully!', 'success');
            bidder.reset();
            bidder.resetForm();
            this.formSubmitted = false;
            $("#update-bidder").modal('hide');
            this.bidstatus=0;
            // this.show=false;
            this.GetPropertiesforAuction(AN_Id)
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      }
    } else {
      document.getElementById('loader-spinner').style.display = "none";
      swal('warning', 'Please fill all Mandatory Fields!', 'warning');
      this.formSubmitted = true;
    }
  }

  reset() {
    this.bidder = {};
  }

  resetpublishdetail() {
    this.AuctionCD = {};
  }
  resetnotification() {
    this.Auction.AN_EMD = 50000;
    this.CDDetails = [];
  }

  resetbaseprice() {
    for (let i = 0; i < this.auctionproperties.length; i++) {
      this.auctionproperties[i].PR_Base_Price = null;
    }
  }

  hidepop() {
    
    this.show = true;
  }

  NotificationApproveor(AN_Id) {
  
    this.AN_Id = AN_Id;
    this.Status = 'A';
    this.save('')
  }

  NotificationReject(AN_Id) {
  
    this.AN_Id = AN_Id;
    this.Status = 'R';
  }

  save(Remarks) {
    debugger;
    if (this.Status == 'A') {
      Remarks = 'A'
    }
    this.data = this.userService.ApproveorRejectNotification(this.Status, this.AN_Id, Remarks);
    this.data.subscribe(
      (response: any) => {
        if (this.Status == 'R')
            swal('Rejected!', 'Notification Rejected Successfully.', 'success');
          else
            swal('Approved!', 'Notification Approved Successfully.', 'success');
        // swal('Approved!', 'Autherization is done.', 'success');
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        // swal('Rejected!', 'Rejected Successfully.', 'success');
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  // NotificationApproveorReject(Status, AN_Id, Remarks) {
  //   debugger
  //   if (Status == 'R') {
  //     swal({
  //       title: 'Are you sure?', text: "You want to Reject!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Reject it!'
  //     }).then((result) => {
  //       if (result.value) {
  //         // this.ApproveorRejectNotification(Status, AN_Id, Remarks);
  //         this.AN_Id = AN_Id;
  //       }
  //     })
  //   }
  //   else {
  //     swal({
  //       title: 'Are you sure?', text: "You want to Approve!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Approve it!'
  //     }).then((result) => {
  //       if (result.value) {
  //         this.ApproveorRejectNotification(Status, AN_Id, Remarks);
  //       }
  //     })
  //   }
  // }

  // ApproveorRejectNotification(Status, AN_Id, Remarks) {
  //   debugger
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.userService.ApproveorRejectNotification(Status, AN_Id, Remarks)
  //     .subscribe(
  //       (data) => {
  //         this.GetBidderforApproval(AN_Id);
  //         document.getElementById('loader-spinner').style.display = "none";
  //         if (Status == 'R')
  //           swal('Rejected!', 'Rejected Successfully.', 'success');
  //         else
  //           swal('Approved!', 'Approved Successfully.', 'success');
  //       }, (error) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         // swal({ text: 'Please delete all pro belonging to this office.' });
  //         this.errorHandler.HandlerError(error);
  //       });
  // }
}



