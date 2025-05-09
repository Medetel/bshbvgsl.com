import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { Search } from '../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-e-lottery',
  templateUrl: './e-lottery.component.html',
  styleUrls: ['./e-lottery.component.css']
})
export class ELotteryComponent implements OnInit {

  Obj_Id: any;
  AFD: any = {};
  u: any = {};
  PND: any = {};
  Projects: any;
  Qlottery: any = {};
  Notifications: any;
  data: any;
  title = "Update objection"
  title1 = "Eligible/InEligible Category List"
  ap: any;
  fileToUpload: File = null;
  UO_UploadimageUrl1: string = "assets/images/image-default.png";
  formInvalid: boolean = false;
  ApplicationList;
  showMod = false;
  formSubmitted: boolean;
  Verified: any;
  s: Search;
  isSearch: boolean;
  object: any;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  proj_id: any;
  Not_Id: any;
  notify: any;
  ApplDetails: any = [];
  EligibleApplDetails: any = [];
  PropertyDetails: any = [];
  ApplAllotDetails: any = [];
  AppId: any;
  PropId: any;
  appno: any;
  propno: any;
  Not_ID: any;
  Proj_ID: any;
  PropT_Id: any;
  CAT_Id: any;
  Elot_LotteryId: any;
  index: any;
  RES_Id: any;
  Cat: any;
  Prop: any;
  Res: any;
  RESPercentage: any;
  indexj: any;
  indexi: any;
  Total_Res_Properties: any;
  Reservation: any;
  R_Created_Date: Date;
  clickCount: number = 0;
  selectedApplicants: any =[];   // Array representing all people
  notselectedApplicants: any = [];
  tempApplicant: any = [];
  totalapplength:number;
  reservedCount: number = 0;
  applen: any;
  eligibleApplicants:any = [];
  stop: boolean;
  continue: boolean = true ;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetNotifications();
    this.getAllProjectDetailsForScrutiny()
    this.getAllReservationScrutiny()
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
        this.errorHandler.handleError(error);
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
        this.errorHandler.handleError(error);
      });
  }

  getAllReservationScrutiny() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllReservationScrutiny();
    this.data.subscribe(
      (response: any) => {
        this.Reservation = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }


  //get notification list
  GetNotificationProjects(Notification_Id, S_ProjectID) {
    this.index = null;
    this.indexi = null;
    this.indexj = null;

    if (S_ProjectID != null) {
      this.proj_id = S_ProjectID;
      if (this.notify == null)
        this.notify = 2;
    }

    if (Notification_Id != null) {
      this.Not_Id = Notification_Id;
      if (this.notify == null)
        this.notify = 1;
    }

    if (this.notify == 1 && Notification_Id != null) {
      this.proj_id = null;
    }
    if (this.notify == 2 && S_ProjectID != null) {
      this.Not_Id = null;
    }

    if (Notification_Id == null && this.notify == 2) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getNotificationDetailsForScrutiny(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Notifications = response;

          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          this.errorHandler.handleError(error);
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
          this.errorHandler.handleError(error);
          document.getElementById('loader-spinner').style.display = "none";
        });
    }

  }

  
  GetApplicantDetailsforElottery(DSWOID_NO_Id, PD_Id,R_Created_Date) {
    debugger;
    this.R_Created_Date = R_Created_Date.toString().split('T')[0];
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetApplicantDetailsforElottery(DSWOID_NO_Id, PD_Id,this.R_Created_Date);
    this.data.subscribe(
      (response: any) => {
        this.ApplDetails = response;
        this.ApplAllotDetails = [];

        for (let j = 0; j < this.ApplDetails.length; j++) {
          if (j == this.indexi) {
            for (let k = 0; k < this.ApplDetails[j].ElotteryPropertyModel.length; k++) {
              if (k == this.indexj) {

                for (let i = 0; i < this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel.length; i++) {
                  if (i == this.index) {
                    this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].visible = "Y";
                  } else {
                    this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].visible = "N";
                  }
                }

              }
            }
          }
        }

        // for (let i = 0; i < this.ApplDetails.ElotteryPropertyModel.ElotteryModel.length; i++) {
        //   if (i == this.index) {
        //     this.ApplDetails.ElotteryModel[i].visible="Y";
        //   }else
        //   {
        //     this.ApplDetails.ElotteryModel[i].visible="N";
        //   }
        // }

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        this.errorHandler.handleError(error);
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  // GetApplicantDetailsforElottery(DSWOID_NO_Id, PD_Id) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetApplicantDetailsforElottery(DSWOID_NO_Id, PD_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.ApplDetails = response;
  //       this.ApplAllotDetails = [];
  //       for (let i = 0; i < this.ApplDetails.ElotteryModel.length; i++) {
  //         if (i == this.index) {
  //           this.ApplDetails.ElotteryModel[i].visible="Y";
  //         }else
  //         {
  //           this.ApplDetails.ElotteryModel[i].visible="N";
  //         }
  //       }
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       this.errorHandler.HandlerError(error);
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  GetApplicantandPropertyDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id, RES_Id, indi, indj, ind,Total_Res_Properties,R_Created_Date) {//,Cat,Prop,Res
    
    this.Not_ID = lot_Not_ID
    this.Proj_ID = lot_Proj_ID
    this.PropT_Id = PT_Id
    this.CAT_Id = CA_Id
    this.RES_Id = RES_Id
    this.Total_Res_Properties = Total_Res_Properties
    this.R_Created_Date = R_Created_Date.toString().split('T')[0];
    this.alreadyRandomizedApplicants.clear();
    this.continue = true;
    for (let j = 0; j < this.ApplDetails.length; j++) {
      if (j == indi) {
        for (let k = 0; k < this.ApplDetails[j].ElotteryPropertyModel.length; k++) {
          if (k == indj) {
            for (let i = 0; i < this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel.length; i++) {
              if (i == ind) {
                this.Cat = this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].CA_CategoryName;
                this.Prop = this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].PT_Property_Type;
                this.Res = this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].RES_Name;
                this.RESPercentage = this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].RES_Percentage;
              }
            }
          }
        }
      }
    }



    // for (let i = 0; i < this.ApplDetails.ElotteryModel.length; i++) {
    //   if (i == ind) {
    //     this.Cat = this.ApplDetails.ElotteryModel[i].CA_CategoryName;
    //     this.Prop = this.ApplDetails.ElotteryModel[i].PT_Property_Type;
    //     this.Res = this.ApplDetails.ElotteryModel[i].RES_Name;
    //     this.RESPercentage = this.ApplDetails.ElotteryModel[i].RES_Percentage;
    //   }
    // }
    this.indexi = indi;
    this.indexj = indj;
    this.index = ind;

    this.GetApplicantDetailsforElottery(lot_Not_ID, lot_Proj_ID,R_Created_Date)
    this.GetEligibleApplicantDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id, RES_Id)
    this.GetPropertyDetailsforElottery(lot_Proj_ID, PT_Id, CA_Id)


    for (let j = 0; j < this.ApplDetails.length; j++) {
      if (j == indi) {
        for (let k = 0; k < this.ApplDetails[j].ElotteryPropertyModel.length; k++) {
          if (k == indj) {

            for (let i = 0; i < this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel.length; i++) {
              if (i == ind) {
                this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].visible = "Y";
              } else {
                this.ApplDetails[j].ElotteryPropertyModel[k].ElotteryModel[i].visible = "N";
              }
            }

          }
        }
      }
    }



    // for (let i = 0; i < this.ApplDetails.ElotteryModel.length; i++) {
    //   if (i == ind) {
    //     this.ApplDetails.ElotteryModel[i].visible = "Y";
    //   } else {
    //     this.ApplDetails.ElotteryModel[i].visible = "N";
    //   }
    // }
    // this.GetAllottedDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id)
  }

  GetEligibleApplicantDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id, RES_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEligibleApplicantDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id, RES_Id);
    this.data.subscribe(
      (response: any) => {
        this.EligibleApplDetails = response;

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetPropertyDetailsforElottery(lot_Proj_ID, PT_Id, CA_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPropertyDetailsforElottery(lot_Proj_ID, PT_Id, CA_Id);
    this.data.subscribe(
      (response: any) => {
        this.PropertyDetails = response;

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  // GetAllottedDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetAllottedDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.ApplAllotDetails = response;

  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //       this.errorHandler.HandlerError(error);
  //     });
  // }

  Elottery() {
    debugger;
    
    var app, prop, i, j;
    if (this.EligibleApplDetails.length != 0 && this.PropertyDetails.length != 0) {
      app = Math.floor(Math.random() * this.EligibleApplDetails.length) + 0;
      prop = Math.floor(Math.random() * this.PropertyDetails.length) + 0;
    }
    else {
      if (this.EligibleApplDetails.length == 0 || this.PropertyDetails.length == 0) {
        swal('warning', "No Applications or Properties to Allot!", 'warning');
        return;
      } else {
        swal('success', "Allotted Successfully!", 'success');
      }
    }
    if (this.EligibleApplDetails.length != 0 && this.PropertyDetails.length != 0) {
      for (i = 0; i < this.EligibleApplDetails.length; i++) {
        if (i == app) {
          this.AppId = this.EligibleApplDetails[i].APP_Id;
          this.appno = this.EligibleApplDetails[i].APP_No;
        }
      }
      for (j = 0; j < this.PropertyDetails.length; j++) {
        if (j == prop) {
          this.PropId = this.PropertyDetails[j].PR_Id;
          this.propno = this.PropertyDetails[j].PR_Property_No;
        }
      }
    }
    // this.SaveElottery()
  }



  // QElotteryAllot() {
  //   // debugger;
  //    let app, prop;
   
  //    if (this.EligibleApplDetails.length !== 0 && this.PropertyDetails.length !== 0) {
  //        app = Math.floor(Math.random() * this.EligibleApplDetails.length);
  //        prop = Math.floor(Math.random() * this.PropertyDetails.length);
  //    } else {
  //        if (this.ApplDetails.length === 0) {
  //            swal('', "No Applications or Properties to Allot!", 'warning');
  //        } else {
  //            swal('', "Elottery Allotment Processed Successfully!", 'success');
  //        }
  //        return;
  //    }
   
  //    let applicant = this.EligibleApplDetails.splice(app, 1)[0];
  //    let property = this.PropertyDetails.splice(prop, 1)[0];
   
  //    let temp = {
  //        EAD_PR_Id_Fk: property.PR_Id,
  //        APP_PA_Name: applicant.APP_PA_Name,
  //        EAD_APP_Id_Fk: applicant.APP_Id,
  //        APP_No: applicant.APP_No,
  //        PR_Property_No: property.PR_Property_No,
  //        CA_CategoryName: property.CA_CategoryName,
  //        PT_Property_Type: property.PT_Property_Type,
  //        PT_Id: property.PT_Id,
  //        CA_Id: property.CA_Id,
  //        RES_Name: applicant.RES_Name,
  //        // SubRes_Name: this.SubRes_Name,
  //        // SubRes_Percentage: this.SubRes_Percentage
  //    };
  //    this.ApplAllotDetails.push(temp);
  //  }
   
  //  displayUnallottedApplicants() {
  //    debugger;
  //    for (let i = 0; i < this.EligibleApplDetails.length; i++) {
  //        let applicant = this.EligibleApplDetails[i];
  //        let property = this.PropertyDetails[i];
  //        let temp = {
  //            EAD_PR_Id_Fk: null,
  //            APP_PA_Name: applicant.APP_PA_Name,
  //            EAD_APP_Id_Fk: applicant.APP_Id,
  //            APP_No: applicant.APP_No,
  //            PR_Property_No: "Zero",
  //            CA_CategoryName: applicant.CA_CategoryName,
  //            PT_Property_Type: '--',
  //            PT_Id: 0,
  //            CA_Id: 0,
  //            RES_Name: applicant.RES_Name,
  //            // SubRes_Name: this.SubRes_Name,
  //            // SubRes_Percentage: this.SubRes_Percentage
  //        };
  //        this.ApplAllotDetails.push(temp);
  //    }
  //  }

  






  // Stated Commnet Alotting Appliant Base On Total Reservation Property
  // QElottery() {
    
  //   swal({
  //     title: 'Are you sure?', text: "You want to Allot!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Allot!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.QEAllotlottery(this.Total_Res_Properties);
  //     }
  //   })

  // }

  // QEAllotlottery(Total_Res_Properties) {
  //   debugger
  //   let Total_Res_Propertiescount = Total_Res_Properties 
  //   let length, k;
  //   // let applen = this.EligibleApplDetails.length
  //   let applen = Total_Res_Propertiescount
  //   let proplength = this.PropertyDetails.length
    
  //   if (applen < proplength) {
  //   length = applen;
  //   } else {
  //   length = proplength
  //   }
  //   if (this.EligibleApplDetails.length == 0 || this.PropertyDetails.length == 0) {
  //     swal('', "No Applications or Properties to Allot!", 'warning');
  //     return;
  //   }
  //   //else {
  //   //   swal('', "Allotted Successfully!", 'success');
  //   // }
  //   for (k = 0; k < length; k++) {
  //     this.QElotteryAllot()
  //   }
  //   this.appno = null;
  //   this.propno = null;
  //   swal('', "Elottery Allotment Processed Successfully!", 'success');
  // }

  // QElotteryAllot() {
    
  //   var app, prop, i, j, flag = 0;
  //   let EAD_PR_Id_Fk = null, EAD_APP_Id_Fk = null, APP_PA_Name = null, APP_No = null, PR_Property_No = null,
  //     CA_CategoryName = null, PT_Property_Type = null, PT_Id = null, CA_Id = null, RES_Name = null;

  //   if (this.EligibleApplDetails.length != 0 && this.PropertyDetails.length != 0) {
  //     app = Math.floor(Math.random() * this.EligibleApplDetails.length) + 0;
  //     prop = Math.floor(Math.random() * this.PropertyDetails.length) + 0;
  //   }
  //   else {
  //     if (this.ApplDetails.length == 0) {
  //       swal('', "No Applications or Properties to Allot!", 'warning');
  //     } else {
  //       swal('', "Elottery Allotment Processed Successfully!", 'success');
  //     }
  //   }
  //   if (this.EligibleApplDetails.length != 0 && this.PropertyDetails.length != 0) {
  //     for (i = 0; i < this.EligibleApplDetails.length; i++) {
  //       if (i == app) {
  //         this.AppId = this.EligibleApplDetails[i].APP_Id;
  //         this.appno = this.EligibleApplDetails[i].APP_No;
  //         EAD_APP_Id_Fk = this.EligibleApplDetails[i].APP_Id;
  //         APP_PA_Name = this.EligibleApplDetails[i].APP_PA_Name;
  //         APP_No = this.EligibleApplDetails[i].APP_No;
  //         RES_Name = this.EligibleApplDetails[i].RES_Name;
  //         this.EligibleApplDetails.splice(i, 1);
  //       }
  //     }

  //     for (j = 0; j < this.PropertyDetails.length; j++) {
  //       if (j == prop) {
  //         this.PropId = this.PropertyDetails[j].PR_Id;
  //         this.propno = this.PropertyDetails[j].PR_Property_No;
  //         EAD_PR_Id_Fk = this.PropertyDetails[j].PR_Id;
  //         PR_Property_No = this.PropertyDetails[j].PR_Property_No;
  //         CA_CategoryName = this.PropertyDetails[j].CA_CategoryName;
  //         PT_Property_Type = this.PropertyDetails[j].PT_Property_Type;
  //         PT_Id = this.PropertyDetails[j].PT_Id;
  //         CA_Id = this.PropertyDetails[j].CA_Id;
  //         this.PropertyDetails.splice(j, 1);
  //       }
  //     }

  //     // this.SaveElottery()
  //     let temp = {
  //       EAD_PR_Id_Fk: EAD_PR_Id_Fk,
  //       APP_PA_Name: APP_PA_Name,
  //       EAD_APP_Id_Fk: EAD_APP_Id_Fk,
  //       APP_No: APP_No,
  //       PR_Property_No: PR_Property_No,
  //       CA_CategoryName: CA_CategoryName,
  //       PT_Property_Type: PT_Property_Type,
  //       PT_Id: PT_Id,
  //       CA_Id: CA_Id,
  //       RES_Name: RES_Name
  //     }
  //     this.ApplAllotDetails.push(temp);
  //   }
  // }
// End Commnet Alotting Appliant Base On Total Reservation Property



incrementClickCount(): number {
  this.clickCount += 1;
  return this.clickCount;
}



QElottery(Total_Res_Properties, clickCount) {
  debugger;
  swal({
      title: 'Are you sure?',
      text: "You want to Allot!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Allot!'
  }).then((result) => {
      if (result.value) {
          // this.QEAllotlottery(Total_Res_Properties, this.clickCount);
          this.QEAllotlottery(Total_Res_Properties);
      }
  })
}

// QEAllotlottery(Total_Res_Properties, clickCount) {
//   debugger;
//   // totalPeople: number[];   // Array representing all people
//   // selectedPeople: number[]; // Array to store selected people
//   // itemsPerPage: number = 10;
//   // currentPage: number = 1;
//    this.incrementClickCount();
//   let respropcount = Total_Res_Properties;
//   let applen = respropcount;
//   let proplength = this.PropertyDetails.length;
//   let length = Math.min(applen, proplength);

//   if (this.EligibleApplDetails.length === 0 || this.PropertyDetails.length === 0) {
//       swal('', "No Applications or Properties to Allot!", 'warning');
//       return;
//   }

//  this.reservedCount = length;
//   // const totalCount = this.EligibleApplDetails.length;

//   for (let k = 0; k < length; k++) {
//       this.QElotteryAllot();
//   }

//   this.displayUnallottedApplicants();

//   this.appno = null;
//   this.propno = null;
//   swal('', "Elottery Allotment Processed Successfully!", 'success');
// }

// QElotteryAllot() {
//    debugger;
//    let app, prop;
 
//    if (this.EligibleApplDetails.length !== 0 && this.PropertyDetails.length !== 0) {
//        app = Math.floor(Math.random() * this.EligibleApplDetails.length);
//        prop = Math.floor(Math.random() * this.PropertyDetails.length);

//        if(this.clickCount > 1){
//         app = Math.floor(Math.random() * this.notselectedApplicants.length);
//         prop = Math.floor(Math.random() * this.PropertyDetails.length);
//        } 

//    } else {
//        if (this.ApplDetails.length === 0) {
//            swal('', "No Applications or Properties to Allot!", 'warning');
//        } else {
//            swal('', "Elottery Allotment Processed Successfully!", 'success');
//        }
//        return;
//    }
    
//    console.log(app, prop);
//    var applicant = this.EligibleApplDetails.splice(app, 1)[0];
//    var property = this.PropertyDetails.splice(prop, 1)[0];

//    if(this.clickCount > 1){
//      applicant = this.notselectedApplicants.splice(app, 1)[0];
//      property = this.PropertyDetails.splice(prop, 1)[0];
//     }
//     console.log(applicant, "applicant before")
//     console.log(property, "propety before")
//     console.log(property.PR_Id, "First");
//    let temp = {
//        EAD_PR_Id_Fk: property.PR_Id,
//        APP_PA_Name: applicant.APP_PA_Name,
//        EAD_APP_Id_Fk: applicant.APP_Id,
//        APP_No: applicant.APP_No,
//        PR_Property_No: property.PR_Property_No,
//        CA_CategoryName: property.CA_CategoryName,
//        PT_Property_Type: property.PT_Property_Type,
//        PT_Id: property.PT_Id,
//        CA_Id: property.CA_Id,
//        RES_Name: applicant.RES_Name,
//        // SubRes_Name: this.SubRes_Name,
//        // SubRes_Percentage: this.SubRes_Percentage
//    };
//    console.log(property.PR_Id, "second");
//    console.log(applicant, "applicant after")
//     console.log(property, "propety after")
//    console.log(temp);
//    this.selectedApplicants.push(temp);
//    this.ApplAllotDetails.push(temp);
//  }
 
//  displayUnallottedApplicants() {
//    debugger;
//    for (let i = 0; i < this.EligibleApplDetails.length; i++) {
//        let applicant = this.EligibleApplDetails[i];
//        let property = this.PropertyDetails[i];
//        let temp = {
//            EAD_PR_Id_Fk: null,
//            APP_PA_Name: applicant.APP_PA_Name,
//            EAD_APP_Id_Fk: applicant.APP_Id,
//            APP_No: applicant.APP_No,
//            PR_Property_No: "Zero",
//            CA_CategoryName:applicant.CA_CategoryName,
//            PT_Property_Type: '--',
//            PT_Id: 0,
//            CA_Id: 0,
//            RES_Name: applicant.RES_Name,
//            // SubRes_Name: this.SubRes_Name,
//            // SubRes_Percentage: this.SubRes_Percentage
//        };

//        if(this.clickCount == 1){
//         this.notselectedApplicants.push(temp);
//       }
//      // else if(this.notselectedApplicants.length < this.reservedCount){
//        // debugger;
//         //this.notselectedApplicants = [];
//        // this.selectedApplicants = [];
//         //this.clickCount  = 0;
  
//         //this.reservedCount = 0;
//         //this.ApplAllotDetails.forEach(item => this.notselectedApplicants.push(item));
  
//         // this.ApplAllotDetails.forEach(item => {
//         //   if (!this.notselectedApplicants.some(detail => detail.EAD_APP_Id_Fk === item.EAD_APP_Id_Fk)) {
//         //     this.notselectedApplicants.push(item);
//         //   }
//         // });
  
  
//         //this.ApplAllotDetails.forEach(item => this.selectedApplicants.push(item));
  
//         //this.notselectedApplicants.push(temp);
//      // }



//        this.ApplAllotDetails.push(temp);
//    }
//  }
















// QElotteryAllot() {
//   debugger;
//   let app, prop;
  
//   if (this.EligibleApplDetails.length !== 0 && this.PropertyDetails.length !== 0) {
//     // Filter out the previously allotted applicants
//     const eligibleApplicants = this.EligibleApplDetails.filter(applicant => !this.previouslyAllottedApplicants.includes(applicant.APP_Id));

//     if (eligibleApplicants.length === 0) {
//       swal('', "All applicants have been allotted. No eligible applicants left.", 'warning');
//       return;
//     }

//     // Select a random applicant and property from the remaining pool
//     app = Math.floor(Math.random() * eligibleApplicants.length);
//     prop = Math.floor(Math.random() * this.PropertyDetails.length);

//     let applicant = eligibleApplicants[app];
//     let property = this.PropertyDetails[prop];

//     // Remove the selected applicant from the EligibleApplDetails array
//     // after allotting to ensure they can't be selected again
//     this.EligibleApplDetails = this.EligibleApplDetails.filter(a => a.APP_Id !== applicant.APP_Id);

//     let temp = {
//       EAD_PR_Id_Fk: property.PR_Id,
//       APP_PA_Name: applicant.APP_PA_Name,
//       EAD_APP_Id_Fk: applicant.APP_Id,
//       APP_No: applicant.APP_No,
//       PR_Property_No: property.PR_Property_No,
//       CA_CategoryName: property.CA_CategoryName,
//       PT_Property_Type: property.PT_Property_Type,
//       PT_Id: property.PT_Id,
//       CA_Id: property.CA_Id,
//       RES_Name: applicant.RES_Name,
//       // SubRes_Name: this.SubRes_Name,
//       // SubRes_Percentage: this.SubRes_Percentage
//     };

//     this.ApplAllotDetails.push(temp);

//     // After allotment, remember the applicant's ID to prevent repeat allotment
//     this.previouslyAllottedApplicants.push(applicant.APP_Id);

//   } else {
//     if (this.ApplDetails.length === 0) {
//       swal('', "No Applications or Properties to Allot!", 'warning');
//     } else {
//       swal('', "Elottery Allotment Processed Successfully!", 'success');
//     }
//     return;
//   }
// }

QEAllotlottery(Total_Res_Properties) {
  debugger;
  let respropcount = Total_Res_Properties;
  let applen = respropcount;
  let proplength = this.PropertyDetails.length;
  length = Math.min(applen, proplength);
  // this.totalapplength = this.EligibleApplDetails.length;
  if (this.EligibleApplDetails.length === 0 || this.PropertyDetails.length === 0) {
      swal('', "No Applications or Properties to Allot!", 'success');
      return;
  }
   
  for (let k = 0; k < length; k++) {
    if(this.continue) {
      this.QElotteryAllot();
    }
    else {
      swal('', "All applicants have been included in randomization process!", 'warning');
      break;
    }
  }
  // if(this.continue) {
  this.displayUnallottedApplicants();

  this.appno = null;
  this.propno = null;

  if(this.continue) {
  swal('', "Elottery Allotment Processed Successfully!", 'success');
  }

}

// QElotteryAllot() {
//  // debugger;
//   let app, prop;

//   if (this.EligibleApplDetails.length !== 0 && this.PropertyDetails.length !== 0) {
//       app = Math.floor(Math.random() * this.EligibleApplDetails.length);
//       prop = Math.floor(Math.random() * this.PropertyDetails.length);
//   } else {
//       if (this.ApplDetails.length === 0) {
//           swal('', "No Applications or Properties to Allot!", 'warning');
//       } else {
//           swal('', "Elottery Allotment Processed Successfully!", 'success');
//       }
//       return;
//   }

//   let applicant = this.EligibleApplDetails.splice(app, 1)[0];
//   let property = this.PropertyDetails.splice(prop, 1)[0];
//   console.log(applicant);

//   let temp = {
//       EAD_PR_Id_Fk: property.PR_Id,
//       APP_PA_Name: applicant.APP_PA_Name,
//       EAD_APP_Id_Fk: applicant.APP_Id,
//       APP_No: applicant.APP_No,
//       PR_Property_No: property.PR_Property_No,
//       CA_CategoryName: property.CA_CategoryName,
//       PT_Property_Type: property.PT_Property_Type,
//       PT_Id: property.PT_Id,
//       CA_Id: property.CA_Id,
//       RES_Name: applicant.RES_Name,
//       // SubRes_Name: this.SubRes_Name,
//       // SubRes_Percentage: this.SubRes_Percentage
//   };
//   this.ApplAllotDetails.push(temp);
// }

// displayUnallottedApplicants() {
//   debugger;
//   for (let i = 0; i < this.EligibleApplDetails.length; i++) {
//       let applicant = this.EligibleApplDetails[i];
//       let property = this.PropertyDetails[i];
//       let temp = {
//           EAD_PR_Id_Fk: null,
//           APP_PA_Name: applicant.APP_PA_Name,
//           EAD_APP_Id_Fk: applicant.APP_Id,
//           APP_No: applicant.APP_No,
//           PR_Property_No: "Zero",
//           CA_CategoryName: applicant.CA_CategoryName,
//           PT_Property_Type: '--',
//           PT_Id: 0,
//           CA_Id: 0,
//           RES_Name: applicant.RES_Name,
//           // SubRes_Name: this.SubRes_Name,
//           // SubRes_Percentage: this.SubRes_Percentage
//       };
//       this.ApplAllotDetails.push(temp);
//   }
// }



// Declare a variable to keep track of the already randomized applicants

//new lottery 1-9-2025
 alreadyRandomizedApplicants: Set<string> = new Set();

 QElotteryAllot() {
  let app, prop;
  debugger;
  
  // Filter out applicants that have already been randomized
  const eligibleApplicants = this.EligibleApplDetails.filter(applicant => !this.alreadyRandomizedApplicants.has(applicant.APP_Id));
  
  // if (eligibleApplicants.length < length) {
  //   debugger;
  //   // If no eligible applicants left, show an alert and reset
  //   //this.alreadyRandomizedApplicants.clear();
  //   //this.ApplAllotDetails = []; 
  //   //this.QEAllotlottery(this.applen);
  //   swal('', "All applicants have been included in Randomization process!", 'warning');
  //   return;
  // }
  
  // Randomize an applicant and property
  if(eligibleApplicants.length == 0){
    this.continue = false;
    return;
  }
  else{
  app = Math.floor(Math.random() * eligibleApplicants.length);
  prop = Math.floor(Math.random() * this.PropertyDetails.length);
 
  let applicant = eligibleApplicants[app];  // Randomized applicant from the filtered list
  let property = this.PropertyDetails[prop];  // Randomized property
  console.log(applicant);

  // Add the applicant's ID to the already randomized list to prevent re-selection
  this.alreadyRandomizedApplicants.add(applicant.APP_Id);
  
  // Remove the selected applicant from EligibleApplDetails and property from PropertyDetails
  this.EligibleApplDetails = this.EligibleApplDetails.filter(a => a.APP_Id !== applicant.APP_Id);  // Remove the selected applicant
  this.PropertyDetails = this.PropertyDetails.filter(p => p.PR_Id !== property.PR_Id);  // Remove the selected property
  
  // Create the allocation data object
  let temp = {
    EAD_PR_Id_Fk: property.PR_Id,
    APP_PA_Name: applicant.APP_PA_Name,
    EAD_APP_Id_Fk: applicant.APP_Id,
    APP_No: applicant.APP_No,
    PR_Property_No: property.PR_Property_No,
    CA_CategoryName: property.CA_CategoryName,
    PT_Property_Type: property.PT_Property_Type,
    PT_Id: property.PT_Id,
    CA_Id: property.CA_Id,
    RES_Name: applicant.RES_Name,
  };

  // Push the allocation details into the ApplAllotDetails array
  this.ApplAllotDetails.push(temp);

  // Continue processing as needed
} 
 }

// displayUnallottedApplicants() {
//   debugger;
  
//   // Loop through remaining eligible applicants and display them with null or default values
//   for (let i = 0; i < this.EligibleApplDetails.length; i++) {
//     let applicant = this.EligibleApplDetails[i];
//     let property = this.PropertyDetails[i];
//     let temp = {
//       EAD_PR_Id_Fk: null,
//       APP_PA_Name: applicant.APP_PA_Name,
//       EAD_APP_Id_Fk: applicant.APP_Id,
//       APP_No: applicant.APP_No,
//       PR_Property_No: "Zero",
//       CA_CategoryName: applicant.CA_CategoryName,
//       PT_Property_Type: '--',
//       PT_Id: 0,
//       CA_Id: 0,
//       RES_Name: applicant.RES_Name,
//     };
//     this.ApplAllotDetails.push(temp);
//   }
// }
    // 1-9-2025
displayUnallottedApplicants() {
  debugger;

  for (let i = 0; i < this.EligibleApplDetails.length; i++) {
    let applicant = this.EligibleApplDetails[i];
    
    // Skip applicants that have already been randomized
    // if (this.alreadyRandomizedApplicants.has(applicant.APP_Id)) {
    //   continue; // Skip this applicant
    // }

    let property = this.PropertyDetails[i];
    let temp = {
      EAD_PR_Id_Fk: null,
      APP_PA_Name: applicant.APP_PA_Name,
      EAD_APP_Id_Fk: applicant.APP_Id,
      APP_No: applicant.APP_No,
      PR_Property_No: "Zero",
      CA_CategoryName: applicant.CA_CategoryName,
      PT_Property_Type: '--',
      PT_Id: 0,
      CA_Id: 0,
      RES_Name: applicant.RES_Name,
      // SubRes_Name: this.SubRes_Name,
      // SubRes_Percentage: this.SubRes_Percentage
    };
    this.ApplAllotDetails.push(temp);
  }
}
















  // GetApplicantandPropertyDetailsforQElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id) {
  //   this.SaveElottery()
  //   this.GetEligibleApplicantDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id)
  //   this.GetPropertyDetailsforElottery(lot_Proj_ID, PT_Id, CA_Id)
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.GetAllottedDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id)
  // }

  FinalizeElottery() {
    
    swal({
      title: 'Are you sure?', text: "You want to Finalize!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Finalize!'
    }).then((result) => {
      if (result.value) {
        this.SaveElottery();
      }
    })

  }
  SaveElottery() {
    debugger;
    this.Qlottery.Elot_Id = "Lot-" + this.ApplDetails.Elot_Id;
    this.Qlottery.Elot_Not_Id_Fk = this.Not_ID;
    this.Qlottery.Elot_Proj_Id_Fk = this.Proj_ID;
    this.Qlottery.Elot_PT_Id_Fk = this.PropT_Id;
    this.Qlottery.Elot_CA_Id_Fk = this.CAT_Id;
    this.Qlottery.ElotteryAllotmentModel = this.ApplAllotDetails;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SaveElottery(this.Qlottery)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.GetApplicantandPropertyDetailsforElottery(this.Not_ID, this.Proj_ID, this.PropT_Id, this.CAT_Id, this.RES_Id, this.indexi, this.indexj, this.index,this.Total_Res_Properties,this.R_Created_Date)
          this.ApplAllotDetails = [];
          swal('', "Elottery Allotment Finalized Successfully!", 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  Clear() {
    debugger;

    // if(this.notselectedApplicants.length < this.reservedCount){
    //   this.selectedApplicants = [];
    //   this.notselectedApplicants = [];
    //   this.clickCount = 0;
      //this.ApplAllotDetails.forEach(item => this.notselectedApplicants.push(item));

    // }
    // if(this.clickCount == 0){
    //   this.ApplAllotDetails.forEach(item => this.notselectedApplicants.push(item));
    // }
    this.ApplAllotDetails = [];
    // if(this.clickCount == 0){

    // }


    
    //this.previouslyAllottedApplicants = [];

    this.GetEligibleApplicantDetailsforElottery(this.Not_ID, this.Proj_ID, this.PropT_Id, this.CAT_Id, this.RES_Id)
    this.GetPropertyDetailsforElottery(this.Proj_ID, this.PropT_Id, this.CAT_Id)
  }
}


