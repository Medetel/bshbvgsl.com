import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'payment-receipts-form',
  templateUrl: './payment-receipts-form.component.html',
  styleUrls: ['./payment-receipts-form.component.css']
})
export class PaymentReceiptsFormComponent implements OnInit {
  data: any;
  Receiptlist: any = [];
  PR: any = {};
  Payment_Id: number;
  mode: any = 'Save';
  title: string;
  fileToUpload: File;
  Payment_Receipt_Id: any;
  BackId: any;
  hide: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {
  }

  ngOnInit() {
    this.GetChallanCode();
    this.route.params.subscribe(params => {
      this.Payment_Id = params['Payment_Id'];
      this.Payment_Receipt_Id = params['Payment_Receipt_Id'];
      this.mode = params['mode'];
      this.BackId = params['BackId'];
      if (this.Payment_Receipt_Id > 0) {

        this.GetByIdReceipt(this.Payment_Receipt_Id)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Caste ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Caste ";
    }
  }

  GetChallanCode() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetChallanCode(this.mode);
    this.data.subscribe(
      (response: any) => {
        this.Receiptlist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetChallanDetailsById(Payment_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetChallanDetailsById(Payment_Id);
    this.data.subscribe(
      (response: any) => {
        this.PR = response;
        this.GetTotal(this.PR.Total_Rent, this.PR.Total_Maintenan_Cost);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetTotal(Total_Rent, Total_Maintenan_Cost) {
    let Total = (Total_Rent * 1 + Total_Maintenan_Cost * 1);
    this.PR.TotalAmount = Total;   
  }

  CreateReceipt(PaymentReceipt: NgForm) {
    PaymentReceipt.value.TOTAL_AMOUNT = this.PR.TotalAmount;
    this.data = this.userService.CreateReceipt(PaymentReceipt.value);
    PaymentReceipt.value.DOC_UPLOAD_PATH = this.getReceiptPDFUrl();
    this.data.subscribe(
      (response) => {
        PaymentReceipt.reset();
        PaymentReceipt.resetForm();
        PaymentReceipt.form.markAsPristine();
        PaymentReceipt.form.markAsUntouched();
        swal('Success!', 'Receipt Details Added Successfully .', 'success');
        this.router.navigate(['/home/paymentreceipt']);
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

  GetByIdReceipt(Payment_Receipt_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdReceipt(Payment_Receipt_Id);
    this.data.subscribe(
      (response: any) => {
        this.PR = response;
        if (this.PR.Reference_Date != null)
          this.PR.Reference_Date = ((this.PR.Reference_Date).split('T'))[0];
        this.GetChallanCode();
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Cancel() {
    this.PR = {};
  }

  UpdateReceipt(PaymentReceipt: NgForm) {
    this.data = this.userService.UpdateReceipt(this.Payment_Receipt_Id, PaymentReceipt.value);
    PaymentReceipt.value.DOC_UPLOAD_PATH = this.getReceiptPDFUrl();
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Receipt details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/paymentreceipt']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
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
      let x = this.userService.uploadImageRecovery(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('DOC_UPLOAD_PATH');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('DOC_UPLOAD_PATH');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getReceiptPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('DOC_UPLOAD_PATH');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

}