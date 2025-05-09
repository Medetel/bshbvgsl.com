import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Application, Login } from '../../shared/user.model';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../shared/ErrorHandler';


@Component({
  selector: 'app-applicant-register-form',
  templateUrl: './applicant-register-form.component.html',
  styleUrls: ['./applicant-register-form.component.css']
})
export class ApplicantRegisterFormComponent implements OnInit {
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
  title = "Application Form ";
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
  mode: string = "save";
  numericpattern = "^[0-9]*$";
  emailpattern = "^[a-zA-Z0-9._%-+]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  NO_Id: any;
  PD_Id: any;
  appmode: any;
  banklist;
  payment_mode: any;
  GRelations;
  primaryKey: any = 0;
  row_no: any = 0;
  details: any;
  fromUtility: boolean = false;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.app = new Application()
    this.app.APP_IsJoint = 'N';
    this.app.APP_PropertyType = 'Site';
    this.app.terms = false;
  }

  ngOnInit() {
    this.GetAllDistrict();
    this.GetCategory();
    this.GetRelations();
    this.GetRelegions();
    this.GetReservations();
    this.route.params.subscribe(params => {
      this.APP_Id = params['APP_Id'];
    });

    this.route.params.subscribe(params => {
      this.NO_Id = params['NO_Id'];
    });

    this.route.params.subscribe(params => {
      this.PD_Id = params['PD_Id'];
      this.appmode = params['appmode'];
    });
    this.GetAllBanks(this.NO_Id);
    if (this.APP_Id != null)
      this.GetApplicationFormDetails(this.APP_Id);
    if (this.NO_Id != null && this.PD_Id != null)
      this.GetProjectDetails(this.NO_Id, this.PD_Id);
    this.row_no = localStorage.getItem('row_no');
    this.primaryKey = localStorage.getItem('PrimaryKey');
    if (this.row_no > 0) {
      this.mode = 'View';
      this.getEditData()
    }


  }

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

        this.GetProjectDetails(this.app.APP_Not_Id_Fk, this.app.APP_Project_Id_FK);
        this.GetTaluks(this.app.APP_DI_Id_FK);
        this.GetHobli(this.app.APP_TA_Id_FK);

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });


  }

  FillApplication() {

    this.app.APP_PA_Relation_Name = "Mahesh";
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
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllBanks(NO_Id) {
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
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  CalculateAge(dateOfBirth) {
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


  GetCategory() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategoryforapplicant();
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


  SaveApplication(Application: NgForm, APP_PA_Age: any) {

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
            this.data = this.userService.saveApplicationforApplicant(Application.value);
            this.data.subscribe(
              (response) => {
                this.APP_Id = response.AppNo;          
                Application.reset();
                Application.resetForm();
                this.formInvalid = false;
                swal('Success!', 'Application No.' + response.App_No + ' details has been saved successfully.', 'success');
                document.getElementById('loader-spinner').style.display = "none";
                this.router.navigate(['applicant-login']);

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

  Check(terms) {

    if (terms == false) {
      this.app.terms = true
    } else {
      this.app.terms = false
    }
  }
}