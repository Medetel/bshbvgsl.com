import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

declare var jquery: any;

@Component({
  selector: 'app-consultant-from',
  templateUrl: './consultant-from.component.html',
  styleUrls: ['./consultant-from.component.css']
})
export class ConsultantFromComponent implements OnInit {

  numericpattern = "^[0-9]*$";
  SA_Id: any;
  mode: any;
  CD_Id: any;
  formInvalid: boolean;
  CONLetterPDFUrl: string = "assets/images/default.jpg";
  SupWOPDFUrl: string = "assets/images/default.jpg";
  SupAgreementPDFUrl: string = "assets/images/default.jpg";
  SupLetterPDFUrl: string = "assets/images/default.jpg";
  ConWOPDFUrl: string = "assets/images/default.jpg";
  ConAgreementPDFUrl: string = "assets/images/default.jpg";

  formSubmitted: boolean;
  feelist: any;
  feelists: any;
  // safeelist:any;
  toelist: any;
  projectlist: any;
  consultantlist: any;
  data: any;
  title = "Add Consultant"
  fileToUpload: File = null;
  consultant: any = {};
  consul: any = {};
  supplement: any = {};

  projectDetails: any = {};
  TotalAcres: any;
  TotalGuntas: any;
  total: number;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.GetAllConsultant();
    this.GetAllProject();
    this.GetAllFees();
    // this.GetAllFee();
    this.GetAllTypeofEntrusts();
    this.route.params.subscribe(params =>
      this.CD_Id = params['CD_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.CD_Id != null && this.mode != null)
      this.GetConsultantForTheId(this.CD_Id);
  }

  GetConsultantForTheId(CD_Id) {
  
   debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetConsultantForTheId(CD_Id)
      .subscribe(
        (data: any) => {
          // this.getProjectbyCode(data.CD_PD_ID_FK)
          this.consultant = data;
          if (data.SupplementaryModel != null) {
            this.supplement = data.SupplementaryModel;
          }
          if (this.consultant.CD_TenderNotification_Date != null)
            this.consultant.CD_TenderNotification_Date = ((this.consultant.CD_TenderNotification_Date).split('T'))[0];
          if (this.consultant.CD_LetterofAcceptance_Date != null)
            this.consultant.CD_LetterofAcceptance_Date = ((this.consultant.CD_LetterofAcceptance_Date).split('T'))[0];
          if (this.consultant.CD_Aggrement_Date != null)
            this.consultant.CD_Aggrement_Date = ((this.consultant.CD_Aggrement_Date).split('T'))[0];
          if (this.consultant.CD_WorkOrderDate != null)
            this.consultant.CD_WorkOrderDate = ((this.consultant.CD_WorkOrderDate).split('T'))[0];
          if (this.consultant.CD_Bank_Guarantee_Date != null)
            this.consultant.CD_Bank_Guarantee_Date = ((this.consultant.CD_Bank_Guarantee_Date).split('T'))[0];


          if (this.consultant.CD_Letter_Doc != null)
            this.CONLetterPDFUrl = data.CD_Letter_Doc;
          this.consultant.CD_Aggrement_Doc = data.CD_Aggrement_Doc;

          if (this.consultant.CD_Aggrement_Doc != null)
            this.ConAgreementPDFUrl = data.CD_Aggrement_Doc;
          this.consultant.CD_Aggrement_Doc = data.CD_Aggrement_Doc;

          if (this.consultant.CD_WorkOrder_Doc != null)
            this.ConWOPDFUrl = data.CD_WorkOrder_Doc;
          this.consultant.CD_WorkOrder_Doc = data.CD_WorkOrder_Doc;

debugger;
          if (this.supplement != null) {
            if (this.supplement.SA_LetterofAcceptance != null)
              this.supplement.SA_LetterofAcceptance = ((this.supplement.SA_LetterofAcceptance).split('T'))[0];
            if (this.supplement.SA_Aggrement_Date != null)
              this.supplement.SA_Aggrement_Date = ((this.supplement.SA_Aggrement_Date).split('T'))[0];
            if (this.supplement.SA_WorkOrderDate != null)
              this.supplement.SA_WorkOrderDate = ((this.supplement.SA_WorkOrderDate).split('T'))[0];
            if (this.supplement.SA_Letter_Doc != null)
             // this.SupLetterPDFUrl = data.SA_Letter_Doc;
            this.supplement.SA_Letter_Doc = data.SupplementaryModel.SA_Letter_Doc;

            if (this.supplement.SA_Aggrement_Doc != null)
             // this.SupAgreementPDFUrl = data.SA_Aggrement_Doc;
            this.supplement.SA_Aggrement_Doc = data.SupplementaryModel.SA_Aggrement_Doc;

            if (this.supplement.SA_WorkOrder_Doc != null)
              //this.SupWOPDFUrl = data.SA_WorkOrder_Doc;
            this.supplement.SA_WorkOrder_Doc = data.SupplementaryModel.SA_WorkOrder_Doc;
          }

          this.getProjectbyCode(this.consultant.CD_PD_ID_FK)

          //  this.getTaluk(this.project.PD_DI_Id_FK);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetAllConsultant() {
    this.data = this.userService.getAllConsultants();
    this.data.subscribe(
      (response: any) => {
        this.consultantlist = response;
      }, (error) => {

      });

  }

  GetAllProject() {
    this.data = this.userService.GetAllProject();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {

      });
  }

  GetAllTypeofEntrusts() {
    this.data = this.userService.GetAllTypeofEntrusts();
    this.data.subscribe(
      (response: any) => {
        this.toelist = response;
      }, (error) => {

      });
  }

  GetAllFees() {
    this.data = this.userService.GetAllFees();
    this.data.subscribe(
      (response: any) => {
        this.feelist = response;
        // this.safeelist=response;
      }, (error) => {

      });
  }

  getProjectbyCode(PD_Id) {
    this.projectDetails = {};
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectforConsultantbyCode(PD_Id)
      .subscribe(
        (data: any) => {
          this.projectDetails = data;
          this.TotalAcres = "0";
          this.TotalGuntas = "0";
          let tot_Gunt: any = 0;
          this.total = 0;

          this.TotalAcres = parseFloat(this.TotalAcres) + parseFloat(this.projectDetails.ExtentAcres || 0);
          this.TotalGuntas = parseFloat(this.TotalGuntas) + parseFloat(this.projectDetails.ExtentGuntas || 0);
          if (parseFloat(this.TotalGuntas) < 40) {
            tot_Gunt = '.' + parseFloat(this.TotalGuntas)
          }
          else {
            tot_Gunt = parseFloat(this.TotalGuntas) / 40;
          }
          this.total = (parseFloat(this.TotalAcres) + parseFloat(tot_Gunt));
         //this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  //Save
  onSubmit(form: NgForm) {
    debugger;

    if (!form.invalid) {

      document.getElementById('loader-spinner').style.display = "block";
      if (form.value.CD_SupplementaryAgreement == 'N') {
        form.value.CD_Govt_Approval = 'N';
      }

      form.value.CD_Letter_Doc = this.getCONLetterPDFUrl();
      form.value.CD_Aggrement_Doc = this.getConAgreementPDFUrl();
      form.value.CD_WorkOrder_Doc = this.getConWOPDFUrl();
      form.value.SupplementaryModel = this.supplement;
      form.value.SupplementaryModel.SA_Letter_Doc = this.getSupLetterPDFUrl();
      form.value.SupplementaryModel.SA_Aggrement_Doc = this.getSupAgreementPDFUrl();
      form.value.SupplementaryModel.SA_WorkOrder_Doc = this.getSupWOPDFUrl();     
      this.data = this.userService.CreateConsultant(form.value);
      this.data.subscribe(
        (response: any) => {        
          swal('Success!', 'saved successfully.', 'success');
          document.getElementById('loader-spinner').style.display = "none";
          this.router.navigate(['home/consultant']);
        }, (error) => {          
          document.getElementById('loader-spinner').style.display = "none";
        });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }
  
  update(form: NgForm) {
    debugger;
    if (!form.invalid) {
      document.getElementById('loader-spinner').style.display = "block";
      // if (form.value.CD_Letter_Doc != null && !form.value.CD_Letter_Doc.match("http"))
        form.value.CD_Letter_Doc = this.getCONLetterPDFUrlEdit();
      //if (form.value.CD_Aggrement_Doc != null && !form.value.CD_Aggrement_Doc.match("http"))
        form.value.CD_Aggrement_Doc = this.getConAgreementPDFUrlEdit();
      //if (form.value.CD_WorkOrder_Doc != null && !form.value.CD_WorkOrder_Doc.match("http"))
        form.value.CD_WorkOrder_Doc = this.getConWOPDFUrlEdit();

      form.value.SupplementaryModel = this.supplement;
      if (form.value.CD_SupplementaryAgreement == 'Y') {
        if (form.value.SupplementaryModel.SA_Letter_Doc != null)
          form.value.SupplementaryModel.SA_Letter_Doc = this.getSupLetterPDFUrlEdit();
        if (form.value.SupplementaryModel.SA_Aggrement_Doc != null)
          form.value.SupplementaryModel.SA_Aggrement_Doc = this.getSupAgreementPDFUrlEdit();
        if (form.value.SupplementaryModel.SA_WorkOrder_Doc != null )
          form.value.SupplementaryModel.SA_WorkOrder_Doc = this.getSupWOPDFUrlEdit();
      }
      
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.updateConsultantDetails(form.value, this.CD_Id)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Updated Successfully!', 'success');
            this.router.navigate(['/home/consultant']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  CONLetterFileInput(file: FileList) {

    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.CONLetterPDFUrl = event.target.result;

      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("Upload_CD_Letter_Doc", file.item(0));
      let x = this.userService.uploadCD_Letter_Doc(data);
      x.subscribe(
        (response) => {
        
        }, (error) => {
          let i: any = document.getElementById('CD_Letter_Doc');
          i.value = "";
          if (error.status == 400) {
            this.CONLetterPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('CD_Letter_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getCONLetterPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('CD_Letter_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  getCONLetterPDFUrlEdit() {
    let imagename = null;
    try {
      imagename = document.getElementById('CD_Letter_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  ConAgreementPDFUrlFileInput(file: FileList) {
    debugger;
    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.ConAgreementPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("Upload_CD_Aggrement_Doc", file.item(0));
      let x = this.userService.uploadCD_Aggrement_Doc(data);
      x.subscribe(
        (response) => {
         
        }, (error) => {
          let i: any = document.getElementById('CD_Aggrement_Doc');
          i.value = "";
          if (error.status == 400) {
            this.CONLetterPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('CD_Aggrement_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getConAgreementPDFUrl() {
    debugger;
    let imagename = null;
    try {
      imagename = document.getElementById('CD_Aggrement_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
   

  getConAgreementPDFUrlEdit() {
    debugger;
    let imagename = null;
    try {
      imagename = document.getElementById('CD_Aggrement_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }




  ConWOPDFUrlFileInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.ConWOPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("Upload_CD_WorkOrder_Doc", file.item(0));
      let x = this.userService.uploadCD_CD_WorkOrder_Doc(data);
      x.subscribe(
        (response) => {
          
        }, (error) => {
          let i: any = document.getElementById('CD_WorkOrder_Doc');
          i.value = "";
          if (error.status == 400) {
            this.CONLetterPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('CD_WorkOrder_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getConWOPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('CD_WorkOrder_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  getConWOPDFUrlEdit() {
    let imagename = null;
    try {
      imagename = document.getElementById('CD_WorkOrder_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  SupLetterPDFUrlFileInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SupLetterPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("SA_Letter_Doc", file.item(0));
      let x = this.userService.SA_Letter_Doc(data);
      x.subscribe(
        (response) => {
         
        }, (error) => {
          let i: any = document.getElementById('SA_Letter_Doc');
          i.value = "";
          if (error.status == 400) {
            this.CONLetterPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('SA_Letter_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getSupLetterPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('SA_Letter_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  
  getSupLetterPDFUrlEdit() {
    let imagename = null;
    try {
      imagename = document.getElementById('SA_Letter_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  SupAgreementPDFUrlFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SupAgreementPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("SA_Aggrement_Doc", file.item(0));
      let x = this.userService.SA_Aggrement_Doc(data);
      x.subscribe(
        (response) => {
        
        }, (error) => {
          let i: any = document.getElementById('SA_Aggrement_Doc');
          i.value = "";
          if (error.status == 400) {
            this.CONLetterPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('SA_Aggrement_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');

      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }


  getSupAgreementPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('SA_Aggrement_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
   

  getSupAgreementPDFUrlEdit() {
    let imagename = null;
    try {
      imagename = document.getElementById('SA_Aggrement_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }




  SupWOPDFUrlFileInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SupWOPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("SA_WorkOrder_Doc", file.item(0));
      let x = this.userService.SA_WorkOrder_Doc(data);
      x.subscribe(
        (response) => {
          
        }, (error) => {
          let i: any = document.getElementById('SA_WorkOrder_Doc');
          i.value = "";
          if (error.status == 400) {
            this.CONLetterPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('SA_WorkOrder_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getSupWOPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('SA_WorkOrder_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  getSupWOPDFUrlEdit() {
    let imagename = null;
    try {
      imagename = document.getElementById('SA_WorkOrder_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

}