import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../../../shared/user.service';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
@Component({
  selector: 'app-submitrequest-form',
  templateUrl: './submitrequest-form.component.html',
  styleUrls: ['./submitrequest-form.component.css']
})
@NgModule({
  declarations: [
    SubmitRequestFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Add this line
  ],
  providers: [],
  bootstrap: [SubmitRequestFormComponent]
})
export class SubmitRequestFormComponent implements OnInit {
  rtiappid: number;
  securityCode: string;
  userInput: string;
  message: string;
  successMessage: string;
  formInvalid: boolean;
  data: any;
  mode: string = "";
  rti: any = {};
  title = "RTI Online";
  fileToUpload_supporting: File = null;
  fileToUpload_upload: File = null;
  hide: boolean = false;
  uploadPath: string;
  uploadPath2: string; 
  rappemail: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.generateCode();
    this.mode = this.route.snapshot.data.mode;
    this.rti.rappcountry = 'India';
  }
  isIndiaSelected(): boolean {
    return this.rti.rappcountry === 'India' || !this.rti.rappcountry;
  }
   generateCode() {
    // Generate a 6-character random code
    this.securityCode = Math.random().toString(36).substr(2, 6).toUpperCase();
   }
  checkEmailMatch() {
    if (this.rappemail.value !== this.rti.rappemail) {
      this.rappemail.setErrors({ 'emailMismatch': true });
    } else {
      this.rappemail.setErrors(null);
    }
  }
  refreshCode() {
    this.generateCode();
    this.userInput = ''; 
    this.message = ''; // Clear previous message
    this.successMessage = '';
  }
  submitForm() {
    if (this.userInput === this.securityCode) {
      this.successMessage = 'Form submitted successfully!';
    } else {
      this.message = 'Incorrect code. Please try again.';
    }
  }
  goBack() {
    if (this.mode === 'view' || this.mode === 'edit') {
      this.router.navigate(['/home/submitrequest']);
    } else {
      window.location.href = 'https://onlinebshb.esdinfra.com/#/home';
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {

      this.rtiappid = params['rtiappid'];
      this.mode = params['mode'];

      if (this.rtiappid > 0) {
        this.GetByIdRTIApplicants(this.rtiappid);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View RTI Online";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit RTI Online";
      }
      else if (this.mode == 'Print') {
        this.title = "Print RTI Online";
      }
    });


    if (this.rtiappid > 0) {
      this.GetByIdRTIApplicants(this.rtiappid);
    }
    
  }
  SaveRtionline(Rtionline: NgForm) {
    //alert('save button hit')
    console.log(JSON.stringify(Rtionline.value))
    Rtionline.value.rappsupportingdoc = this.getimageUpload1(); 
    Rtionline.value.rapprequestdoc = this.getimageUpload2(); 
    if (Rtionline.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostRti(Rtionline.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          Rtionline.reset();
          Rtionline.resetForm();
          Rtionline.form.markAsPristine();
          Rtionline.form.markAsUntouched();
          swal('Success!', 'RTI Online Added Successfully .', 'success');
          // this.router.navigate(['/home/baseline']);
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        }
      );
    }
  }

  Supportingdocument(file: FileList) {
    // alert('tender doc alert')
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload_supporting = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload_supporting);
      const data = new FormData();
      data.append("UploadedImage_rappsupportingdoc", file.item(0));
      let x = this.userService.uploadsupportdocRti(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let rti: any = document.getElementById('rappsupportingdoc');
          rti.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let rti: any = document.getElementById('rappsupportingdoc');
      rti.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getimageUpload1() {
    let imagename = null;
    try {
      imagename = document.getElementById('rappsupportingdoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  uploaddocument(file: FileList) {
    // alert('tender doc alert')
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload_upload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload_upload);
      const data = new FormData();
      data.append("UploadedImage_rapprequestdoc", file.item(0));
      let x = this.userService.uploadDocRti(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let rti: any = document.getElementById('rapprequestdoc');
          rti.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let rti: any = document.getElementById('rapprequestdoc');
      rti.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getimageUpload2() {
    let imagename = null;
    try {
      imagename = document.getElementById('rapprequestdoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  printPage(): void {
    window.print();
  }

  getCurrentDate(): Date {
    return new Date();
  }


  GetByIdRTIApplicants(rtiappid) {
        debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdRTIApplicants(rtiappid);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.rti = response;
        this.uploadPath = this.rti.rappsupportingdoc;
        this.uploadPath2 = this.rti.rapprequestdoc; 
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateRTIApplicants(Rtionline: NgForm) {
    if (Rtionline.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (Rtionline.value.rappsupportingdoc != null && !Rtionline.value.rappsupportingdoc.match("http"))
        Rtionline.value.rappsupportingdoc = this.getimageUploadedit1();
      Rtionline.value.rapprequestdoc = this.getimageUploadedit2();
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateRTIApplicants(this.rtiappid, Rtionline.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          Rtionline.reset();
          Rtionline.resetForm();
          Rtionline.form.markAsPristine();
          Rtionline.form.markAsUntouched();
          swal('Success!', 'RTI Online Updated Successfully .', 'success');
          this.router.navigate(['/home/submitrequest']);

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


  getimageUploadedit1() {
    let imagename = null;
    try {
      imagename = document.getElementById('rappsupportingdoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  getimageUploadedit2() {
    let imagename = null;
    try {
      imagename = document.getElementById('rapprequestdoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }



}
