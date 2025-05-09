import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-cr-form',
  templateUrl: './cr-form.component.html',
  styleUrls: ['./cr-form.component.css']
})
export class CrFormComponent implements OnInit {

  title = "Add Case Registration";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }
  c: any = {};
  courtlist: any = [];
  courttypelist: any = [];
  previouscaselist: any = [];
  departmentlist: any = [];
  caseTypelist: any = [];
  projectcodelist: any = [];
  officeslist: any = [];
  data: any = [];
  litigationofficerslist: any = [];
  allAdvocatelist: any = [];
  p: any = {};
  adv: any = [];
  arb: any = [];
  petDetails: any = [];
  advDetails: any = [];
  arbDetails: any = [];
  casereglist: any = [];
  formInvalid: boolean = false;
  PreviousCaseId: number;
  ProjectCodeId: number;
  previousCaseListsOnSearch: any = [];
  DistrictsList: any = [];
  CComplexlist: any = [];
  CEstablishList: any = [];
  numericpattern = "^[0-9]*$";
  alphabetpattern = "^[a-zA-Z ]*$";
  alphanumpattern = "^[a-zA-Z0-9 ]*$";
  emailpattern = "^[a-zA-Z0-9._%-+]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  mode: any;
  Case_Id: any;
  hide: boolean = false;
  fileToUpload: File = null;

  primaryKey: any = 0;
  row_no: any = 0;
  details: any;
  fromUtility: boolean = false;
  ngOnInit() {
    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.Case_Id = params['CaseId'];
      this.mode = params['mode'];

      if (this.Case_Id > 0) {
        this.GetByIdCseRegistration(this.Case_Id);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }
    });

    //Route form utilities
    this.row_no = localStorage.getItem('row_no');
    this.primaryKey = localStorage.getItem('PrimaryKey');
    if (this.row_no > 0) {
      this.mode = 'view';
      this.hide = true;
      this.getEditData()
    }

    if (this.mode == 'view') {
      this.title = "View Case Proceedings";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit Case Proceedings";
    }
    //this.GetAllDistrict();
    this.GetDefaultData();
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
        this.c = response[0];

        if (this.c.Case_Execution_Date != null)
          this.c.Case_Execution_Date = ((this.c.Case_Execution_Date).split('T'))[0];
        if (this.c.Case_Reg_Date != null)
          this.c.Case_Reg_Date = ((this.c.Case_Reg_Date).split('T'))[0];

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });

  }  

  GetDefaultData() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
        document.getElementById('loader-spinner').style.display = "none";
      })

    //Get All courts
    this.data = this.userService.GetAllCourts();
    this.data.subscribe(
      (response: any) => {
        this.courtlist = response.Result;

      })

    //Get all CourtTypes
    this.data = this.userService.GetAllCourtTypes();
    this.data.subscribe(
      (response: any) => {
        this.courttypelist = response.Result;

      })

    this.data = this.userService.GetAllAdvocates();
    this.data.subscribe(
      (response: any) => {
        this.allAdvocatelist = response.Result;
      }
    )

    if (this.Case_Id > 0) {
      this.data = this.userService.GetAllPreviousCasewithActiveandInactive();
      this.data.subscribe(
        (response: any) => {
          this.previouscaselist = response.Result;

        })
    }
    else {
      this.data = this.userService.GetAllPreviousCase();
      this.data.subscribe(
        (response: any) => {
          this.previouscaselist = response.Result;

        })
    }

    //Get All departments
    this.data = this.userService.GetAllDepartments();
    this.data.subscribe(
      (response: any) => {
        this.departmentlist = response.Result;
      })

    //Get all case types
    this.data = this.userService.GetAllCaseTypes();
    this.data.subscribe(
      (response: any) => {
        this.caseTypelist = response.Result;

      })

    //Get project code list
    this.data = this.userService.GetAllProjectCodes();
    this.data.subscribe(
      (response: any) => {
        this.projectcodelist = response.Result;

      })

    //Get offices list
    this.data = this.userService.GetAllGetOfficeslist();
    this.data.subscribe(
      (response: any) => {
        this.officeslist = response.Result;

      })

    //Get officers list
    this.data = this.userService.GetLitigationOfficerslist();
    this.data.subscribe(
      (response: any) => {
        this.litigationofficerslist = response.Result;
      })

    this.data = this.userService.GetAllCaseRegwithoutPag();
    this.data.subscribe(
      (response: any) => {
        this.casereglist = response.Result;

      })
  }

  //Petitioner Details
  AddPDDetails(p) {
    let bool = 0;
    if (p.CasePeti_PetitionerName == "" || p.CasePeti_Respondent == "") { bool = 1 }
    if ((p.CasePeti_PetitionerName != null || p.CasePeti_PetitionerName != undefined) || (p.CasePeti_Respondent != null || p.CasePeti_Respondent != undefined)
      && bool == 0) {

      let temp = {
        CasePeti_PetitionerName: p.CasePeti_PetitionerName,
        CasePeti_Respondent: p.CasePeti_Respondent
      }

      this.petDetails.push(temp);
      this.p = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  ClearPDDetails() {
    this.p = {};
  }

  //delete row
  PetDetailsremove(i) {
    this.petDetails.splice(i, 1);
  }

  //Advocates Details
  AddAdvDetails(adv) {
    let bool = 0;
    if (adv.AC_Adv_Id_FK == "") { bool = 1 }
    if ((adv.AC_Adv_Id_FK != null || adv.AC_Adv_Id_FK != undefined) && bool == 0) {

      let temp = {
        AC_Adv_Id_FK: adv.AC_Adv_Id_FK,
        Adv_AdvocateName: this.GetAdvocateName(adv.AC_Adv_Id_FK)
      }
      this.advDetails.push(temp);
      this.adv = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  ClearAdvDetails() {
    this.adv = {};
  }

  //delete row
  AdvDetailsremove(i) {
    this.advDetails.splice(i, 1);
  }

  AddArbDetails(arb) {
    var num = (+arb.Amount)
    if (num.toString() == "NaN") {
      swal('warning', 'Please Enter valid Amount!', 'warning');
      return;
    }

    let bool = 0;
    if (arb.ArbitrationDate == "" || arb.PayeeName == "" || arb.Amount == "") { bool = 1 }
    if ((arb.ArbitrationDate != null || arb.ArbitrationDate != undefined) &&
      (arb.PayeeName != null || arb.PayeeName != undefined) &&
      (arb.Amount != null || arb.Amount != undefined)
      && bool == 0) {

      let temp = {
        ArbitrationDate: arb.ArbitrationDate,
        PayeeName: arb.PayeeName,
        Amount: arb.Amount
      }
      this.arbDetails.push(temp);
      this.arb = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  ClearArbDetails() {
    this.arb = {};
  }
  //delete a row
  ArbiDetailsremove(i) {
    this.arbDetails.splice(i, 1);
  }

  //Get advocate Name
  GetAdvocateName(id) {
    for (let i = 0; i < this.allAdvocatelist.length; i++) {
      if (this.allAdvocatelist[i].Adv_Id == id) {
        return this.allAdvocatelist[i].Adv_Name;
      }
    }
  }

  SaveCaseRegistration(CaseReg: NgForm) {

    if (CaseReg.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    if (this.petDetails.length == 0) {
      swal('warning!', ' Please fill Petitioner / Respondent Details.', 'warning');
      document.getElementById('loader-spinner').style.display = "none";
    }
    else if (this.advDetails.length == 0) {
      swal('warning!', 'Please fill Advocate(s) Details.', 'warning');
      document.getElementById('loader-spinner').style.display = "none";
    }

    else {
      //Duplicate check
      var data = this.casereglist.filter(a => a.Case_No == this.c.Case_No);
      if (data.length > 0) {
        swal('warning!', 'Case Number already exist.', 'warning');
        return;
      }
      CaseReg.value.CasePetitionerModels = this.petDetails;
      CaseReg.value.AdvocatesOfCasesModels = this.advDetails;
      CaseReg.value.ArbitrationModels = this.arbDetails;
      CaseReg.value.Case_UploadPath = this.getFeasibilityPDFUrl();
      CaseReg.value.Case_UploadPath1 = this.getimageUpload1();
      CaseReg.value.Case_UploadPath2 = this.getimageUpload2();
      this.data = this.userService.CreateCaseRegistration(CaseReg.value);
      this.data.subscribe(
        (response) => {
          CaseReg.reset();
          CaseReg.resetForm();
          CaseReg.form.markAsPristine();
          CaseReg.form.markAsUntouched();
          this.petDetails = [];
          this.advDetails = [];
          this.arbDetails = [];
          swal('Success!', ' Case Registered Successfully .', 'success');
          document.getElementById('loader-spinner').style.display = "none";
          this.router.navigate(['/home/caseregistration']);
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

  GetByIdCseRegistration(CaseId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCseRegistration(CaseId);
    this.data.subscribe(
      (response: any) => {
        this.c = response;

        if (this.c.Case_Execution_Date != null)
          this.c.Case_Execution_Date = ((this.c.Case_Execution_Date).split('T'))[0];
        if (this.c.Case_Reg_Date != null)
          this.c.Case_Reg_Date = ((this.c.Case_Reg_Date).split('T'))[0];

        this.petDetails = this.c.CasePetitionerModels;
        this.advDetails = this.c.AdvocatesOfCasesModels;
        this.arbDetails = this.c.ArbitrationModels;
        this.GetCourtComplexandEstablishment(this.c.DistrictId)


        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdateCaseReg(CaseReg: NgForm) {   
    //Duplicate check
    var data = this.casereglist.filter(a => a.Case_No == this.c.Case_No && a.Case_Id != this.c.Case_Id);
    if (data.length > 0) {
      swal('Warning!', 'Case No already exist.', 'warning');
      return;
    }

    CaseReg.value.CasePetitionerModels = this.petDetails;
    CaseReg.value.AdvocatesOfCasesModels = this.advDetails;
    CaseReg.value.ArbitrationModels = this.arbDetails;

    CaseReg.value.Case_UploadPath = this.getFeasibilityPDFUrl();
    CaseReg.value.Case_UploadPath1 = this.getimageUpload1();
    CaseReg.value.Case_UploadPath2 = this.getimageUpload2();

    this.data = this.userService.UpdateCaseReg(this.Case_Id, CaseReg.value);
    this.data.subscribe(
      (response) => {
        CaseReg.reset();
        CaseReg.resetForm();
        CaseReg.form.markAsPristine();
        CaseReg.form.markAsUntouched();

        this.petDetails = [];
        this.advDetails = [];
        this.arbDetails = [];

        swal('Success!', ' Case Registration updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/caseregistration']);
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

  imageUpload(file: FileList) {  
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
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
          let i: any = document.getElementById('Case_UploadPath');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('Case_UploadPath');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getFeasibilityPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('Case_UploadPath');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  imageUploadtwo(file: FileList) { 
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
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
          let i: any = document.getElementById('Case_UploadPath1');
          i.value = "";
          if (error.status == 400) {         
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('Case_UploadPath1');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getimageUpload1() {
    let imagename = null;
    try {
      imagename = document.getElementById('Case_UploadPath1');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  imageUploadthree(file: FileList) {   
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
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
          let i: any = document.getElementById('Case_UploadPath2');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('Case_UploadPath2');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getimageUpload2() {
    let imagename = null;
    try {
      imagename = document.getElementById('Case_UploadPath2');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  GetCourtComplexandEstablishment(DistrictId) {
    if (DistrictId >= 0) {
      this.data = this.userService.GetAllCourtComplex_Establish('C', DistrictId);
      this.data.subscribe(
        (response: any) => {
          this.CComplexlist = response.Result;
        })

      this.data = this.userService.GetAllCourtComplex_Establish('E', DistrictId);
      this.data.subscribe(
        (response: any) => {
          this.CEstablishList = response.Result;
        })
    }

  }

  Cancel() {
    this.router.navigate(['/home/caseregistration']);
  }
  // getBench(Bench){       
  // }
}
