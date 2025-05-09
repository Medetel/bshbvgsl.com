import { UserService } from '../../../shared/user.service';
import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../../../shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-manual-grid',
  templateUrl: './manual-grid.component.html',
  styleUrls: ['./manual-grid.component.css']
})
export class ManualGridComponent implements OnInit {

  RES_Name: any;
  TokenCount: any;
  ManualLotteryCount: any;
  PropertyCount: any;
  LOD_Property_No: any;
  LO_TO_Id_FK: any;
  LO_APP_PA_Name: any;
  LO_APP_No: any;
  display = 'none';
  showIt: boolean = false;
  ManualLottery: any = [];
  mode: string;
  Lottery: any;
  lotterylist: any;
  p: any;
  x: any = {};
  a: any = {};
  Applications: any = [];
  PropertyNumbers: any;
  l: any = {};
  lo: any = {};
  Projects: any = {};
  PropertyTypes: any;
  Reservations: any = {};
  Categories;
  Notifications: any;
  data: any;
  title = "Allot";
  showLotFormView: boolean = false;
  showLotView: boolean = true;
  formInvalid: boolean = false;
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    // this.GetCategory();
    // this.GetReservations();
    // this.GetNotifications();
    // this.GetPropertyTypes();
    this.GetAllLottery(this.itemsPerPage, 1);
  }


  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllLottery(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllLottery(this.itemsPerPage, pageNo);
  }

  
  GetAllLottery(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getAllLottery(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.lotterylist = data.lotteryModels;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }


  onSearch(s, itemsPerPage: number, pageNo: number) {
    
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchProjects(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.lotterylist = data.lotteryModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

  // showLotteryFormView() {
  //   if (this.showLotFormView == false && this.showLotView == true) {
  //     this.showLotFormView = true;
  //     this.showLotView = false;
  //     this.GetCategory();
  //     this.GetReservations();
  //     this.GetNotifications();
  //     this.GetPropertyTypes();
  //   } else {
  //     this.showLotFormView = false;
  //     this.showLotView = true;
  //   }
  // }

  // showLotteryView() {
  //   this.GetAllLottery(this.itemsPerPage, 1);
  //   if (this.showLotFormView == true && this.showLotView == false) {
  //     this.showLotFormView = false;
  //     this.showLotView = true;
  //   } else {
  //     this.showLotFormView = true;
  //     this.showLotView = false;
  //   }
  // }

  // showLotteryFormForView(LO_Id) {
  //   if (this.showLotFormView == false && this.showLotView == true) {
  //     this.showLotFormView = true;
  //     this.showLotView = false;
  //     this.GetCategory();
  //     this.GetReservations();
  //     this.GetNotifications();
  //     this.GetPropertyTypes();
  //     this.GetLotteryDetails(LO_Id);
  //     this.mode = 'View';
  //   } else {
  //     this.showLotFormView = false;
  //     this.showLotView = true;
  //   }
  // }

  

  // GetPropertyTypes() {
  //   
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getPropertyTypes();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.PropertyTypes = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetCategory() {
  //   
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getCategory();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Categories = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }



  // GetReservations() {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getReservations();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Reservations = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetRESPercentage(reservationId: number) {
  //   
  //   for (let i = 0; i <= this.Reservations.length; i++) {
  //     if (reservationId == this.Reservations[i].RES_Id)
  //       this.l.LO_RES_Percentage = this.Reservations[i].RES_Percentage;
  //   }
  // }

  // GetNotifications() {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getNotifications();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Notifications = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetProjects(DSWOID_NO_Id) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getProjectDetailsForScrutiny(DSWOID_NO_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Projects = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GETPropertyNo(projectId, categoryId, propertyTypeId) {
  //   
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getPropertyNo(projectId, categoryId, propertyTypeId);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.PropertyNumbers = response;
  //       if (response.length <= 0)
  //         swal('Warning!', "The Property numbers dosent exist for above mentioned criteria or it is already allocated.", 'warning');       
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetPropertyType(PT_Id: number) {
  //   
  //   for (let i = 0; i <= this.PropertyTypes.length; i++) {
  //     if (PT_Id == this.PropertyTypes[i].PT_Id)
  //       this.l.PT_PropertyType = this.PropertyTypes[i].PT_Property_Type;
  //   }
  // }


  // GenerateToken() {
  //   this.isSearch = false;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.userService.generateToken()
  //     .subscribe(
  //       (data: any) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         swal('Success!', 'Tokens generated successfully.', 'success');
  //       }, (error) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //         this.errorHandler.HandlerError(error);
  //       });
  // }


  // GetTokenNoForLottery(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId, PT_PropertyType) {
  //   
  //   this.GETPropertyNo(PD_Id, CA_Id, propertyTypeId);
  //   
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getTokenNoForLottery(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId, PT_PropertyType);
  //   this.data.subscribe(
  //     (response: any) => {
  //       if (response.length > 0) {
  //         this.Applications = response;
  //       }
  //       else {
  //         swal('Warning!', "The Token no does not exist or it does not belongs to above mentioned criteria. ", 'warning');          
  //       }
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetAppData(tokenNo) {
  //   let a, b, c: any;

  //   
  //   this.Applications.forEach(function (value, key) {
  //     if (value.TokenNo == tokenNo) {
  //       a = value.APP_Id;
  //       b = value.APP_No;
  //       c = value.APP_PA_Name;
  //     }
  //   });
  //   this.x.LOD_APP_Id_FK = a;
  //   this.x.LO_APP_No = b;
  //   this.x.LO_APP_PA_Name = c;
  // }
  // Save(Lottery: NgForm) {
  //   //  if (Notification.valid) {
  //   this.formInvalid = false;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   Lottery.value.LotteryDetails = this.ManualLottery;
  //   this.data = this.userService.saveLottery(Lottery.value);
  //   this.data.subscribe(
  //     (response) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       console.log(error);
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetLotteryDetails(LO_ID) {
  //   
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getLotteryDetails(LO_ID);
  //   this.data.subscribe(
  //     (response: any) => { 
  //       this.l = response;
  //       this.ManualLottery = response.LotteryDetails;
  //       this.GetProjects(response.LO_NO_Id_FK);        
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // CheckAppValidation = function (pos, APP_Id) {
  //   var result1 = this.checkAppNoUnique(pos, APP_Id);

  //   if (result1 == true)
  //     return true;
  //   else
  //     return false;
  // }

  // checkAppNoUnique(pos, APP_Id: number) {
  //   let count = 0;
  //   this.PropertyNumbers.forEach(function (value, key) {
  //     if (pos == key) {
  //       if (APP_Id == value.LO_APP_No)
  //         count++;
  //     }
  //   });
  //   if (count > 0) {
  //     swal('Warning!', "The application no is already allocated. ", 'warning');
  //     return false;
  //   }
  //   else
  //     return true;
  // }


  // AddLotteryList(x,Lottery: NgForm) {
  //   
  //   let a;
  //     if (this.ManualLottery.length >= 1) {
  //       this.ManualLottery.forEach(function (value, key) {
  //         if (value.LO_TO_Id_FK == x.LO_TO_Id_FK) {
  //           swal('Warning!', "Token No already alloted.", 'warning');
  //           a = false;
  //         }
  //         else if (value.LOD_Property_No == x.LOD_Property_No) {
  //           swal('Warning!', "Property No already alloted.", 'warning');
  //           a = false;
  //         }
  //       }.bind(this));
  //       if (a != false) {
  //         this.Push(x);
  //       } else {
  //         this.showIt = false;
  //       }
  //     }
  //     else{
  //       this.Push(x);
  //     }
  //     this.Save(Lottery);
  // }

  // Push(x) {
  //   let temp = {
  //     LOD_APP_Id_FK: x.LOD_APP_Id_FK,
  //     LO_APP_No: x.LO_APP_No,
  //     LO_APP_PA_Name: x.LO_APP_PA_Name,
  //     LO_TO_Id_FK: x.LO_TO_Id_FK,
  //     LOD_Property_No: x.LOD_Property_No
  //   }
  //   this.ManualLottery.push(temp);
  //   this.PropertyCount = this.PropertyNumbers.length;
  //   this.ManualLotteryCount = this.ManualLottery.length;
  //   this.OpenPopUp(x.LO_APP_No, x.LO_APP_PA_Name, x.LO_TO_Id_FK, x.LOD_Property_No, this.PropertyCount, this.ManualLotteryCount);
  //   this.x = {};
  // }

  // OpenPopUp(LO_APP_No, LO_APP_PA_Name, LO_TO_Id_FK, LOD_Property_No, PropertyCount, ManualLotteryCount) {

  //   this.LO_APP_No = LO_APP_No;
  //   this.LO_APP_PA_Name = LO_APP_PA_Name;
  //   this.LO_TO_Id_FK = LO_TO_Id_FK;
  //   this.LOD_Property_No = LOD_Property_No;
  //   this.PropertyCount = PropertyCount;
  //   this.ManualLotteryCount = ManualLotteryCount;
  //   this.showIt = true;
  // }

  // RemoveLotteryLists = function (position) {
  //   this.ManualLottery.splice(position, 1);
  // }


  // Allotted(RES_Id: number) {
  //   
  //   this.PropertyCount = this.PropertyNumbers.length;
  //   this.ManualLotteryCount = this.ManualLottery.length;
  //   this.TokenCount = this.Applications.length;
  //   for (let i = 0; i <= this.Reservations.length; i++) {
  //     if (RES_Id == this.Reservations[i].RES_Id) {
  //       this.RES_Name = this.Reservations[i].RES_Name;
  //     }
  //     if ((this.ManualLotteryCount == this.PropertyCount) || (this.ManualLotteryCount == this.TokenCount)) {
  //       swal('Success!', "Allotment has been completed succesfully for"  +  this.RES_Name  +  "Reservation.", 'success');
  //       this.router.navigate["/home/allot"];
  //     }
  //   }

  // }
}
