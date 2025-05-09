import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
//import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { Application } from '../../shared/user.model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-applicant-details-update',
  templateUrl: './applicant-details-update.component.html',
  styleUrls: ['./applicant-details-update.component.css']
})
export class ApplicantDetailsUpdateComponent implements OnInit {

  title = "Application Form";
  APP: any;
  app: any = {};
  ab: any = {};
  data: any;
  Projects: any = [];
  Categories: any = [];
  Applicant: any = {};
  propertieslist: any;
  Notifications: any = [];
  proj_id: any;
  notify: number;
  NO_Id: any;

  SA_Photo: any;
  SAFile: any;
  APP_PA_PhotoErrorMessage: string;
  PAPhotoErrorMessage: any;
  APP_SA_Age: any;
  APP_PA_Age: any;
  APP_Id: any;
  PD: any = {};
  Reservations: any;
  Relegions: any;
  Relations: any;
  Districts: any;
  Taluks: any;
  Villages: any;
  Hoblis: any;
  Gender = "male";
  fileToUpload: File = null;
  formInvalid: boolean = false;
  PAPhotoimageUrl: string = "assets/images/photo.png";
  SAPhotoimageUrl: string = "assets/images/photo.png";
  PASignatureimageUrl: string = "assets/images/signature.png";
  SASignatureimageUrl: string = "assets/images/signature.png";
  PAAadhaarimageUrl: string = "assets/images/default.png";
  SAAadhaarimageUrl: string = "assets/images/default.png";
  mode: string = "save";
  numericpattern = "^[0-9]*$";
  emailpattern = "^[a-zA-Z0-9._%-+]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  PD_Id: any;
  appmode: any;
  banklist;
  payment_mode: any;
  GRelations;
  Prop_No: any;
  Pr_Id: any;

  AuctionNotList: any = [];
  Auc_place: any;
  Auc_date: any;
  AN_Auction_Type: any;

  numericpatterns = "[0-9.]*";
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
  AN_Id: any;

  constructor(private userService: UserService, private errorHandler: ErrorHandler, private router: Router) { 

 // constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.app = new Application()
    this.app.APP_IsJoint = 'N';
    this.app.APP_PropertyType = 'Site';
  }
    
  ngOnInit() {
    this.GetProjectsforWAS();
    this.GetCategory();
    this.GetNotifications();
    this.GetAllDistrict();
    this.GetRelations();
    this.GetRelegions();
    this.GetReservations();
  }

  public show1: boolean = false;
  public show2: boolean = false;

  selectNotification() {
    this.show1 = true;
    this.show2 = false;
  }

  selectBidder() {
    this.show1 = false;
    this.show2 = true;
  }

  GetAuctionDetails(An_Id) {

    for (let i = 0; i < this.AuctionNotList.length; i++) {
      if (this.AuctionNotList[i].AN_Id == An_Id) {
        this.Auc_place = this.AuctionNotList[i].AN_AuctionPlace;
        this.Auc_date = this.AuctionNotList[i].AN_Date;
        this.AN_Auction_Type = this.AuctionNotList[i].AN_Auction_Type;
        this.AN_Id = this.AuctionNotList[i].AN_Id;
        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  GetProjectsforWAS() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProjectsforWAS();
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetCategory() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategory();
    this.data.subscribe(
      (response: any) => {
        this.Categories = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  CalculateAge(dateOfBirth) {
    this.data = this.userService.calculateAge(dateOfBirth);
    this.data.subscribe(
      (response: any) => {
        if (response >= 18)
          this.APP_PA_Age = response;
        else {
          swal('Warning!', "Age cannot be less than 18 years to apply", 'warning');
          this.app.APP_PA_DOB = null;
          this.APP_PA_Age = null;
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  CalculateSAAge(dateOfBirth) {
    this.data = this.userService.calculateAge(dateOfBirth);
    this.data.subscribe(
      (response: any) => {
        if (response >= 18)
          this.APP_SA_Age = response;
        else {
          swal('Warning!', "Age cannot be less than 18 years to apply", 'warning');
          this.app.APP_SA_DOB = null;
          this.APP_SA_Age = null;
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  GetAllDistrict() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.Districts = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetTaluks(DistrictId) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllTalukName(DistrictId);
    this.data.subscribe(
      (response: any) => {
        this.Taluks = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAuctionNotifications(PD_id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAuctionNotifications(PD_id);
    this.data.subscribe(
      (response: any) => {
        this.AuctionNotList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetRelations() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getRelations();
    this.data.subscribe(
      (response: any) => {
        this.Relations = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetRelegions() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getRelegions();
    this.data.subscribe(
      (response: any) => {
        this.Relegions = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetReservations() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getReservations();
    this.data.subscribe(
      (response: any) => {
        this.Reservations = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
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

  // GetProperties(PD_Id: any, Cat_Id: any, SearchText: any) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.userService.GetProperties(PD_Id, Cat_Id, SearchText)
  //     .subscribe(
  //       (data: any) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         //this.auctionnot = data;
  //         this.propertieslist = data;
  //         let totalplinth = 0;
  //         // for (let i = 0; i < this.Reviseproperties.length; i++) {
  //         //   total = this.Reviseproperties[i].PR_Plot_Area * 10.764;
  //         //   this.Reviseproperties[i].baseAmt = total * this.Reviseproperties[i].Price;
  //         // }

  //         for (let i = 0; i < this.propertieslist.length; i++) {
  //           totalplinth = this.propertieslist[i].PR_Plot_Area * 10.764;
  //           this.propertieslist[i].AreaSqft = totalplinth;
  //           //this.Reviseproperties[i].PR_ReviseBaseprice = false;
  //         }

  //         //this.B_mode = "";
  //         // for (let i = 0; i < this.Reviseproperties.length; i++) {
  //         //   if (this.Reviseproperties[i].Price == null)
  //         //     this.B_mode = "save";
  //         // }
  //       }, (error) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         this.errorHandler.handleError(error);

          
  //       });

        
  // }

  
GetProperties(PD_Id: any, Cat_Id: any, SearchText: any) {
  // Show the loader spinner
  const loaderSpinner = document.getElementById('loader-spinner');
  if (loaderSpinner) {
      loaderSpinner.style.display = "block";
  }

  this.userService.GetProperties(PD_Id, Cat_Id, SearchText).subscribe(
      (data: any) => {
          // Hide the loader spinner

          
          if (loaderSpinner) {
              loaderSpinner.style.display = "none";
          }
          // Handle the properties data
          this.propertieslist = data;
          this.propertieslist.forEach(property => {
              // Calculate and set the area in square feet
              property.AreaSqft = property.PR_Plot_Area * 10.764;
          });
      },
      (error) => {
          // Hide the loader spinner
          if (loaderSpinner) {
              loaderSpinner.style.display = "none";
          }

          // Handle the error
          this.errorHandler.handleError(error);

          // Navigate with query parameters
          const navigationExtras: NavigationExtras = {
              queryParams: {
                  data: SearchText,
                  PD_Id: PD_Id,
                  Cat_Id: Cat_Id
              }
          };

          // Navigate to an error handling route or the current route with query params
          this.router.navigate(['/error-page'], navigationExtras); // Adjust the route as needed
      }
  );
}


  GetNotificationProjects(Notification_Id, S_ProjectID) {

    this.GetAuctionNotifications(S_ProjectID);
    if (S_ProjectID != null) {
      this.proj_id = S_ProjectID;
      if (this.notify == null)
        this.notify = 2;
    }
    if (Notification_Id != null) {
      this.NO_Id = Notification_Id;
      if (this.notify == null)
        this.notify = 1;
    }
    // if (this.proj_id != null && this.Not_Id) {
    //   this.GETProjectNotificationDetails(this.Not_Id, this.proj_id)
    // }

    if (Notification_Id == null && this.notify == 2) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getNotificationDetailsForScrutiny(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Notifications = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    else if (S_ProjectID == null && this.notify == 1) {
      this.data = this.userService.getProjectDetailsForScrutiny(Notification_Id);
      this.data.subscribe(
        (response: any) => {
          this.Projects = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
  }

  PAPhotoFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.PAPhotoimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.APP_PA_PhotoErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_PA_Photo');
          i.value = "";
          if (error.status == 400) {
            this.PAPhotoimageUrl = "assets/images/photo.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_PA_Photo');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getPAPhotoPrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_PA_Photo');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  SAPhotoFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SAPhotoimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.APP_SA_PhotoErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_SA_Photo');
          i.value = "";
          if (error.status == 400) {
            this.SAPhotoimageUrl = "assets/images/photo.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_SA_Photo');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getSAPhotoPrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_SA_Photo');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  PASignatureFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.PASignatureimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.APP_PA_SignatureErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_PA_Signature');
          i.value = "";
          if (error.status == 400) {
            this.PASignatureimageUrl = "assets/images/signature.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_PA_Signature');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getPASignaturePrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_PA_Signature');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  SASignatureFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SASignatureimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.APP_SA_SignatureErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_SA_Signature');
          i.value = "";
          if (error.status == 400) {
            this.SASignatureimageUrl = "assets/images/signature.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_SA_Signature');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getSASignaturePrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_SA_Signature');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  PAAadhaarFileInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.PAAadhaarimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.APP_PAAadhaarErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_PA_AdharCard');
          i.value = "";
          if (error.status == 400) {
            this.PAAadhaarimageUrl = "assets/images/default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_PA_AdharCard');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getPAAdharCardPrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_PA_AdharCard');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  SAAadhaarFileInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SAAadhaarimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.APP_SAAadhaarErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_SA_AdharCard');
          i.value = "";
          if (error.status == 400) {
            this.SAAadhaarimageUrl = "assets/images/default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_SA_AdharCard');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getSAAdharCardPrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_SA_AdharCard');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  ESWFileInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.ESW_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_ESW_Certificate');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_ESW_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getESWFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_ESW_Certificate');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  CasteFileInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {

      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          this.app.Caste_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_Caste_Certificate');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_Caste_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getCasteFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_Caste_Certificate');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  //Save
  SaveOfflineApplication(Application: NgForm, Applicant, APP_PA_Age: any) {

    if (Application.valid) {
      if (this.CheckFinalValidation(Application.value.APP_CA_Id_FK, Application.value.APP_AnnualIncome)) {
        this.payment_mode = Application.value.APP_Payment_type;
        Application.value.APP_PA_Age = APP_PA_Age;
        Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
        Application.value.APP_SA_Photo = this.getSAPhotoPrintImage();
        Application.value.APP_PA_Signature = this.getPASignaturePrintImage();
        Application.value.APP_SA_Signature = this.getSASignaturePrintImage();
        Application.value.APP_PA_AdharCard = this.getPAAdharCardPrintImage();
        Application.value.APP_SA_AdharCard = this.getSAAdharCardPrintImage();
        Application.value.APP_ESW_Certificate = this.getESWFileInput();
        Application.value.APP_Caste_Certificate = this.getCasteFileInput();
        Application.value.APP_Project_Id_FK = Applicant.App_PD_Id_FK;
        Application.value.APP_CA_Id_FK = Applicant.App_Cat_Id_Fk;
        Application.value.PR_Id = this.Pr_Id;
        this.app.APP_PA_Photo = Application.value.APP_PA_Photo;
        this.formInvalid = false;
        this.APP_PA_Age = Application.value.APP_PA_Age;
        document.getElementById('loader-spinner').style.display = "block";
        Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
        Application.value.PD_Id = this.PD_Id;
        this.data = this.userService.SaveOfflineApplication(Application.value);
        this.data.subscribe(
          (response) => {
            this.APP_Id = response;
            Application.reset();
            Application.resetForm();
            this.formInvalid = false;
            swal('Success!', 'Application No: ' + response + ' Submitted Successfully', 'success');
            document.getElementById('loader-spinner').style.display = "none";
            document.getElementById('loader-spinner').style.display = "none";

          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            if (error.status == 401) {
              this.errorHandler.handleError(error);
            }
            else if (error.status == 400) {
              swal('Warning!', error.error.Message, 'warning');
            }
          });

      }
      else {
        swal('Warning!', 'Please fill all mandatory fields.', 'warning');
        this.formInvalid = true;
      }
    }
    else {
      swal('Warning!', 'Please fill all mandatory fields.', 'warning');
      this.formInvalid = true;
    }
  }

  CheckFinalValidation(APP_CA_Id_FK, APP_AnnualIncome) {
    var result1 = this.CheckAnnualIncome(APP_CA_Id_FK, APP_AnnualIncome);

    if (result1 == true)
      return true;
    else
      return false;
  }

  CheckAnnualIncome(APP_CA_Id_FK, APP_AnnualIncome) {
    if (APP_CA_Id_FK == 1) {
      if (APP_AnnualIncome <= 80000 || APP_AnnualIncome <= "80000.00" || APP_AnnualIncome <= "80,000.00") {
        this.app.APP_AnnualIncomeErrorMessage = "";
        return true;
      }
      else {
        this.app.APP_AnnualIncomeErrorMessage = "Amount cannot be greater then 80K if category is EWS";
        return false;
      }
    }
    else {
      this.app.APP_AnnualIncomeErrorMessage = "";
      return true;
    }
  }

  UpdateApplication(APP_Id, Application: NgForm, APP_PA_Age, APP_No) {

    if (Application.valid) {
      this.formInvalid = false;
      document.getElementById('loader-spinner').style.display = "block";
      Application.value.APP_PA_Age = APP_PA_Age;
      this.payment_mode = Application.value.APP_Payment_type;
      if (Application.value.APP_PA_Photo != null && !Application.value.APP_PA_Photo.match("http"))
        Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
      if (Application.value.APP_SA_Photo != null && !Application.value.APP_SA_Photo.match("http"))
        Application.value.APP_SA_Photo = this.getSAPhotoPrintImage();

      if (Application.value.APP_PA_Signature != null && !Application.value.APP_PA_Signature.match("http"))
        Application.value.APP_PA_Signature = this.getPASignaturePrintImage();
      if (Application.value.APP_SA_Signature != null && !Application.value.APP_SA_Signature.match("http"))
        Application.value.APP_SA_Signature = this.getSASignaturePrintImage();
      if (Application.value.APP_PA_AdharCard != null && !Application.value.APP_PA_AdharCard.match("http"))
        Application.value.APP_PA_AdharCard = this.getPAAdharCardPrintImage();
      if (Application.value.APP_SA_AdharCard != null && !Application.value.APP_SA_AdharCard.match("http"))
        Application.value.APP_SA_AdharCard = this.getSAAdharCardPrintImage();
      if (Application.value.APP_ESW_Certificate != null && !Application.value.APP_ESW_Certificate.match("http"))
        Application.value.APP_ESW_Certificate = this.getESWFileInput();
      if (Application.value.APP_Caste_Certificate != null && !Application.value.APP_Caste_Certificate.match("http"))
        Application.value.APP_Caste_Certificate = this.getCasteFileInput();
      Application.value.APP_PA_Age = this.APP_PA_Age;
      Application.value.APP_Project_Id_FK = this.PD.PD_Id;
      Application.value.APP_Not_Id_Fk = this.NO_Id;
      this.data = this.userService.updateApplication(APP_Id, Application.value);
      this.data.subscribe(
        (response) => {
          Application.reset();
          Application.resetForm();
          this.formInvalid = false;
          swal('Success!', 'Application No.: ' + APP_No + ' ' + 'details has been updated successfully.', 'success');
          this.router.navigate(['home/applicant/applicantview/', this.APP_Id, this.NO_Id, this.payment_mode]);
          document.getElementById('loader-spinner').style.display = "none";

        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    else {
      swal('Warning!', 'Please fill all mandatory fields.', 'warning');
      this.formInvalid = true;
    }
  }


  getAllProjectDetailsForScrutiny() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProjectDetailsForScrutiny();
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  changeCheckbox(PR_Id) {

    for (let i = 0; i < this.propertieslist.length; i++) {
      if (this.propertieslist[i].PR_Id == PR_Id) {
        this.Pr_Id = this.propertieslist[i].PR_Id;
        this.Prop_No = this.propertieslist[i].PR_Property_No;
        this.bidder.B_Pr_Id_Fk = this.propertieslist[i].PR_Id;
        this.bidder.B_Prop_No = this.propertieslist[i].PR_Property_No;

      }
    }
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

        }, (error) => {
          let i: any = document.getElementById('B_Photo_Sign');
          i.value = "";
          if (error.status == 400) {
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

      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('B_AddresProof');
          i.value = "";
          if (error.status == 400) {
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

      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('B_IdProof');
          i.value = "";
          if (error.status == 400) {
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

  SaveBidder(bidder: NgForm) {
    if (!bidder.invalid) {
      this.bidstatus = 1;
      bidder.value.B_AddresProof = this.getBidderAddresProof();
      bidder.value.B_IdProof = this.getBidderIdProof();
      bidder.value.B_Photo_Sign = this.getPhotoImage();
      bidder.value.Status = 1;

      this.userService.SaveBidder(bidder.value, this.AN_Id)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Saved Successfully!', 'success');
            bidder.reset();
            bidder.resetForm();
            this.formSubmitted = false;
            swal('Success!', 'Bidder No.: ' + data + ' ' + 'details has been updated successfully.', 'success');

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
}