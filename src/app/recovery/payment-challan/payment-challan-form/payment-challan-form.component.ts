import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-challan-form',
  templateUrl: './payment-challan-form.component.html',
  styleUrls: ['./payment-challan-form.component.css']
})
export class PaymentChallanFormComponent implements OnInit {
  data: any;
  Agreementlist: any = [];
  AL: any = {};
  PC: any = {};
  mode: any = 'Save';
  title: string;
  Agrmnt_Id: any;
  Payment_Id: number;
  BackId: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {
  }

  ngOnInit() {
    this.GetAgreementCode();
    this.route.params.subscribe(params => {
      this.Agrmnt_Id = params['Agrmnt_Id'];
      this.Payment_Id = params['Payment_Id'];
      this.BackId = params['BackId'];
      this.mode = params['mode'];

      if (this.Payment_Id > 0) {

        this.GetByIdChallan(this.Payment_Id)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Caste ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Caste ";
    }
  }

  GetAgreementCode() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAgreementCode(this.mode);
    this.data.subscribe(
      (response: any) => {
        this.Agreementlist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAgreementDetailsById(Agrmnt_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAgreementDetailsById(Agrmnt_Id);
    this.data.subscribe(
      (response: any) => {
        this.PC = response;      
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  CreateChallan(PaymentChallan: NgForm) {
    PaymentChallan.value.TOTAL_RATE = this.PC.TOTAL_RATE;
    PaymentChallan.value.Total_Maintenan_Cost = this.PC.TOTAL_Maintenace_Cost;
    PaymentChallan.value.Total_Amount = this.PC.Total_Amount;
    PaymentChallan.value.GST_Rate = this.PC.TOTAL_GST;
    PaymentChallan.value.TDS_Rate = this.PC.TOTAL_TDS;
    PaymentChallan.value.Gross_Amount = this.PC.Gross_Amount;

    this.data = this.userService.CreateChallan(PaymentChallan.value);
    this.data.subscribe(
      (response) => {
        PaymentChallan.reset();
        PaymentChallan.resetForm();
        PaymentChallan.form.markAsPristine();
        PaymentChallan.form.markAsUntouched();
        swal('Success!', 'Challan Details Added Successfully .', 'success');
        this.router.navigate(['/home/paymentchallan']);
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

  GetByIdChallan(Payment_Id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdChallan(Payment_Id);
    this.data.subscribe(
      (response: any) => {
        this.PC = response;
        this.GetAgreementCode();
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Cancel() {
    this.PC = {};
  }

  UpdateChallan(PaymentChallan: NgForm) {
    this.data = this.userService.UpdateChallan(this.Payment_Id, PaymentChallan.value);
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Challan details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/paymentchallan']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
      });
  }
}