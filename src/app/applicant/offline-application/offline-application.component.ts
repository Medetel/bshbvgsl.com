import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { Application } from '../../shared/user.model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-offline-application',
    templateUrl: './offline-application.component.html',
    styleUrls: ['./offline-application.component.css']
})
export class offlineapplicationComponent implements OnInit {

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
    Categories: any;
    Districts: any;
    Taluks: any;
    Villages: any;
    Hoblis: any;
    title = "Application Form आवेदन-अर्थ ";
    data: any;
    Gender = "male";
    app: any;
    fileToUpload: File = null;
    formInvalid: boolean = false;
    PAPhotoimageUrl: string = "assets/images/photo.png";
    SAPhotoimageUrl: string = "assets/images/photo.png";
    PASignatureimageUrl: string = "assets/images/signature.png";
    SASignatureimageUrl: string = "assets/images/signature.png";
    PAAadhaarimageUrl: string = "assets/images/default.png";
    SAAadhaarimageUrl: string = "assets/images/default.png";
    SAPancardimageUrl: string = "assets/images/default.png";
    PAPancardimageUrl: string = "assets/images/default.png"
    mode: string = "save";
    numericpattern = "^[0-9]*$";
    emailpattern = "^[a-zA-Z0-9._%-+]+@[a-z0-9.-]+\.[a-z]{2,3}$";
    NO_Id: any;
    PD_Id: any;
    appmode: any;
    banklist;
    payment_mode: any;
    GRelations;
    userName: any;
    copyAddress: boolean = false;
    //Meghana
  
    primaryKey: any = 0;
    row_no: any = 0;
    details: any;
    fromUtility: boolean = false;
    r: any = [];
    id: string;
    pdId: string;
    role: string;
    comnp: any;
    Notifications: any;
    Projects: any;
    notify: number;
    proj_id: any;
    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
        this.app = new Application()
        this.app.APP_IsJoint = 'N';
        this.app.APP_PropertyType = 'Site';
        this.app.terms = false;
    }


    ngOnInit() {
        debugger;
        this.userName = localStorage.getItem('userName');
        this.GetByIdApplicantNotifications(this.userName);
        this.GetNotifications();
        this.GetAllDistrict();
        // this.GetCategory();
        this.GetRelations();
        this.GetRelegions();
        this.GetReservations();
        // this.GetGuardianRelation();
        // this.route.params.subscribe(params => {
        //   //  this.mode = params['mode'];
        //   this.APP_Id = params['APP_Id'];
        // });
    
        // this.route.params.subscribe(params => {
        //   //  this.mode = params['mode'];
        //   this.NO_Id = params['NO_Id'];
        // });
    
        // this.route.params.subscribe(params => {
        //   //  this.mode = params['mode'];
        //   this.PD_Id = params['PD_Id'];
        //   this.appmode = params['appmode'];
        // });
        this.GetAllBanks(this.NO_Id);
        if (this.APP_Id != null)
          this.GetApplicationFormDetails(this.APP_Id);
        if (this.NO_Id != null && this.PD_Id != null)
          this.GetProjectDetails(this.NO_Id, this.PD_Id);
    
    
        /**Meghana */
    
    
    
    
        //Route form utilities
        this.row_no = localStorage.getItem('row_no');
        this.primaryKey = localStorage.getItem('PrimaryKey');
        if (this.row_no > 0) {
          this.mode = 'View';
          this.getEditData()
        }

        // this.route.queryParams.subscribe(params => {
        //     this.id = params['id'];
        //     this.pdId = params['pdId'];
        //     this.role = params['role'];
        //   });
        this.GetNotifications();
        this.getAllProjectDetailsForScrutiny();
        // this.GetAllDistrict();
        // this.GetCategory();
        // this.GetRelations();
        // this.GetRelegions();
        // this.GetReservations();
        // this.route.params.subscribe(params => {
        //     this.APP_Id = params['APP_Id'];
        // });

        // this.route.params.subscribe(params => {
           
        //     this.NO_Id = params['NO_Id'];
        // });

        // this.route.params.subscribe(params => {
        //     this.PD_Id = params['PD_Id'];
        //     this.appmode = params['appmode'];
        // });
        // this.GetAllBanks(this.NO_Id);
        // if (this.APP_Id != null)
        //     this.GetApplicationFormDetails(this.APP_Id);
        // if (this.NO_Id != null && this.PD_Id != null)
        //     this.GetProjectDetails(this.NO_Id, this.PD_Id);
        // this.comnp.APP_IsJoint = 'N';
        // this.comnp.APP_PropertyType = 'Plot';

        // this.route.params.subscribe(params => {                                                     
        //     this.APP_No = params['APP_No'];
        //     this.mode = params['mode'];
        //     if (this.APP_No != null) {
        //         this.GetApplicantDetailsById(this.APP_No)
        //     }
        // });                                                                                      
    }

    // FillApplication() {

    //     this.app.APP_PA_Relation_Name = "Mahesh";
    //     this.app.APP_Relegion_Id_FK = 1;
    //     this.app.APP_AnnualIncome = "60000";
    //     this.app.APP_YearsResiding = "16";
    //     this.app.APP_NomineeName = "Jagdeesh";
    //     this.app.APP_Address1 = "#21, 2nd Phase, JP Nagar";
    //     this.app.APP_Address2 = "#8/89, 3rd Main, BSK";
    //     this.app.APP_Pincode = "560090";
    //     this.app.APP_PA_AlternateNo = "9900334455";
    //     this.app.APP_BankName = "SBI";
    //     this.app.APP_BankBranch = "JP Nagar";
    //     this.app.APP_IFSC = "SBI00000089";
    //     this.app.APP_AccountNo = "6644827723833345";
    //     this.app.APP_Nominee_Relation_Id_FK = 1;
       
    // }
    // GetApplicationFormDetails(APP_Id) {

    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getApplicationFormDetails(APP_Id);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.app = response;
    //             this.app.APP_HO_Name = response.DistrictandTaluks.HO_Name;
    //             this.app.APP_VI_Name = response.DistrictandTaluks.VI_Village;
    //             this.app.APP_CA_Id_FK = response.Categories.CA_Id;
    //             this.mode = "update";
    //             if (this.app.APP_PA_Gender == 'M')
    //                 this.app.APP_PA_Gender = 'Male';
    //             else if (this.app.APP_PA_Gender == 'F')
    //                 this.app.APP_PA_Gender = 'Female';
    //             else
    //                 this.app.APP_PA_Gender = 'Transgender';

    //             if (this.app.APP_SA_Gender == 'M')
    //                 this.app.APP_SA_Gender = 'Male';
    //             else if (this.app.APP_SA_Gender == 'F')
    //                 this.app.APP_SA_Gender = 'Female';
    //             else
    //                 this.app.APP_SA_Gender = 'Transgender';

    //             if (this.app.APP_PA_DOB != null)
    //                 this.app.APP_PA_DOB = ((this.app.APP_PA_DOB).split('T'))[0];
    //             if (this.app.APP_SA_DOB != null)
    //                 this.app.APP_SA_DOB = ((this.app.APP_SA_DOB).split('T'))[0];
    //             this.GetTaluks(this.app.APP_DI_Id_FK);
    //             this.GetHobli(this.app.APP_TA_Id_FK);
    //             this.GetVillages(this.app.APP_HO_Id_FK);
    //             if (this.app.APP_PA_Photo != null) {
    //                 this.PAPhotoimageUrl = response.APP_PA_Photo;
    //                 this.app.APP_PA_Photo = response.APP_PA_Photo;
    //             }
    //             if (this.app.APP_SA_Photo != null) {
    //                 this.SAPhotoimageUrl = response.APP_SA_Photo;
    //                 this.app.APP_SA_Photo = response.APP_SA_Photo;
    //             }
    //             if (this.app.APP_PA_Signature != null) {
    //                 this.PASignatureimageUrl = response.APP_PA_Signature;
    //                 this.app.APP_PA_Signature = response.APP_PA_Signature;
    //             }
    //             if (this.app.APP_SA_Signature != null) {
    //                 this.SASignatureimageUrl = response.APP_SA_Signature;
    //                 this.app.APP_SA_Signature = response.APP_SA_Signature;
    //             }
    //             if (this.app.APP_PA_AdharCard != null) {
    //                 this.PAAadhaarimageUrl = response.APP_PA_AdharCard;
    //                 this.app.APP_PA_AdharCard = response.APP_PA_AdharCard;
    //             }
    //             if (this.app.APP_SA_AdharCard != null) {
    //                 this.SAAadhaarimageUrl = response.APP_SA_AdharCard;
    //                 this.app.APP_SA_AdharCard = response.APP_SA_AdharCard;
    //             }
    //             if (this.app.APP_ESW_Certificate != null) {
    //                 this.app.APP_ESW_Certificate = response.APP_ESW_Certificate;
    //             }
    //             if (this.app.APP_Caste_Certificate != null) {
    //                 this.app.APP_Caste_Certificate = response.APP_Caste_Certificate;
    //             }
    //             this.CalculateAge(response.APP_PA_DOB);
    //             this.CalculateSAAge(response.APP_SA_DOB);               
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetAllBanks(NO_Id) {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.GetAllBanks(NO_Id);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.banklist = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetProjectDetails(NO_Id, PD_Id) {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getProjectDetails(NO_Id, PD_Id);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.PD = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // CalculateAge(dateOfBirth) {
    //     this.data = this.userService.calculateAge(dateOfBirth);
    //     this.data.subscribe(
    //         (response: any) => {
    //             if (response >= 18)
    //                 this.APP_PA_Age = response;
    //             else {
    //                 swal('Warning!', "Age cannot be less than 18 years to apply", 'warning');
    //                 this.app.APP_PA_DOB = null;
    //                 this.APP_PA_Age = null;
    //             }
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // CalculateSAAge(dateOfBirth) {
    //     this.data = this.userService.calculateAge(dateOfBirth);
    //     this.data.subscribe(
    //         (response: any) => {
    //             if (response >= 18)
    //                 this.APP_SA_Age = response;
    //             else {
    //                 swal('Warning!', "Age cannot be less than 18 years to apply", 'warning');
    //                 this.app.APP_SA_DOB = null;
    //                 this.APP_SA_Age = null;
    //             }
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetAllDistrict() {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getAllDistrictName();
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Districts = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetTaluks(DistrictId) {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getAllTalukName(DistrictId);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Taluks = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetHobli(TalukId) {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getAllHobliName(TalukId);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Hoblis = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetVillages(HobliId) {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getAllVillageName(HobliId);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Villages = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetCategory() {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getCategory();
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Categories = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetGuardianRelation() {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.GetGuardianRelation();
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.GRelations = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetRelations() {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getRelations();
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Relations = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetRelegions() {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getRelegions();
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Relegions = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // GetReservations() {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getReservations();
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.Reservations = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }    

    // PAPhotoFileInput(file: FileList) {

    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.PAPhotoimageUrl = event.target.result;
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                   
    //                 this.app.APP_PA_PhotoErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_PA_Photo');
    //                 i.value = "";
    //                 if (error.status == 400) {
    //                     this.PAPhotoimageUrl = "assets/images/photo.png";
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_PA_Photo');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload image file less than 2mb", 'warning');
    //     }
    // }

    // getPAPhotoPrintImage() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_PA_Photo');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }

    // SAPhotoFileInput(file: FileList) {

    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.SAPhotoimageUrl = event.target.result;
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                  
    //                 this.app.APP_SA_PhotoErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_SA_Photo');
    //                 i.value = "";
    //                 if (error.status == 400) {
    //                     this.SAPhotoimageUrl = "assets/images/photo.png";
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_SA_Photo');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload image file less than 2mb", 'warning');
    //     }
    // }
    // getSAPhotoPrintImage() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_SA_Photo');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }
    // PASignatureFileInput(file: FileList) {

    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.PASignatureimageUrl = event.target.result;
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                 
    //                 this.app.APP_PA_SignatureErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_PA_Signature');
    //                 i.value = "";
    //                 if (error.status == 400) {
    //                     this.PASignatureimageUrl = "assets/images/signature.png";
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_PA_Signature');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload image file less than 2mb", 'warning');
    //     }
    // }

    // getPASignaturePrintImage() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_PA_Signature');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }


    // SASignatureFileInput(file: FileList) {

    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.SASignatureimageUrl = event.target.result;
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                   
    //                 this.app.APP_SA_SignatureErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_SA_Signature');
    //                 i.value = "";
    //                 if (error.status == 400) {
    //                     this.SASignatureimageUrl = "assets/images/signature.png";
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_SA_Signature');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload image file less than 2mb", 'warning');
    //     }
    // }

    // getSASignaturePrintImage() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_SA_Signature');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }

    // PAAadhaarFileInput(file: FileList) {

    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.PAAadhaarimageUrl = event.target.result;
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                   
    //                 this.app.APP_PAAadhaarErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_PA_AdharCard');
    //                 i.value = "";
    //                 if (error.status == 400) {
    //                     this.PAAadhaarimageUrl = "assets/images/default.png";
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_PA_AdharCard');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload image file less than 2mb", 'warning');
    //     }
    // }

    // getPAAdharCardPrintImage() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_PA_AdharCard');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }

    // SAAadhaarFileInput(file: FileList) {
    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.SAAadhaarimageUrl = event.target.result;
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                   
    //                 this.app.APP_SAAadhaarErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_SA_AdharCard');
    //                 i.value = "";
    //                 if (error.status == 400) {
    //                     this.SAAadhaarimageUrl = "assets/images/default.png";
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_SA_AdharCard');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload image file less than 2mb", 'warning');
    //     }
    // }

    // getSAAdharCardPrintImage() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_SA_AdharCard');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }
    // ESWFileInput(file: FileList) {
    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
             
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                    
    //                 this.app.ESW_CertificateErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_ESW_Certificate');
    //                 i.value = "";
    //                 if (error.status == 400) {                      
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_ESW_Certificate');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension pdf", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload file less than 2mb", 'warning');
    //     }
    // }

    // getESWFileInput() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_ESW_Certificate');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }
    // CasteFileInput(file: FileList) {
    //     let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    //     let s: any = file.item(0).size / 1024;
    //     let size: any = parseFloat(s).toFixed(2);
    //     let uploadedFilename = file.item(0).name;
    //     if (uploadedFilename.match(regex) && (size <= 2048)) {
    //         this.fileToUpload = file.item(0);
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
              
    //         }
    //         reader.readAsDataURL(this.fileToUpload);
    //         const data = new FormData();
    //         data.append("UploadedImage", file.item(0));
    //         let x = this.userService.uploadImage(data);
    //         x.subscribe(
    //             (response) => {                    
    //                 this.app.Caste_CertificateErrorMessage = "";
    //             }, (error) => {
    //                 let i: any = document.getElementById('APP_Caste_Certificate');
    //                 i.value = "";
    //                 if (error.status == 400) {                      
    //                     swal('Warning!', error.error.Message, 'warning');
    //                 }
    //             });
    //     }
    //     else {
    //         let i: any = document.getElementById('APP_Caste_Certificate');
    //         i.value = "";
    //         if (!uploadedFilename.match(regex))
    //             swal('Warning!', "Please upload image file with extension pdf", 'warning');
    //         else if (size > 2048)
    //             swal('Warning!', "Please upload file less than 2mb", 'warning');
    //     }
    // }

    // getCasteFileInput() {
    //     let imagename = null;
    //     try {
    //         imagename = document.getElementById('APP_Caste_Certificate');
    //         return imagename.files[0].name;
    //     }
    //     catch (e) {
    //         return null;
    //     }
    // }
    // getApplicationNo(APP_No) {

    //     if (APP_No.length == 11) {
    //         this.CheckApplicationNo(APP_No);
    //     }
    // }

    // CheckApplicationNo(App_Number) {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.CheckApplicationNo(App_Number);
    //     this.data.subscribe(
    //         (response: any) => {
    //             if (response == "Exist") {
    //                 swal('Warning!', 'Application Number Already Exist.', 'warning');
    //                 this.app.APP_No = null;
    //             }
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }
   
    // SaveOfflineApplication(Application: NgForm, APP_PA_Age: any, comnp: any) {        
    //         if (Application.valid) {
    //             if (this.CheckFinalValidation(Application.value.APP_CA_Id_FK, Application.value.APP_AnnualIncome)) {
    //                 this.payment_mode = Application.value.APP_Payment_type;
    //                 Application.value.APP_PA_Age = APP_PA_Age;
    //                 Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
    //                 Application.value.APP_SA_Photo = this.getSAPhotoPrintImage();
    //                 Application.value.APP_PA_Signature = this.getPASignaturePrintImage();
    //                 Application.value.APP_SA_Signature = this.getSASignaturePrintImage();
    //                 Application.value.APP_PA_AdharCard = this.getPAAdharCardPrintImage();
    //                 Application.value.APP_SA_AdharCard = this.getSAAdharCardPrintImage();
    //                 Application.value.APP_ESW_Certificate = this.getESWFileInput();
    //                 Application.value.APP_Caste_Certificate = this.getCasteFileInput();
                   
    //                 Application.value.APP_Not_Id_Fk = comnp.APP_Not_Id_Fk;
    //                 Application.value.APP_Project_Id_FK = comnp.APP_Project_Id_FK;
    //                 Application.value.APP_CA_Id_FK = comnp.APP_CA_Id_FK;
    //                 Application.value.APP_PropertyType = comnp.APP_PropertyType;                                
    //                 Application.value.APP_IsJoint = comnp.APP_IsJoint;                                        

    //                 this.app.APP_PA_Photo = Application.value.APP_PA_Photo;
    //                 this.formInvalid = false;
    //                 this.APP_PA_Age = Application.value.APP_PA_Age;
    //                 document.getElementById('loader-spinner').style.display = "block";
    //                 Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
    //                 Application.value.PD_Id = this.PD_Id;                  
    //                 this.data = this.userService.SaveOfflineApplication(Application.value);
    //                 this.data.subscribe(
    //                     (response) => {
    //                         this.APP_Id = response;                           
    //                         Application.reset();
    //                         Application.resetForm();
                           
    //                         document.body.scrollTop = 0;
    //                         document.documentElement.scrollTop = 0;
                          
    //                         this.formInvalid = false;                          
    //                         swal('Success!', 'Application No: ' + response + ' Submitted Successfully', 'success');
    //                         document.getElementById('loader-spinner').style.display = "none";
                           
    //                         document.getElementById('loader-spinner').style.display = "none";

    //                     }, (error) => {
    //                         document.getElementById('loader-spinner').style.display = "none";
    //                         if (error.status == 401) {
    //                             this.errorHandler.handleError(error);
    //                         }
    //                         else if (error.status == 400) {
    //                             swal('Warning!', error.error.Message, 'warning');
    //                         }
    //                     });
                    
    //             }
    //             else {
    //                 swal('Warning!', 'Please fill all mandatory fields.', 'warning');
    //                 this.formInvalid = true;
    //             }
    //         }
    //         else {
    //             swal('Warning!', 'Please fill all mandatory fields.', 'warning');
    //             this.formInvalid = true;
    //         }       
    // }

    // reload() {
        
    //     this.comnp.APP_IsJoint = 'N';
    //     this.comnp.APP_PropertyType = 'Plot';
    // }

    // CheckFinalValidation(APP_CA_Id_FK, APP_AnnualIncome) {
    //     var result1 = this.CheckAnnualIncome(APP_CA_Id_FK, APP_AnnualIncome);

    //     if (result1 == true)
    //         return true;
    //     else
    //         return false;
    // }

    // CheckAnnualIncome(APP_CA_Id_FK, APP_AnnualIncome) {
    //     if (APP_CA_Id_FK == 1) {
    //         if (APP_AnnualIncome <= 80000 || APP_AnnualIncome <= "80000.00" || APP_AnnualIncome <= "80,000.00") {
    //             this.app.APP_AnnualIncomeErrorMessage = "";
    //             return true;
    //         }
    //         else {
    //             this.app.APP_AnnualIncomeErrorMessage = "Amount cannot be greater then 80K if category is EWS";
    //             return false;
    //         }
    //     }
    //     else {
    //         this.app.APP_AnnualIncomeErrorMessage = "";
    //         return true;
    //     }
    // }

    // UpdateApplication(APP_Id, Application: NgForm, APP_PA_Age, APP_No) {       
    //     this.formInvalid = false;
    //     document.getElementById('loader-spinner').style.display = "block";
    //     Application.value.APP_PA_Age = APP_PA_Age;
    //     this.payment_mode = Application.value.APP_Payment_type;
    //     Application.value.APP_Not_Id_Fk = this.comnp.APP_Not_Id_Fk;           
    //     Application.value.APP_Project_Id_FK = this.comnp.APP_Project_Id_FK;   
    //     Application.value.APP_CA_Id_FK = this.comnp.APP_CA_Id_FK;            
    //     Application.value.APP_PropertyType = this.comnp.APP_PropertyType;   
    //     Application.value.APP_IsJoint = this.comnp.APP_IsJoint;             
      
    //     if (Application.value.APP_PA_Photo != null && !Application.value.APP_PA_Photo.match("http"))
    //         Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
    //     if (Application.value.APP_SA_Photo != null && !Application.value.APP_SA_Photo.match("http"))
    //         Application.value.APP_SA_Photo = this.getSAPhotoPrintImage();       
    //     if (Application.value.APP_PA_Signature != null && !Application.value.APP_PA_Signature.match("http"))
    //         Application.value.APP_PA_Signature = this.getPASignaturePrintImage();
    //     if (Application.value.APP_SA_Signature != null && !Application.value.APP_SA_Signature.match("http"))
    //         Application.value.APP_SA_Signature = this.getSASignaturePrintImage();
    //     if (Application.value.APP_PA_AdharCard != null && !Application.value.APP_PA_AdharCard.match("http"))
    //         Application.value.APP_PA_AdharCard = this.getPAAdharCardPrintImage();
    //     if (Application.value.APP_SA_AdharCard != null && !Application.value.APP_SA_AdharCard.match("http"))
    //         Application.value.APP_SA_AdharCard = this.getSAAdharCardPrintImage();
    //     if (Application.value.APP_ESW_Certificate != null && !Application.value.APP_ESW_Certificate.match("http"))
    //         Application.value.APP_ESW_Certificate = this.getESWFileInput();
    //     if (Application.value.APP_Caste_Certificate != null && !Application.value.APP_Caste_Certificate.match("http"))
    //         Application.value.APP_Caste_Certificate = this.getCasteFileInput();
    //     Application.value.APP_PA_Age = this.APP_PA_Age;       
    //     this.data = this.userService.updateApplicationofoffline(APP_No, Application.value);
    //     this.data.subscribe(
    //         (response) => {             
    //             Application.reset();
    //             Application.resetForm();
    //             this.formInvalid = false;
    //             swal('Success!', 'Application No.: ' + APP_No + ' ' + 'details has been updated successfully.', 'success');
    //             this.router.navigate(['/home/offline-application-grid']);              
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //             if (error.status == 401) {
    //                 this.errorHandler.handleError(error);
    //             }
    //             else if (error.status == 400) {
    //                 swal('Warning!', error.error.Message, 'warning');
    //             }
    //         });
                                                                               
    // }

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

    // GenerateAppNo(CA_Id) {
    //     for (let i = 0; i < this.Categories.length; i++) {
    //         if (this.Categories[i].CA_Id == CA_Id) {
    //             this.APP_Number = ((this.Categories[i].CA_CategoryName).split('-'))[0];
    //         }
    //     }
    // }
                                                                
    // GetApplicantDetailsById(APP_No) {
        
    //     this.showappdetails = true;
    //     this.showfindetails = true;      
    //     this.GetApplicationScrutinyQueryDetailsForUpdate(APP_No);
    //     this.getAppViewProjectQueryDetailsForUpdate(APP_No);
    // }

    // GetApplicationScrutinyQueryDetailsForUpdate(APP_No) {
        
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.GetApplicationScrutinyQueryDetailsForUpdate(APP_No);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.app = response;    
    //             this.comnp = response;   
    //             this.comnp.APP_CA_Id_FK = response.Categories.CA_Id;
                
    //             if (this.app.APP_PA_DOB != null)
    //                 this.app.APP_PA_DOB = ((this.app.APP_PA_DOB).split('T'))[0];
    //                 this.CalculateAge(this.app.APP_PA_DOB);

    //             if (this.app.APP_SA_DOB != null)
    //                 this.app.APP_SA_DOB = ((this.app.APP_SA_DOB).split('T'))[0];
    //                 this.CalculateSAAge(this.app.APP_SA_DOB);

    //             if (this.comnp.APP_PropertyType == 'S&S' || this.comnp.APP_PropertyType == 'Plot')
    //                 this.comnp.APP_PropertyType = 'Plot';
    //             else if (this.comnp.APP_PropertyType == 'CHS')
    //                 this.app.APP_PropertyType = 'House';
    //             else
    //                 this.app.APP_PropertyType = 'Flat';

    //             if (this.comnp.APP_IsJoint == 'N')  
    //                 this.comnp.APP_IsJoint = 'N';
    //             else
    //                 this.comnp.APP_IsJoint = 'Y';

    //             if (this.app.APP_PA_Gender == 'F') {
    //                 this.app.APP_PA_Gender = 'Female';                 
    //             }
    //             else if (this.app.APP_PA_Gender == 'M') {
    //                 this.app.APP_PA_Gender = 'Male';                 
    //             }
    //             else {
    //                 this.app.APP_PA_Gender = 'TansGender';                   
    //             }

    //             if (this.app.APP_SA_Gender == 'F') {
    //                 this.app.APP_SA_Gender = 'Female';                
    //             }
    //             else if (this.app.APP_SA_Gender == 'M') {
    //                 this.app.APP_SA_Gender = 'Male';                 
    //             }
    //             else {
    //                 this.app.APP_SA_Gender = 'TansGender';                   
    //             }

    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }

    // getAppViewProjectQueryDetailsForUpdate(APP_No) {
    //     document.getElementById('loader-spinner').style.display = "block";
    //     this.data = this.userService.getAppViewProjectQueryDetailsForUpdate(APP_No);
    //     this.data.subscribe(
    //         (response: any) => {
    //             this.PD = response;
    //             document.getElementById('loader-spinner').style.display = "none";
    //         }, (error) => {
    //             document.getElementById('loader-spinner').style.display = "none";
    //         });
    // }           
    
    
    GetByIdVerify(appRegNo: any) {
    
        // Display the loader spinner
        document.getElementById('loader-spinner').style.display = "block";
    
        // Call the user service to get verification data by mobile number
        this.data = this.userService.GetByIdverification(appRegNo);
    
        // Subscribe to the observable returned by the service
        this.data.subscribe(
          (response: any) => {
            // Handle the successful response
            this.r = response;
            console.log('verify data:', JSON.stringify(this.r));
            
            // Check if the response contains an error message
            if (this.r.code === 200 && this.r.message === "Applicant not registered") {
              // Show error message if the applicant is not registered
              swal('Error!', this.r.message, 'error');
            } else {
              // Display success message using SweetAlert
              swal('Success!', 'Verified Successfully.', 'success');
              
              // Prepare navigation extras with the mobile number as query params
            //   const navigationExtras: NavigationExtras = {
            //     queryParams: { data: appRegNo,
            //       id:this.id, pdId: this.pdId, role: this.role
            //      }
            //   };
    
              // Navigate to the form applicant page with query params
            //   this.router.navigate(['/form-applicant'], navigationExtras);
            }
            
            // Hide the loader spinner
            document.getElementById('loader-spinner').style.display = "none";
          }, 
          (error) => {
            // Handle errors
            console.error(error);
    
            // Show error message
            swal('Error!', 'An error occurred. Please try again.', 'error');
    
            // Hide the loader spinner on error
            document.getElementById('loader-spinner').style.display = "none";
          }
        );
    }//By me

    
  getEditData() {

    if (this.row_no > 0) {
      this.fromUtility = true;
    }
    var details = localStorage.getItem('FormDetails');
    this.details = JSON.parse(details);

    localStorage.removeItem('row_no');
    localStorage.removeItem('PrimaryKey');

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCaseRegistrationforEditedValue(this.details.tableName, this.details.fromDate, this.details.Todate, this.primaryKey, this.row_no);
    this.data.subscribe(
      (response: any) => {
        this.app = response[0];

        console.log('Application');
        console.log(this.app);

        //     this.GetAllBanks(this.app.NO_Id);
        // if (this.app.APP_Id != null)
        //   this.GetApplicationFormDetails(this.APP_Id);
        // if (this.NO_Id != null && this.PD_Id != null)
        this.GetProjectDetails(this.app.APP_Not_Id_Fk, this.app.APP_Project_Id_FK);
        this.GetTaluks(this.app.APP_DI_Id_FK);
        this.GetHobli(this.app.APP_TA_Id_FK);

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });


  }

  //Meghana


  FillApplication() {

    this.app.APP_PA_Relation_Name = "Mahesh";
    //this.app.APP_PA_DOB=new Date('1967-05-03');
    this.app.APP_Relegion_Id_FK = 1;
    this.app.APP_AnnualIncome = "60000";
    this.app.APP_YearsResiding = "16";
    this.app.APP_NomineeName = "Jagdeesh";
    this.app.APP_Address1 = "#21, 2nd Phase, JP Nagar";
    this.app.APP_Address2 = "#8/89, 3rd Main, BSK";
    this.app.APP_Pincode = "560090";
    this.app.APP_PA_AlternateNo = "9900334455";
    this.app.APP_BankName = "SBI";
    this.app.APP_BankBranch = "JP Nagar";
    this.app.APP_IFSC = "SBI00000089";
    this.app.APP_AccountNo = "6644827723833345";
    this.app.APP_Nominee_Relation_Id_FK = 1;
    // this.app.APP_DI_Id_FK=1;
    // this.app.APP_TA_Id_FK=1;
    // this.app.APP_HO_Id_FK=1;
    // this.app.APP_VI_Id_FK=1;
  }
  GetApplicationFormDetails(APP_Id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getApplicationFormDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.app = response;
        this.app.APP_HO_Name = response.DistrictandTaluks.HO_Name;
        this.app.APP_VI_Name = response.DistrictandTaluks.VI_Village;
        this.app.APP_CA_Id_FK = response.Categories.CA_Id;
        this.mode = "update";
        if (this.app.APP_PA_Gender == 'M')
          this.app.APP_PA_Gender = 'Male';
        else if (this.app.APP_PA_Gender == 'F')
          this.app.APP_PA_Gender = 'Female';
        else
          this.app.APP_PA_Gender = 'Transgender';

        if (this.app.APP_SA_Gender == 'M')
          this.app.APP_SA_Gender = 'Male';
        else if (this.app.APP_SA_Gender == 'F')
          this.app.APP_SA_Gender = 'Female';
        else
          this.app.APP_SA_Gender = 'Transgender';

        if (this.app.APP_PA_DOB != null)
          this.app.APP_PA_DOB = ((this.app.APP_PA_DOB).split('T'))[0];
        if (this.app.APP_SA_DOB != null)
          this.app.APP_SA_DOB = ((this.app.APP_SA_DOB).split('T'))[0];
        this.GetTaluks(this.app.APP_DI_Id_FK);
        this.GetHobli(this.app.APP_TA_Id_FK);
        this.GetVillages(this.app.APP_HO_Id_FK);
        if (this.app.APP_PA_Photo != null) {
          this.PAPhotoimageUrl = response.APP_PA_Photo;
          this.app.APP_PA_Photo = response.APP_PA_Photo;
        }
        if (this.app.APP_SA_Photo != null) {
          this.SAPhotoimageUrl = response.APP_SA_Photo;
          this.app.APP_SA_Photo = response.APP_SA_Photo;
        }
        if (this.app.APP_PA_Signature != null) {
          this.PASignatureimageUrl = response.APP_PA_Signature;
          this.app.APP_PA_Signature = response.APP_PA_Signature;
        }
        if (this.app.APP_SA_Signature != null) {
          this.SASignatureimageUrl = response.APP_SA_Signature;
          this.app.APP_SA_Signature = response.APP_SA_Signature;
        }
        if (this.app.APP_PA_AdharCard != null) {
          this.PAAadhaarimageUrl = response.APP_PA_AdharCard;
          this.app.APP_PA_AdharCard = response.APP_PA_AdharCard;
        }
        if (this.app.APP_SA_AdharCard != null) {
          this.SAAadhaarimageUrl = response.APP_SA_AdharCard;
          this.app.APP_SA_AdharCard = response.APP_SA_AdharCard;
        }
        if (this.app.APP_ESW_Certificate != null) {
          this.app.APP_ESW_Certificate = response.APP_ESW_Certificate;
        }
        if (this.app.APP_Caste_Certificate != null) {
          this.app.APP_Caste_Certificate = response.APP_Caste_Certificate;
        }
        this.CalculateAge(response.APP_PA_DOB);
        this.CalculateSAAge(response.APP_SA_DOB);
        console.log(this.app);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllBanks(NO_Id) {
    debugger
    this.comnp.APP_Not_Id_Fk = NO_Id;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllBanksforApplicant(NO_Id);
    this.data.subscribe(
      (response: any) => {
        this.banklist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetProjectDetails(NO_Id, PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectDetailsforApplicant(NO_Id, PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.PD = response;
        this.GetCategory(this.NO_Id);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  CalculateAge(dateOfBirth) {
    debugger
    this.data = this.userService.calculateAgeforApplicant(dateOfBirth);
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
    this.data = this.userService.getAllDistrictNameforapplicant();
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

  GetHobli(TalukId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllHobliName(TalukId);
    this.data.subscribe(
      (response: any) => {
        this.Hoblis = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetVillages(HobliId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllVillageName(HobliId);
    this.data.subscribe(
      (response: any) => {
        this.Villages = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  GetCategory(NO_Id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategoryforapplicant_online(NO_Id);
    this.data.subscribe(
    (response: any) => {
    this.Categories = response;
    document.getElementById('loader-spinner').style.display = "none";
    }, (error) => {
    document.getElementById('loader-spinner').style.display = "none";
    });
    }

  GetGuardianRelation() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetGuardianRelation();
    this.data.subscribe(
      (response: any) => {
        this.GRelations = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetRelations() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getRelationsforapplicant();
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
    this.data = this.userService.getRelegionsforapplicant();
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
    this.data = this.userService.getReservationsforapplicant();
    this.data.subscribe(
      (response: any) => {
        this.Reservations = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  // ForgotPassword(form: NgForm) {
  //   
  //   console.log(form.value);

  //     this.userService.forgotPassword(form.value)
  //       .subscribe((data: any) => {
  //         //swal('','Link has been sent to your Email!','success');
  //       })
  //     }
  //this.formSubmitted = true;

  PAPhotoFileInput(file: FileList) {

    let regex = /\.(jpg|jpeg|png)$/i;
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
          console.log(response);
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

  // splitgetBriefHistoryFile(APP_SA_Photo)
  // {
  //   let APP_SA_PhotoFile = APP_SA_Photo.split('/');
  //   this.SAFile = APP_SA_PhotoFile[7];
  //   let SA_Photo= (this.SAFile).split('?');
  //   this.SA_Photo = SA_Photo[0];
  // }



  SAPhotoFileInput(file: FileList) {

    let regex = /\.(jpg|jpeg|png)$/i;
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
          console.log(response);
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

    let regex = /\.(jpg|jpeg|png)$/i;
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
          console.log(response);
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

    let regex = /\.(jpg|jpeg|png)$/i;
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
          console.log(response);
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

    let regex = /\.(jpg|jpeg|png)$/i;
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
          console.log(response);
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

   let regex = /\.(jpg|jpeg|png)$/i;
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
          console.log(response);
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
  LandAcquisationFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.LandAcquisation_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_LA_Certificate');
          i.value = "";
          if (error.status == 400) {
            // this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_LA_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getLandAcquisationFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_LA_Certificate');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  ExservicemanFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.Exserviceman_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_Exserviceman_Certificate');
          i.value = "";
          if (error.status == 400) {
            // this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_Exserviceman_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getExservicemanFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_Exserviceman_Certificate');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  ProofOfDepositFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.ProofOfDeposit_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_POD_Certificate');
          i.value = "";
          if (error.status == 400) {
            // this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_POD_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getProofOfDepositFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_POD_Certificate');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
 IncomeFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.Income_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_Income_Certificate');
          i.value = "";
          if (error.status == 400) {
            // this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_Income_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getIncomeFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_Income_Certificate');
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
          console.log(response);
          this.app.ESW_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_ESW_Certificate');
          i.value = "";
          if (error.status == 400) {
            //   this.UO_UploadimageUrl1 = "assets/images/image-default.png";
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
  DisabilityFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.Disability_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_Disability_Certificate');
          i.value = "";
          if (error.status == 400) {
            // this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_Disability_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getDisabilityFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_Disability_Certificate');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  AffidavitFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.Affidavit_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_Affidavit_Certificate');
          i.value = "";
          if (error.status == 400) {
            // this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_Affidavit_Certificate');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  getAffidavitFileInput() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_Affidavit_Certificate');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  PAPancardFileInput(file: FileList) {

    let regex = /\.(jpg|jpeg|png)$/i;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.PAPancardimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.APP_PA_PanCardErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_PA_PanCard');
          i.value = "";
          if (error.status == 400) {
            this.PAPancardimageUrl = "assets/images/default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_PA_PanCard');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getPAPanCardPrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_PA_PanCard');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  SAPancardFileInput(file: FileList) {

    let regex = /\.(jpg|jpeg|png)$/i;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SAPancardimageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.APP_SAPancardErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_SA_PanCard');
          i.value = "";
          if (error.status == 400) {
            this.SAPancardimageUrl = "assets/images/default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('APP_SA_PanCard');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension jpg, jpeg or png", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getSAPanCardPrintImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('APP_SA_PanCard');
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
        //  this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          this.app.Caste_CertificateErrorMessage = "";
        }, (error) => {
          let i: any = document.getElementById('APP_Caste_Certificate');
          i.value = "";
          if (error.status == 400) {
            //   this.UO_UploadimageUrl1 = "assets/images/image-default.png";
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
  SaveApplication(Application: NgForm, APP_PA_Age: any) {
    // alert(this.s.SR_PA_Pincode.getRawValue());
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
        // Application.value.APP_LA_Certificate = this.getLandAcquisationFileInput();
        // Application.value.APP_Exserviceman_Certificate = this.getExservicemanFileInput();
        // Application.value.APP_Income_Certificate = this.getIncomeFileInput();
        // Application.value.APP_POD_Certificate = this.getProofOfDepositFileInput();
        Application.value.APP_SA_PanCard = this.getSAPanCardPrintImage();
        Application.value.APP_PA_PanCard = this.getPAPanCardPrintImage();
        Application.value.APP_Affidavit_Certificate = this.getAffidavitFileInput();
        Application.value.APP_Disability_Certificate = this.getDisabilityFileInput();
        Application.value.APP_ESW_Certificate = this.getESWFileInput();
        Application.value.APP_Caste_Certificate = this.getCasteFileInput();
        Application.value.APP_Project_Id_FK = this.PD_Id;
        Application.value.APP_Not_Id_Fk = this.NO_Id;
        if (Application.value.APP_PA_Photo != null || Application.value.APP_PA_Photo != undefined) {
          this.app.APP_PA_PhotoErrorMessag = "";
          if (Application.value.APP_Caste_Certificate != null || Application.value.APP_Caste_Certificate != undefined) {
            this.app.Caste_CertificateErrorMessage = "";
            this.app.APP_PA_Photo = Application.value.APP_PA_Photo;
            this.formInvalid = false;
            this.APP_PA_Age = Application.value.APP_PA_Age;
            document.getElementById('loader-spinner').style.display = "block";
            Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
            Application.value.PD_Id = this.PD_Id;
            if (this.app.terms == false) {
              swal('Warning!', 'Please accept terms and conditions.', 'warning');
              this.formInvalid = true;
              return;
            }
            this.data = this.userService.saveApplicationforApplicant_online(Application.value);
            this.data.subscribe(
              (response) => {
                this.APP_Id = response.AppNo;
                console.log(Application);
                Application.reset();
                Application.resetForm();
                this.formInvalid = false;
                swal('Success!', 'Application No.' + response.App_No + ' details has been saved successfully.', 'success');
                // swal('Success!', 'Application No: ' + response.App_No + "<br> OTP Number: " + response.AppOtp + ' ', 'success');
                // this.router.navigate(['home/applicant/applicantview/', this.APP_Id, this.PD.NO_Id, this.payment_mode]);
                // swal1('Success!', 'Application APP-No' +response +'details has been saved successfully.', 'success','route');
                document.getElementById('loader-spinner').style.display = "none";
                this.router.navigate(['applicant-login']);
                //this.router.navigate(['home/applicant/applicantview/',this.APP_Id]);
                // window.location.href(='home/applicantview/';
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
            swal('Warning!', 'Please Upload Caste or other Cerficate.', 'warning');
            this.app.Caste_CertificateErrorMessage = "Please Upload Caste or other Cerficate";
            this.formInvalid = true;
          }
        }
        else {
          swal('Warning!', 'Please choose a Photo.', 'warning');
          this.app.APP_PA_PhotoErrorMessage = "Please choose a Photo";
          this.formInvalid = true;
        }
      }
      else {
        swal('Warning!', 'Please fill all mandatory fields.', 'warning');
        this.formInvalid = true;
      }
    }
    else {
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
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
      // if(Application.value.APP_PA_Photo==null)
      if (Application.value.APP_PA_Photo != null && !Application.value.APP_PA_Photo.match("http"))
        Application.value.APP_PA_Photo = this.getPAPhotoPrintImage();
      if (Application.value.APP_SA_Photo != null && !Application.value.APP_SA_Photo.match("http"))
        Application.value.APP_SA_Photo = this.getSAPhotoPrintImage();
      //  else
      //   Application.value.APP_SA_Photo = this.splitgetBriefHistoryFile(Application.value.APP_SA_Photo);
      if (Application.value.APP_PA_Signature != null && !Application.value.APP_PA_Signature.match("http"))
        Application.value.APP_PA_Signature = this.getPASignaturePrintImage();
      if (Application.value.APP_SA_Signature != null && !Application.value.APP_SA_Signature.match("http"))
        Application.value.APP_SA_Signature = this.getSASignaturePrintImage();
      if (Application.value.APP_PA_AdharCard != null && !Application.value.APP_PA_AdharCard.match("http"))
        Application.value.APP_PA_AdharCard = this.getPAAdharCardPrintImage();
      if (Application.value.APP_SA_AdharCard != null && !Application.value.APP_SA_AdharCard.match("http"))
        Application.value.APP_SA_AdharCard = this.getSAAdharCardPrintImage();
      if (Application.value.APP_Disability_Certificate != null && !Application.value.APP_Disability_Certificate.match("http"))
        Application.value.APP_Disability_Certificate = this.getDisabilityFileInput();
      if (Application.value.APP_Affidavit_Certificate != null && !Application.value.APP_Affidavit_Certificate.match("http"))
        Application.value.APP_Affidavit_Certificate = this.getAffidavitFileInput();
      // if (Application.value.APP_LA_Certificate != null && !Application.value.APP_LA_Certificate.match("http"))
      //   Application.value.APP_LA_Certificate = this.getLandAcquisationFileInput();
      // if (Application.value.APP_Exserviceman_Certificate != null && !Application.value.APP_Exserviceman_Certificate.match("http"))
      //   Application.value.APP_Exserviceman_Certificate = this.getExservicemanFileInput();
      // if (Application.value.APP_Income_Certificate != null && !Application.value.APP_Income_Certificate.match("http"))
      //   Application.value.APP_Income_Certificate = this.getIncomeFileInput();
      // if (Application.value.APP_POD_Certificate != null && !Application.value.APP_POD_Certificate.match("http"))
      //   Application.value.APP_POD_Certificate = this.getProofOfDepositFileInput();
      if (Application.value.APP_PA_PanCard != null && !Application.value.APP_PA_PanCard.match("http"))
        Application.value.APP_PA_PanCard = this.getPAPanCardPrintImage();
      if (Application.value.APP_SA_PanCard != null && !Application.value.APP_SA_PanCard.match("http"))
        Application.value.APP_SA_PanCard = this.getSAPanCardPrintImage();
      if (Application.value.APP_ESW_Certificate != null && !Application.value.APP_ESW_Certificate.match("http"))
        Application.value.APP_ESW_Certificate = this.getESWFileInput();
      if (Application.value.APP_Caste_Certificate != null && !Application.value.APP_Caste_Certificate.match("http"))
        Application.value.APP_Caste_Certificate = this.getCasteFileInput();
      Application.value.APP_PA_Age = this.APP_PA_Age;
      Application.value.APP_Project_Id_FK = this.PD.PD_Id;
      Application.value.APP_Not_Id_Fk = this.NO_Id;
      // if (this.app.terms == false) {
      //   swal('Warning!', 'Please accept terms and conditions.', 'warning');
      //   document.getElementById('loader-spinner').style.display = "none";
      //   return;
      // }
      this.data = this.userService.updateApplication(APP_Id, Application.value);
      this.data.subscribe(
        (response) => {
          //this.APP_Id=response;
          console.log(Application);
          Application.reset();
          Application.resetForm();
          this.formInvalid = false;
          swal('Success!', 'Application No.: ' + APP_No + ' ' + 'details has been updated successfully.', 'success');
          this.router.navigate(['home/applicant/applicantview/', this.APP_Id, this.NO_Id, this.payment_mode]);
          // swal1('Success!', 'Application APP-No' +response +'details has been saved successfully.', 'success','route');
          document.getElementById('loader-spinner').style.display = "none";

        }, (error) => {
          console.log(error);
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    else {
      swal('Warning!', 'Please fill all mandatory fields.', 'warning');
      this.formInvalid = true;
    }
  }

  Check(terms) {
    
    if (terms == false) {
      this.app.terms = true
    } else {
      this.app.terms = false
    }
  }

  GetByIdApplicantNotifications(userName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdApplicantNotifications(userName);
    this.data.subscribe(
      (response: any) => {
        this.app = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  copyPermanentAddress(checked: boolean) {
    if (checked) {
      // Copy permanent address details to communication address
      this.app.APP_Address2 = this.app.APP_Address1;
      this.app.APP_DI_Id_FK = this.app.APP_DI_Id_FK_PERM;
      this.app.APP_TA_Id_FK = this.app.APP_TA_Id_FK_PERM;
      this.app.Police_Station = this.app.Police_Station_PERM;
      this.app.Post_Office = this.app.Post_Office_PERM;
      this.app.APP_Pincode = this.app.APP_Pincode_PERM;
      this.app.APP_VI_Name = this.app.APP_VI_Name_PERM;
    } else {
      // Clear communication address fields if checkbox is unchecked
      this.app.APP_Address2 = '';
      this.app.APP_DI_Id_FK = undefined;
      this.app.APP_TA_Id_FK = undefined;
      this.app.Police_Station = '';
      this.app.Post_Office = '';
      this.app.APP_Pincode = '';
      this.app.APP_VI_Name = '';
    }
  }
}