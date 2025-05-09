import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-adv-pay-form',
  templateUrl: './adv-pay-form.component.html',
  styleUrls: ['./adv-pay-form.component.css']
})
export class AdvPayFormComponent implements OnInit {

  title = "Add Bill"
  data: any = [];
  CaseId: number;
  AdvId: number;
  advocatedetails: any = [];
  casedetails: any = [];
  ap: any = {};
  fileToUpload: File = null;
  AP_Id: number;
  mode: string;
  formInvalid: boolean = false;
  userslist: any = [];

  primaryKey: any = 0;
  row_no: any = 0;
  details: any;
  fromUtility: boolean = false;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.AdvId = params['AdvId'];
      this.CaseId = params['CaseId'];
      this.AP_Id = params['AP_Id'];
      this.mode = params['mode'];

      if (this.mode == 'view')
        this.title = "View Advocate Bill";
      else if (this.mode == 'edit')
        this.title = "Update Advocate Bill";
    })

    if (this.AP_Id > 0) {
      this.GetByIdAdvocateBill(this.AP_Id);
    }

    //Route form utilities
    this.row_no = localStorage.getItem('row_no');
    this.primaryKey = localStorage.getItem('PrimaryKey');
    if (this.row_no > 0) {
      this.mode = 'view';
      this.getEditData()
    }

    this.getAdvocatesDetails()
  }

  getAdvocatesDetails() {
    this.data = this.userService.GetAdvocateById(this.AdvId);
    this.data.subscribe(
      (response: any) => {
        this.advocatedetails = response;
      })

    this.data = this.userService.GetByIdCseRegistration(this.CaseId);
    this.data.subscribe(
      (response: any) => {
        this.casedetails = response;

      })

    //Get officers list
    this.data = this.userService.GetLitigationOfficerslist();
    this.data.subscribe(
      (response: any) => {
        this.userslist = response.Result;
      })

  }

  SaveAdvcateBills(AdvocateBill: NgForm) {
    if (AdvocateBill.valid) {

      if (this.ap.AP_PayType == null) {
        swal('Warning!', 'Please Select pay type.', 'warning');
      }
      else {
        AdvocateBill.value.AP_Adv_Id_FK = this.AdvId;
        AdvocateBill.value.AP_Case_Id_FK = this.CaseId;
        AdvocateBill.value.AP_DocPath = this.getFeasibilityPDFUrl();

        this.data = this.userService.PostAdvocatePaymentDetails(AdvocateBill.value);

        this.data.subscribe(
          (response) => {
            AdvocateBill.reset();
            AdvocateBill.resetForm();
            AdvocateBill.form.markAsPristine();
            AdvocateBill.form.markAsUntouched();
            swal('Success!', 'Advocate Bill Added Successfully .', 'success');
            this.router.navigate(['/home/advocate-pay', this.AdvId, this.CaseId]);
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
    }
    else {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
    }
  }


  //Proceeding file uplaod
  imageUpload(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF|.png|.PNG|.jpeg|.JPEG|.gif|.GIF)$/;

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
          let i: any = document.getElementById('AP_DocPath');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('AP_DocPath');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf or Images", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getFeasibilityPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('AP_DocPath');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  //Get By Id

  GetByIdAdvocateBill(Ap_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdAdvocatePayment(Ap_Id);
    this.data.subscribe(
      (response: any) => {
        this.ap = response;

        if (this.ap.AP_Date != null)
          this.ap.AP_Date = ((this.ap.AP_Date).split('T'))[0];
        if (this.ap.AP_Date != null)
          this.ap.AP_Date = ((this.ap.AP_Date).split('T'))[0];

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  //Update form

  UpdateAdvocateBill(AdvocateBill: NgForm) {

    AdvocateBill.value.AP_Adv_Id_FK = this.AdvId;
    AdvocateBill.value.AP_Case_Id_FK = this.CaseId;
    AdvocateBill.value.AP_DocPath = this.getFeasibilityPDFUrl();

    this.data = this.userService.UpdateAdvocateBill(this.AP_Id, AdvocateBill.value);
    this.data.subscribe(
      (response) => {
        AdvocateBill.reset();
        AdvocateBill.resetForm();
        AdvocateBill.form.markAsPristine();
        AdvocateBill.form.markAsUntouched();

        swal('Success!', 'Advocate Bill updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/advocate-pay', this.AdvId, this.CaseId]);
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

  Cancel() {
    this.router.navigate(['/home/advocate-pay', this.AdvId, this.CaseId]);
  }


  //For log
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
        this.ap = response[0];

        this.data = this.userService.GetAdvocateById(this.ap.AP_Adv_Id_FK);
        this.data.subscribe(
          (response: any) => {
            this.advocatedetails = response;
          })

        this.data = this.userService.GetByIdCseRegistration(this.ap.AP_Case_Id_FK);
        this.data.subscribe(
          (response: any) => {
            this.casedetails = response;

          })

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });


  }

}