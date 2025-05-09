import { Component, OnInit } from '@angular/core';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manual-form',
  templateUrl: './manual-form.component.html',
  styleUrls: ['./manual-form.component.css']
})
export class ManualFormComponent implements OnInit {
  LOD_Property_No: any;
  tot: number;
  Not_Id: any; Proj_Id: any; Cat_Id: any; Resv_Id: any; propertyId: any; PT_Type: any;
  RES_Name: any;
  TokenCount: any;
  ManualLotteryCount: any;
  PropertyCount: any;
  Property_No: any;
  Token_Id: any;
  Applicant_Name: any;
  Application_No: any;
  display = 'none';
  showIt: boolean = false;
  ManualLottery: any = [];
  Lottery: any;
  lotterylist: any;
  p: any;
  x: any = {};
  LD: any = [];
  a: any = {};
  Applications: any = [];
  PropertyNumbers: any = [];
  l: any = {};
  lo: any = {};
  Projects;
  PropertyTypes;
  Reservations;
  Categories;
  Notifications;
  data: any;
  title = "Allot";
  // showLotFormView: boolean = false;
  // showLotView: boolean = true;
  formInvalid: boolean = false;
  s: Search;
  itemsPerPage: number = 9;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  ResPercentage;
  LO_Id: any;
  mode: any;
  disGenerate = false;
  lotstatus: any;
  proj_id: any;
  Notify_Id: any;
  notify: any;
  containerview: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetNotifications();
    this.getAllProjectDetailsForScrutiny()
    this.GetCategory();
    this.GetReservations();
    //this.GetNotifications();
    this.GetPropertyTypes();
    this.GetAllLottery(this.itemsPerPage, 1);
    //this.GetAllResPercentage(this.itemsPerPage, 1);
    this.route.params.subscribe(params =>
      this.LO_Id = params['LO_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.LO_Id != null && this.mode != null)
      this.GetLotteryDetails(this.LO_Id);
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


  GetNotificationProjects(Notification_Id, S_ProjectID) {
    debugger;
    // this.l.LO_NO_Id_FK = null
    // this.l.LO_PD_Id_FK = null
    this.l.LO_Allotted_Date = undefined;
    this.l.LO_Id = undefined;
    this.l.LO_CA_Id_FK = undefined;
    this.l.LO_PT_Id_FK = undefined;
    this.l.LO_RES_Id_FK = undefined;
    this.l.LO_RES_Percentage = undefined;
    this.ResPercentage = [];
    this.containerview = false;

    if (S_ProjectID != null) {
      this.proj_id = S_ProjectID;
      if (this.notify == null)
        this.notify = 2;
    }
    if (Notification_Id != null) {
      this.Notify_Id = Notification_Id;
      if (this.notify == null)
        this.notify = 1;
    }
    // if (this.proj_id != null && this.Notify_Id) {
    //   this.GETProjectNotificationDetails(this.Notify_Id, this.proj_id)
    // }
    if (S_ProjectID != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getAllCategory(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Categories = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    if (S_ProjectID != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllPropertyTypes(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.PropertyTypes = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }

    if (S_ProjectID != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllReservationsforProject(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Reservations = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
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
      document.getElementById('loader-spinner').style.display = "block";
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

  GetLotteryDetails(Lottery_ID: any) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getLotteryDetails(Lottery_ID);
    this.data.subscribe(
      (response: any) => {
        this.l = response;
        this.ManualLottery = response.LotteryDetails;
        console.log(this.l.LO_RES_Id_FK);
        this.GetProjects(this.l.LO_NO_Id_FK);
        this.l.LO_Id = "Lottery ID-" + response.LO_Id;
        this.l.LO_Allotted_Date = ((this.l.LO_Allotted_Date).split('T'))[0];
        this.GetAllResPercentage(9, 1, this.l.LO_NO_Id_FK, this.l.LO_PD_Id_FK, this.l.LO_CA_Id_FK, this.l.LO_PT_Id_FK)
        // if(this.l.LO_PT_Id_FK==1)
        // {
        //   this.PT_Type="Site"
        // }
        // this.GetTokenNoForLottery(this.l.LO_NO_Id_FK, this.l.LO_PD_Id_FK, this.l.LO_CA_Id_FK, this.l.LO_RES_Id_FK, this.l.LO_PT_Id_FK, this.PT_Type)
        this.GetProjects(response.LO_NO_Id_FK);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }



  GetAllResPercentage(itemsPerPage: number, pageNo: number, LO_NO_Id_FK, LO_PD_Id_FK, LO_CA_Id_FK, LO_PT_Id_FK) {
    debugger;
    this.containerview = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllResPercentage(itemsPerPage, pageNo, LO_NO_Id_FK, LO_PD_Id_FK, LO_CA_Id_FK, LO_PT_Id_FK)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ResPercentage = data.lotteryModels;
          console.log(this.ResPercentage);
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          let tot = 0;
          for (let i = 0; i <= this.ResPercentage.length; i++) {
            debugger;
            if (this.ResPercentage[i].RES_Name != "Others") {
              tot = tot + this.ResPercentage[i].Total_Res_Properties;
            }
            else {
              this.ResPercentage[i].Total_Res_Properties = this.ResPercentage[i].TotalProperties - tot;
            }
          }
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          // this.errorHandler.HandlerError(error);
        });
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
          // this.errorHandler.HandlerError(error);
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
            // this.errorHandler.HandlerError(error);
          });
    }
  }

  GetPropertyTypes() {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getPropertyTypes();
    this.data.subscribe(
      (response: any) => {
        this.PropertyTypes = response;
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

  GetRESPercentage(reservationId: number) {
    debugger;
    this.containerview = false;
    if(reservationId ==5){
      this.RES_Name = 'Handicapped (Person with Disability)' 
    }
    else if(reservationId == 12){
      this.RES_Name = 'SC (Scheduled Caste)' 
    }
    else if(reservationId == 13){
      this.RES_Name = 'ST (Scheduled Tribe)' 
    }
    else if(reservationId == 18){
      this.RES_Name = 'General' 
    }
    else if(reservationId == 19){
      this.RES_Name = 'Extremely Backward Class' 
    }
    else if(reservationId == 20){
      this.RES_Name = 'Backward Class' 
    }
    for (let i = 0; i <= this.ResPercentage.length; i++) {
      if (this.RES_Name == this.ResPercentage[i].RES_Name)
        this.l.LO_RES_Percentage = this.ResPercentage[i].LO_RES_Percentage
      ;
    }
  }

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

  GetProjects(DSWOID_NO_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectDetailsForScrutiny(DSWOID_NO_Id);
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }



  GetPropertyType(PT_Id: number) {
    
    for (let i = 0; i <= this.PropertyTypes.length; i++) {
      if (PT_Id == this.PropertyTypes[i].PT_Id)
        this.l.PT_PropertyType = this.PropertyTypes[i].PT_Property_Type;
    }
  }


  GenerateToken() {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.generateToken()
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Success!', 'Tokens generated successfully.', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          // this.errorHandler.HandlerError(error);
        });
  }

  GetTokenNoCount(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId, PT_PropertyType) {
    

    this.Not_Id = DSWOID_NO_Id; this.Proj_Id = PD_Id; this.Cat_Id = CA_Id; this.Resv_Id = RES_Id; this.propertyId = propertyTypeId;
    // this.GETPropertyNo(PD_Id, CA_Id, propertyTypeId);
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetTokenNoCount(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId);
    this.data.subscribe(
      (response: any) => {
        if (response == 0) {
          this.disGenerate = true;
        }
        document.getElementById('loader-spinner').style.display = "none";
        this.GetRESPercentage(RES_Id);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  onReservationChange() {
    this.containerview = false;

    // Call your existing GetTokenNoCount method with the necessary parameters
    this.GetTokenNoCount(this.l.LO_NO_Id_FK, this.l.LO_PD_Id_FK, this.l.LO_CA_Id_FK, this.l.LO_RES_Id_FK, this.l.LO_PT_Id_FK, this.l.PT_PropertyType);
    
    // Reset the disGenerate state or any other state as necessary
    this.disGenerate = false;
  }

  GetTokenNoForLottery(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId, PT_PropertyType) {

    this.Not_Id = DSWOID_NO_Id; this.Proj_Id = PD_Id; this.Cat_Id = CA_Id; this.Resv_Id = RES_Id; this.propertyId = propertyTypeId;
    // this.GETPropertyNo(PD_Id, CA_Id, propertyTypeId);

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getTokenNoForLottery(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', "Tokens Generated Successfully for selected criteria.", 'success');
        this.GetTokenNoCount(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId, PT_PropertyType);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        swal('Warning!', "Please enter all the fields.", 'warning');
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  shufflePropertyNumbers() {
    debugger;
    for (let i = this.PropertyNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.PropertyNumbers[i], this.PropertyNumbers[j]] = [this.PropertyNumbers[j], this.PropertyNumbers[i]];
    }
    }

  GettokenstoAllot(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId, status) {
    if(DSWOID_NO_Id === undefined ||PD_Id === undefined || CA_Id === undefined || RES_Id === undefined||propertyTypeId === undefined){
      swal('Warning!', "Please select all the fields in the form", 'warning');
    }
    else{
    debugger;
    if(RES_Id ==5){
      this.RES_Name = 'Handicapped (Person with Disability)' 
    }
    else if(RES_Id == 12){
      this.RES_Name = 'SC (Scheduled Caste)' 
    }
    else if(RES_Id == 13){
      this.RES_Name = 'ST (Scheduled Tribe)' 
    }
    else if(RES_Id == 18){
      this.RES_Name = 'General' 
    }
    else if(RES_Id == 19){
      this.RES_Name = 'Extremely Backward Class' 
    }
    else if(RES_Id == 20){
      this.RES_Name = 'Backward Class' 
    }
    this.lotstatus = status;
    this.Not_Id = DSWOID_NO_Id; this.Proj_Id = PD_Id; this.Cat_Id = CA_Id; this.Resv_Id = RES_Id; this.propertyId = propertyTypeId;
    const reservation = this.ResPercentage.find(r => r.RES_Name === this.RES_Name);

    if (reservation) {
      // Now check if TotalAllotted is greater than or equal to Total_Res_Properties
      if (reservation.TotalAllotted >= reservation.Total_Res_Properties) {
        swal('Warning!', "The Properties Reserved for this category have already been allotted", 'warning');
      }
    
    else{
    this.GETPropertyNo(PD_Id, CA_Id, propertyTypeId, RES_Id);
    this.shufflePropertyNumbers();
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GettokenstoAllot(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId);
    this.data.subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.Applications = response;
          this.containerview = true;
        }
        else {
          this.Applications = response;
          if (this.lotstatus == "tru") {
            swal('Warning!', "The Token no does not exist or it does not belongs to above mentioned criteria. ", 'warning');
            this.containerview = false;
          }
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
  }
}
  }

  GETPropertyNo(projectId, categoryId, propertyTypeId, RES_Id) {
    debugger;
    if(RES_Id ==5){
      this.RES_Name = 'Handicapped (Person with Disability)' 
    }
    else if(RES_Id == 12){
      this.RES_Name = 'SC (Scheduled Caste)' 
    }
    else if(RES_Id == 13){
      this.RES_Name = 'ST (Scheduled Tribe)' 
    }
    else if(RES_Id == 18){
      this.RES_Name = 'General' 
    }
    else if(RES_Id == 19){
      this.RES_Name = 'Extremely Backward Class' 
    }
    else if(RES_Id == 20){
      this.RES_Name = 'Backward Class' 
    }
    for (let i = 0; i < this.ResPercentage.length; i++) {
      //  if (this.ResPercentage[i].RES_Id == RES_Id)
      if (this.ResPercentage[i].RES_Name === this.RES_Name)
        this.tot = this.ResPercentage[i].Total_Res_Properties - this.ResPercentage[i].TotalAllotted;
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getPropertyNo(projectId, categoryId, propertyTypeId, this.tot);
    this.data.subscribe(
      (response: any) => {
        this.PropertyNumbers = response;
        console.log(this.PropertyNumbers);
        if (response.length <= 0)
          if (this.lotstatus == "tru") {
            swal('Warning!', "The Property numbers does not exist for above mentioned criteria or it is already allocated.", 'warning');
            this.containerview = false;
          }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAppData(tokenNo) {
    let a, b, c: any;

    
    this.Applications.forEach(function (value, key) {
      if (value.TokenNo == tokenNo) {
        a = value.APP_Id;
        b = value.APP_No;
        c = value.APP_PA_Name;
      }
    });
    this.x.LOD_APP_Id_FK = a;
    this.x.LO_APP_No = b;
    this.x.LO_APP_PA_Name = c;
  }

  Save(Lottery: NgForm) {
    debugger;
    //  if (Notification.valid) {
    
    this.formInvalid = false;
    // document.getElementById('loader-spinner').style.display = "block";
    Lottery.value.LotteryDetails = this.LD;
    this.LD = [];
    Lottery.value.Lotterttype = 'Manual'
    this.data = this.userService.saveLottery(Lottery.value);
    this.data.subscribe(
      (response: any) => {
        this.l.LO_Id = "Lottery ID-" + response;
        this.LD.pop(this.x);
        this.GettokenstoAllot(this.Not_Id, this.Proj_Id, this.Cat_Id, this.Resv_Id, this.propertyId, 'fal');
        this.GetAllResPercentage(9, 1, this.l.LO_NO_Id_FK, this.l.LO_PD_Id_FK, this.l.LO_CA_Id_FK, this.l.LO_PT_Id_FK);
      
  
      
        // document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        console.log(error);
        // document.getElementById('loader-spinner').style.display = "none";
      });
  }


  CheckAppValidation = function (pos, APP_Id) {
    var result1 = this.checkAppNoUnique(pos, APP_Id);

    if (result1 == true)
      return true;
    else
      return false;
  }

  checkAppNoUnique(pos, APP_Id: number) {
    let count = 0;
    this.PropertyNumbers.forEach(function (value, key) {
      if (pos == key) {
        if (APP_Id == value.LO_APP_No)
          count++;
      }
    });
    if (count > 0) {
      swal('Warning!', "The application no is already allocated. ", 'warning');
      return false;
    }
    else
      return true;
  }


  AddLotteryList(x, Lottery: NgForm) {
    debugger;
    if(x.LO_TO_Id_FK === undefined || x.LOD_Property_Id_Fk === undefined){
      swal('Warning!', "Please select both Token No and Property No.", 'warning');
      this.showIt = false;
    }
    else{    
    let a;
    if (this.ManualLottery.length >= 1) {
      this.ManualLottery.forEach(function (value, key) {
        if (value.LO_TO_Id_FK == x.LO_TO_Id_FK || x.LO_TO_Id_FK == undefined) {
          swal('Warning!', "Token No already alloted or Not Selected.", 'warning');
          a = false;
        }
        else if (value.LOD_Property_Id_Fk == x.LOD_Property_Id_Fk || x.LOD_Property_Id_Fk == undefined) {
          swal('Warning!', "Property No already alloted or Not Selected.", 'warning');
          a = false;
        }
      }.bind(this));
      if (a != false) {
        this.Push(x);
      } else {
        this.showIt = false;
      }
    }
    else {
      this.Push(x);
    }
    if (a != false) {
      this.Save(Lottery);
    }
  }
  }

  Push(x) {
    debugger;
    let temp = {
      LOD_APP_Id_FK: x.LOD_APP_Id_FK,
      LO_APP_No: x.LO_APP_No,
      LO_APP_PA_Name: x.LO_APP_PA_Name,
      LO_TO_Id_FK: x.LO_TO_Id_FK,
      LOD_Property_Id_Fk: x.LOD_Property_Id_Fk,
      LOD_Property_No: this.GetProperty(x.LOD_Property_Id_Fk)
    }
    this.LOD_Property_No = this.GetProperty(x.LOD_Property_Id_Fk)
    this.LD.push(x);
    this.ManualLottery.push(temp);
    if (this.PropertyCount == null || this.PropertyCount == undefined) {
      this.PropertyCount = this.PropertyNumbers.length;
    }
    this.ManualLotteryCount = this.ManualLottery.length;
    this.OpenPopUp(x.LO_APP_No, x.LO_APP_PA_Name, x.LO_TO_Id_FK, this.LOD_Property_No, this.PropertyCount, this.ManualLotteryCount);
    this.x = {};
  }

  GetProperty(Prop_Id) {
    for (let i = 0; i <= this.PropertyNumbers.length; i++) {
      if (Prop_Id == this.PropertyNumbers[i].PR_Id)
        return this.PropertyNumbers[i].PR_Property_No;
    }
  }

  OpenPopUp(LO_APP_No, LO_APP_PA_Name, LO_TO_Id_FK, LOD_Property_No, PropertyCount, ManualLotteryCount) {
    
    this.showIt = true;
    this.Application_No = LO_APP_No;
    this.Applicant_Name = LO_APP_PA_Name;
    this.Token_Id = LO_TO_Id_FK;
    this.Property_No = LOD_Property_No;
    this.PropertyCount = PropertyCount;
    this.ManualLotteryCount = ManualLotteryCount;

  }

  RemoveLotteryLists = function (position) {
    this.ManualLottery.splice(position, 1);
  }


  Allotted(RES_Id: number) {
    
    // this.PropertyCount = this.PropertyNumbers.length;
    // this.ManualLotteryCount = this.ManualLottery.length;
    // this.TokenCount = this.Applications.length;
    for (let i = 0; i <= this.Reservations.length; i++) {
      if (RES_Id == this.Reservations[i].RES_Id) {
        this.RES_Name = this.Reservations[i].RES_Name;
      }
      // this.PropertyNumbers;
      if (this.PropertyNumbers.length == 0) {
        // if ((this.ManualLotteryCount == this.PropertyCount) || (this.ManualLotteryCount == this.TokenCount)) {
        swal('Success!', "Allotment has been completed succesfully for " + this.RES_Name + " Reservation.", 'success');
        // this.router.navigate["/home/allot"];
      }
      //   }
    }
  }
  clear(){
    this.l.LO_PT_Id_FK = undefined;
    this.l.LO_RES_Id_FK = undefined;
    this.l.LO_RES_Percentage = undefined;
    this.ResPercentage = [];
    this.containerview = false;
  }
}
