import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ErrorHandler } from '../../../shared/ErrorHandler';
//import { projectionDef } from '@angular/core/src/render3';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  PD_id: any;
  PropCount: any;
  // numericpattern = "^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$";
  numericpattern = "^[0-9!@#$&()\\-`.+,/\"]*$";
  numericpatterns = "^[0-9]*$";
  mode: any;
  DSWOId_NO_Id: any;
  Banks: any;
  formInvalid: boolean = false;
  x: {};
  Projects: any;
  PDDetails: any = [];
  BankDetails: any = [];
  p: any = {};
  c: any = {};
  b: any = {};
  dimensionname: any;
  r: any = {};
  RFDetails: any = [];
  Colonylist: any = [];
  CommunicationDetails: any = [];
  Categories: any;
  title = "BSHB Notification";
  data: any;
  f: any = {};
  DistrictList;
  DivisionList: any;
  Division_Id: any;
  Districts1: any;
  DSWOId_NO_Division_Id_Fk: any;
  DSWOId_NO_DI_Id_Fk: any;
  District_Id_Fk: any;
  Branch: any = {};
  DSWOId_NOBD_Bank_Id_FK: any;
  Ifsc: any = {};
  Accountno: any;
  IFSC_Code: any;
  account_no: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.DSWOId_NO_Id = params['DSWOId_NO_Id'];
      this.mode = params['mode'];
      this.GetDSWOIDNotificationDetails(this.DSWOId_NO_Id);
    });

    
    this.GetAllDivision();
    this.GetCategory();
    // this.AddRFDetailsOnLoad();
    this.GetProjects();
    this.GetAllBanks();
  //  this.GetAllDistrict();
    //this.AddPDDetailsOnLoad();
    //this.AddBankDetailsOnLoad();
    //this.AddCommunicationDetailsOnLoad();
  }

  AddRFDetailsOnLoad = function () {
    
    var temp = {};
    this.RFDetails.push(temp);
  }

  AddPDDetailsOnLoad = function () {
    
    var temp = {};
    this.PDDetails.push(temp);
  }

  AddBankDetailsOnLoad = function () {
    
    var temp = {};
    this.BankDetails.push(temp);
  }


  AddCommunicationDetailsOnLoad = function () {
    
    var temp = {};
    this.CommunicationDetails.push(temp);
  }

  GetDSWOIDNotificationDetails(DSWOId_NO_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getDSWOIDNotificationDetails(DSWOId_NO_Id);
    this.data.subscribe(
      (response: any) => {
        this.f = response;
        if (this.f.DSWOId_NO_Date != null)
          this.f.DSWOId_NO_Date = ((this.f.DSWOId_NO_Date).split('T'))[0];
        if (this.f.DSWOId_NO_ApprovedDate != null)
          this.f.DSWOId_NO_ApprovedDate = ((this.f.DSWOId_NO_ApprovedDate).split('T'))[0];
        if (this.f.DSWOId_NO_LastDate != null)
          this.f.DSWOId_NO_LastDate = ((this.f.DSWOId_NO_LastDate).split('T'))[0];
        if (this.f.DSWOId_NO_NewsPaper_Date != null) {
          this.f.DSWOId_NO_NewsPaper_Date = ((this.f.DSWOId_NO_NewsPaper_Date).split('T'))[0];
        }
        this.GetAllDistrict(this.f.DSWOId_NO_Division_Id_Fk);
        this.GetAllColony(this.f.DSWOId_NO_DI_Id_Fk);
        this.PDDetails = this.f.DSWOIDProjectNotificationModels;
        this.RFDetails = this.f.DSWOIDRFNotificationModels;
        this.CommunicationDetails = this.f.DSWOIDCommunicationNotificationModels;
        this.BankDetails = this.f.DSWOIDBankNotificationModels;
console.log("data"+JSON.stringify(response));
        // for (let i = 0; i <= this.BankDetails.length; i++) {
        //   if (this.BankDetails[i].DSWOId_NOBD_Bank_Id_FK != null) {
        //     for (let i = 0; i <= this.Banks.length; i++) {
        //       if (this.BankDetails[i].DSWOId_NOBD_Bank_Id_FK == this.Banks[i].BA_Id) {
        //         this.BankDetails[i].BA_BankName = this.Banks[i].BA_BankName;
        //       }
        //     }
        //   }
        // }

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

  GetAllDistrict(DSWOId_NO_Division_Id_Fk) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllDistrictsnotific(DSWOId_NO_Division_Id_Fk);
    this.data.subscribe(
      (response: any) => {
        this.DistrictList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetAllColony(District_Id_Fk) {
    this.DSWOId_NO_DI_Id_Fk=District_Id_Fk;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllColony(District_Id_Fk);
    this.data.subscribe(
      (response: any) => {
        this.Colonylist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllDivision() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllDivision();
    this.data.subscribe(
      (response: any) => {
        this.DivisionList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetProjects() {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProjects();
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllBanks() { 
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllBanks();
    this.data.subscribe(
      (response: any) => {
        this.Banks = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllBranch(DSWOId_NOBD_Bank_Id_FK) {
    this.setLoadingState(true);
  
    // Reset branch, IFSC, and account details before fetching new data
    this.b.DSWOId_NOBD_Branch = undefined;
    this.b.DSWOId_NOBD_IFSC = undefined;
    this.b.DSWOId_NOBD_Acc_No = undefined;
  
    // Fetch the new branches for the selected bank
    this.userService.getbranchfrombank(DSWOId_NOBD_Bank_Id_FK).subscribe(
      (response: any) => {
        this.Branch = response;
        this.setLoadingState(false);  // Hide loader after data is fetched
      },
      (error) => {
        console.error(error);
        this.setLoadingState(false);  // Hide loader in case of error
      }
    );
  }

  GetAllIFSCcode(DSWOId_NOBD_Bank_Id_FK, DSWOId_NOBD_Branch) {
    this.setLoadingState(true);
  
    // Reset IFSC and account details before fetching new data
    this.b.DSWOId_NOBD_IFSC = undefined;
    this.b.DSWOId_NOBD_Acc_No = undefined;
  
    // Fetch the IFSC and account number for the selected branch
    this.userService.getifsccodefrombranch(DSWOId_NOBD_Bank_Id_FK, DSWOId_NOBD_Branch).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.Ifsc = response;
          // Set the IFSC code and account number
          this.b.DSWOId_NOBD_IFSC = this.Ifsc[0].IFSC_Code;
          this.b.DSWOId_NOBD_Acc_No = this.Ifsc[0].account_no;
        } else {
          console.error('No IFSC code found');
          this.b.DSWOId_NOBD_IFSC = undefined;
          this.b.DSWOId_NOBD_Acc_No = undefined;
        }
        this.setLoadingState(false);  // Hide loader after data is fetched
      },
      (error) => {
        console.error(error);
        this.setLoadingState(false);  // Hide loader in case of error
      }
    );
  }
  
  // Helper function to control the loading state (spinner visibility)
  setLoadingState(isLoading: boolean) {
    const loader = document.getElementById('loader-spinner');
    if (loader) {
      loader.style.display = isLoading ? "block" : "none";
    }
  }

 
  // AddRFDetails = function () {
  //   
  //   // if (this.CheckFinalValidation()) {
  //   var temp = {};
  //   this.RFDetails.push(temp);
  //   //  setTimeout(function () { document.getElementById("b_" + $scope.Packages.length).focus(); }, 100);
  //   //  }
  // }

  RemoveRFDetails = function (position) {
    this.RFDetails.splice(position, 1);
  }

  CheckFinalValidation = function () {
    var result1 = this.CheckRFValidation();

    if (result1 == true)
      return true;
    else
      return false;
  }


  CheckRFValidation = function () {
    let count = 0;
    this.RFDetails.forEach(function (value) {
      console.log(value);
      if (value.DSWOId_NORF_CA_Id_FK != "" && value.DSWOId_NORF_CA_Id_FK != undefined) {
        if (value.DSWOId_NORF_Amount != "" && value.DSWOId_NORF_Amount != undefined)
          return true;
        else
          swal('Warning!', "Please fill all the fields in Approximate Properties ", 'warning');
        count++;
        return false;
      }
      else
        swal('Warning!', "Please fill all the fields in Approximate Properties ", 'warning');
      count++;
      return false;
    });
    if (count > 0)
      return false;
    else
      return true;
  }



  // AddProjectDetails = function () {
  //   if (this.CheckRFValidation()) {
  //     var temp = {};
  //     this.RFDetails.push(temp);
  //     //  setTimeout(function () { document.getElementById("b_" + $scope.Packages.length).focus(); }, 100);
  //   }
  // }

  // RemoveProjectFDetails = function (position) {
  //   this.RFDetails.splice(position, 1);
  // }


  // AddPDDetails(i) {
  //   
  //   //  if (this.checkAllFamilyValidation(p)) {
  //   let temp = {};
  //   this.PDDetails.push(temp);
  //   //    }
  // }

  RemovePDDetails(i) {
    this.PDDetails.splice(i, 1);
  }

  //AddBankDetails(i) {
  // 
  //  if (this.checkAllFamilyValidation(p)) {
  // let temp = {};
  //  this.BankDetails.push(temp);
  // let pos = i + 1;
  // let x= this.BankDetails[i].Branch;
  //this.BankDetails.forEach(function (value, key) {
  //  if (pos == key)
  //   {    value={};
  // // x=" ";
  //   }
  //});

  //    }
  //}

  RemoveBankDetails(i) {
    this.BankDetails.splice(i, 1);
  }

  //AddCommunicationDetails(i) {
  //   
  //  if (this.checkAllFamilyValidation(p)) {
  //  let temp = {};
  //   this.CommunicationDetails.push(temp);
  //    }
  // }

  RemoveCommunicationDetails(i) {
    this.CommunicationDetails.splice(i, 1);
  }

  // GetDimension(pos) {
  //   
  //   for (let i = 0; i <= this.Categories.length; i++) {
  //     var x = this.Categories[i].CA_Id;
  //     var y = this.Categories[i].CA_Dimension;
  //     this.RFDetails.forEach(function (value, key) {
  //       if (pos == key)
  //         if (value.DSWOId_NORF_CA_Id_FK == x)
  //           value.DSWOId_NORF_Dimension = y;
  //     });
  //   }
  //   //  this.r.DSWOId_NORF_Dimension = this.Categories[i].CA_Dimension;
  // }

  // GetProjectDetails(i) {
  //   for (let i = 0; i <= this.Projects.length; i++) {
  //     var x = this.Projects[i].PD_Id;
  //     var District = this.Projects[i].DI_District;
  //     var Taluk = this.Projects[i].TA_Taluk;
  //     var Hobli = this.Projects[i].HO_Name;
  //     var Village = this.Projects[i].VI_Village;
  //     this.PDDetails.forEach(function (value, key) {
  //       if (i == key)
  //         if (value.DSWOId_NOPD_Pd_Id_FK == x)
  //           value.District = District;
  //       value.Taluk = Taluk;
  //       value.Hobli = Hobli;
  //       value.Village = Village;
  //     });
  //   }
  // }

  SaveNotification(Notification: NgForm) {
    
    if (Notification.valid) {
      this.formInvalid = false;
      document.getElementById('loader-spinner').style.display = "block";
      if (this.PDDetails.length == 0) {
        swal('warning!', ' Please fill Project Details.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
      }
      else if (this.RFDetails.length == 0) {
        swal('warning!', ' Please fill RF and ID Details.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
      }

      else if (this.BankDetails.length == 0) {
        swal('warning!', ' Please fill Bank Details.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
      }
      else if (this.CommunicationDetails.length == 0) {
        swal('warning!', ' Please fill Communication Details.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
      }
      else {
        Notification.value.DSWOIDRFNotificationModels = this.RFDetails;
        Notification.value.DSWOIDProjectNotificationModels = this.PDDetails;
        Notification.value.DSWOIDBankNotificationModels = this.BankDetails;
        Notification.value.DSWOIDCommunicationNotificationModels = this.CommunicationDetails;
        this.data = this.userService.saveKHBNotification(Notification.value);
        this.data.subscribe(
          (response) => {
            Notification.reset();
            Notification.resetForm();
            Notification.form.markAsPristine();
            Notification.form.markAsUntouched();
            this.formInvalid = false;
            this.PDDetails = [];
            this.BankDetails = [];
            this.RFDetails = [];
            this.CommunicationDetails = [];
            swal('Success!', ' Demand Survey Notification details has been saved successfully.', 'success');
            document.getElementById('loader-spinner').style.display = "none";
            // window.location.href='http://sainik.esdinfra.com/index.html#/';
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
    }
    else {
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      this.formInvalid = true;
    }
  }


  UpdateNotification(Notification: NgForm) {
    //  if (Notification.valid) {
    this.formInvalid = false;
    document.getElementById('loader-spinner').style.display = "block";
    Notification.value.DSWOIDRFNotificationModels = this.RFDetails;
    Notification.value.DSWOIDProjectNotificationModels = this.PDDetails;
    Notification.value.DSWOIDBankNotificationModels = this.BankDetails;
    Notification.value.DSWOIDCommunicationNotificationModels = this.CommunicationDetails;
    this.data = this.userService.UpdateNotification(this.DSWOId_NO_Id, Notification.value);
    this.data.subscribe(
      (response) => {
        Notification.reset();
        Notification.resetForm();
        Notification.form.markAsPristine();
        Notification.form.markAsUntouched();
        this.formInvalid = false;
        this.PDDetails = [];
        this.BankDetails = [];
        this.RFDetails = [];
        this.CommunicationDetails = [];
        swal('Success!', ' Demand Survey Notification details has been updated successfully.', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        // window.location.href='http://sainik.esdinfra.com/index.html#/';
      }, (error) => {
        console.log(error);
        document.getElementById('loader-spinner').style.display = "none";
      });
    //  }
    // else {
    //   swal('Warning!', 'There are errors, please correct the errors and try again.', 'warning');
    //   this.formInvalid = true;
    // }
  }


  AddRFDetails(r) {
    let bool = 0;
    if (r.DSWOId_NORF_PD_Id_FK == "" || r.DSWOId_NORF_CA_Id_FK == "" || r.DSWOId_NORF_Dimension == "" || r.DSWOId_NORF_Amount == ""
      || r.DSWOId_NORF_ID_Amount == "" || r.DSWOId_NORF_Sites == "" || r.DSWOId_NORF_Houses == ""|| r.DSWOld_NORF_Flat == "" ) { bool = 1 }
    if ((r.DSWOId_NORF_PD_Id_FK != null || r.DSWOId_NORF_PD_Id_FK != undefined) 
      && (r.DSWOId_NORF_CA_Id_FK != null || r.DSWOId_NORF_CA_Id_FK != undefined) &&
      (r.DSWOId_NORF_Dimension != null || r.DSWOId_NORF_Dimension != undefined) 
      && (r.DSWOId_NORF_Sites != null || r.DSWOId_NORF_Sites != undefined) &&
      (r.DSWOId_NORF_Amount != null || r.DSWOId_NORF_Amount != undefined) &&
      (r.DSWOId_NORF_ID_Amount != null || r.DSWOId_NORF_ID_Amount != undefined) &&
      (r.DSWOId_NORF_Houses != null || r.DSWOId_NORF_Houses != undefined) && 
      (r.DSWOld_NORF_Flat != null || r.DSWOld_NORF_Flat != undefined) && 
      bool == 0) {
      let temp = {
        DSWOId_NORF_PD_Id_FK: r.DSWOId_NORF_PD_Id_FK,
        ProjectName: this.GetProjectname(r.DSWOId_NORF_PD_Id_FK),
        DSWOId_NORF_CA_Id_FK: r.DSWOId_NORF_CA_Id_FK,
        categoryName: r.CA_CategoryName,
        DSWOId_NORF_Dimension: r.DSWOId_NORF_Dimension,
        DSWOId_NORF_Amount: r.DSWOId_NORF_Amount,
        DSWOId_NORF_ID_Amount: r.DSWOId_NORF_ID_Amount,
        DSWOId_NORF_Sites: r.DSWOId_NORF_Sites,
        DSWOId_NORF_Houses: r.DSWOId_NORF_Houses,
        DSWOld_NORF_Flat: r.DSWOld_NORF_Flat

      }
      this.RFDetails.push(temp);
      this.r = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
      // this.formSubmitted = true;
    }
  }

  // GetDimension(categoryId: number,Proj_Id) {
  //   for (let i = 0; i <= this.Categories.length; i++) {
  //     if (categoryId == this.Categories[i].CA_Id) {
  //       this.r.DSWOId_NORF_Dimension = this.Categories[i].CA_Dimension;
  //       this.r.CA_CategoryName = this.Categories[i].CA_CategoryName;
  //     }
  //   }
  //   this.GetPropertiesCount(categoryId,Proj_Id);
  // }
  ClearDimension() {
    this.r.DSWOId_NORF_CA_Id_FK = undefined;
    this.r.DSWOId_NORF_Dimension = undefined;
  }
  //----------------------Commented on 14-1-2019 for notification creation without properties----------


  // GetDimension(categoryId, Proj_Id) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetPropertiesCount(categoryId, Proj_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.PropCount = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //       if (this.PropCount == 0) {
  //         swal('warning', 'There is no properties for selected Project Category!', 'warning');
  //         this.r = {};
  //       } else {
  //         for (let i = 0; i <= this.Categories.length; i++) {
  //           if (categoryId == this.Categories[i].CA_Id) {
  //             this.r.DSWOId_NORF_Dimension = this.Categories[i].CA_Dimension;
  //             this.r.CA_CategoryName = this.Categories[i].CA_CategoryName;
  //           }
  //         }
  //       }
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  //-------------------------------END-------------------------------------------------

  GetDimension(categoryId, Proj_Id) {
    for (let i = 0; i <= this.Categories.length; i++) {
      if (categoryId == this.Categories[i].CA_Id) {
        this.r.DSWOId_NORF_Dimension = this.Categories[i].CA_Dimension;
        this.r.CA_CategoryName = this.Categories[i].CA_CategoryName;
      }
    }
  }

  GetProjectname(PD_Id) {
    for (let i = 0; i <= this.PDDetails.length; i++) {
      if (this.PDDetails[i].DSWOId_NOPD_Pd_Id_FK == PD_Id) {
        return this.PDDetails[i].ProjectName;
      }
    }
  }


  AddPDDetails(p) {
    // 
    let bool = 0;
    // for (let i = 1; i <= this.PDDetails.length; i++) {
    //   if (this.PDDetails[i].DSWOId_NOPD_Pd_Id_FK == p.DSWOId_NOPD_Pd_Id_FK) {
    //     state = 1;
    //   }
    // }
    // if (state != 1) {
    //   state = 0;
    if (p.DSWOId_NOPD_Pd_Id_FK == "" || p.District == "" || p.Taluk == "" || p.Hobli == "" || p.Village == "" || p.DSWOId_NOPD_SurveyNo == "" ||
      p.DSWOId_NOPD_Acres == "" || p.DSWOId_NOPD_Guntas == "") { bool = 1 }
    if ((p.DSWOId_NOPD_Pd_Id_FK != null || p.DSWOId_NOPD_Pd_Id_FK != undefined) 
      && (p.District != null || p.District != undefined) 
      &&(p.Taluk != null || p.Taluk != undefined) 
      && (p.Village != null || p.Village != undefined) 
      // && (p.Hobli != null || p.Hobli != undefined) 
      &&(p.DSWOId_NOPD_SurveyNo != null || p.DSWOId_NOPD_SurveyNo != undefined) 
      &&(p.DSWOId_NOPD_Acres != null || p.DSWOId_NOPD_Acres != undefined) 
      // &&(p.DSWOId_NOPD_Guntas != null || p.DSWOId_NOPD_Guntas != undefined) 
      && bool == 0
    ) {
      let temp = {
        DSWOId_NOPD_Pd_Id_FK: p.DSWOId_NOPD_Pd_Id_FK,
        ProjectName: p.PD_Project_Name,
        District: p.District,
        Taluk: p.Taluk,
        // Hobli: p.Hobli,
        Village: p.Village,
        DSWOId_NOPD_SurveyNo: p.DSWOId_NOPD_SurveyNo,
        DSWOId_NOPD_Acres: p.DSWOId_NOPD_Acres,
        // DSWOId_NOPD_Guntas: p.DSWOId_NOPD_Guntas
      }
      this.PDDetails.push(temp);
      this.p = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
      // this.formSubmitted = true;
    }
    // }
    // else {
    //   swal('warning', 'Project Details already exist.', 'warning');
    // }
  }



  GetProjectDetails(projectId: number) {
    for (let i = 0; i <= this.Projects.length; i++) {
      if (projectId == this.Projects[i].PD_Id) {
        this.p.District = this.Projects[i].DI_District;
        this.p.Taluk = this.Projects[i].TA_Taluk;
        this.p.Hobli = this.Projects[i].HO_Name;
        this.p.Village = this.Projects[i].PD_Village;
        this.p.PD_Project_Name = this.Projects[i].PD_Project_Name;

      }
    }
  }


  AddBankDetails(b) {
    let bool = 0;
    if (b.DSWOId_NOBD_Bank_Id_FK == "" || b.DSWOId_NOBD_Branch == "" || b.DSWOId_NOBD_IFSC == "" || b.DSWOId_NOBD_Acc_No == "") { bool = 1 }
    if ((b.DSWOId_NOBD_Bank_Id_FK != null || b.DSWOId_NOBD_Bank_Id_FK != undefined) && (b.DSWOId_NOBD_Branch != null
      || b.DSWOId_NOBD_Branch != undefined) &&
      (b.DSWOId_NOBD_IFSC != null || b.DSWOId_NOBD_IFSC != undefined) && (b.DSWOId_NOBD_Acc_No != null || b.DSWOId_NOBD_Acc_No != undefined) && bool == 0) {
      let temp = {
        // DSWOId_NOBD_PD_Id_FK: b.DSWOId_NOBD_PD_Id_FK,
        // ProjectName: this.GetProjectname(b.DSWOId_NOBD_PD_Id_FK),
        DSWOId_NOBD_Bank_Id_FK: b.DSWOId_NOBD_Bank_Id_FK,
        BA_BankName: this.GetBankName(b.DSWOId_NOBD_Bank_Id_FK),
        DSWOId_NOBD_Branch: b.DSWOId_NOBD_Branch,
        DSWOId_NOBD_IFSC: b.DSWOId_NOBD_IFSC,
        DSWOId_NOBD_Acc_No: b.DSWOId_NOBD_Acc_No
      }
      this.BankDetails.push(temp);
      this.b = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
      // this.formSubmitted = true;
    }
  }

  GetBankName(DSWOId_NOBD_Bank_Id_FK) {
    for (let i = 0; i <= this.Banks.length; i++) {
      if (this.Banks[i].BA_Id == DSWOId_NOBD_Bank_Id_FK) {
        return this.Banks[i].BA_BankName;
      }
    }
  }
  AddCommunicationDetails(c) {
    
    let bool = 0;
    if (c.DSWOID_NOCD_Website == "" || c.DSWOID_NOCD_ExtensionNo == "" || c.DSWOID_NOCD_ContactNo == "") { bool = 1 }
    if ((c.DSWOID_NOCD_ContactNo != null || c.DSWOID_NOCD_ContactNo != undefined) && (c.DSWOID_NOCD_Website != null
      || c.DSWOID_NOCD_Website != undefined) &&
      (c.DSWOID_NOCD_ExtensionNo != null || c.DSWOID_NOCD_ExtensionNo != undefined) && bool == 0) {
      let temp = {
        // DSWOID_NOCD_PD_Id_FK: c.DSWOID_NOCD_PD_Id_FK,
        // ProjectName: this.GetProjectname(c.DSWOID_NOCD_PD_Id_FK),
        DSWOID_NOCD_Website: c.DSWOID_NOCD_Website,
        DSWOID_NOCD_ContactNo: c.DSWOID_NOCD_ContactNo,
        DSWOID_NOCD_ExtensionNo: c.DSWOID_NOCD_ExtensionNo
      }
      this.CommunicationDetails.push(temp);
      this.c = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
      // this.formSubmitted = true;
    }
  }
  ClearPDDetails() {
    
    this.p = {};
  }
  ClearBankDetails() {
    
    this.b = {};
  }
  

}
