import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-applicationinstallmentpay',
  templateUrl: './applicationinstallmentpay.component.html',
  styleUrls: ['./applicationinstallmentpay.component.css']
})
export class ApplicationinstallmentpayComponent implements OnInit {

  title = "Application Status - Payment"
  APP_No: any;
  APP_Status: any;
  AppData: any = {};
  APP_Id: any;
  installment: any = {};
  banklist;
  data: any;
  download: any = 0;
  challaninsta: any = {};
  formSubmitted: boolean;
  AmtType:any

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.APP_Id = params['APP_Id']
      this.APP_No = params['APP_No']
      this.APP_Status = params['APP_Status']
    }
    );
    this.GetAllInstaBanks(this.APP_Id);

    if (this.APP_No != null)
      this.GetApplicantDetailsforInstapay(this.APP_Id, this.APP_No);
  }

  GetAllInstaBanks(APP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllInstaBanks(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.banklist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetApplicantDetailsforInstapay(APP_Id: any, AppNo: any) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantDetailsforInstapay(APP_Id, AppNo)
      .subscribe(
        (data: any) => {
          this.AppData = data;
          for (let i = 0; i < this.AppData.PCAModel.length; i++) {
            this.AppData.PCAModel[i].Select;
          }
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  Payinstallment(form: NgForm, installment, APP_No) {
    
    if (!form.invalid) {
      for (let i = 0; i < this.AppData.PCAModel.length; i++) {
        if (this.AppData.PCAModel[i].Select == true) {
          this.challaninsta.PCA_Amount = this.AppData.PCAModel[i].PCA_Amount;
          this.challaninsta.PCA_InstallmemntNo = this.AppData.PCAModel[i].PCA_InstallmemntNo;
          this.challaninsta.P_PaymentMode = installment.P_PaymentMode;
          this.challaninsta.P_BankId = installment.P_BankId;
          this.challaninsta.APP_No = APP_No;
        }
      }

      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.Payinstallment(this.challaninsta);
      this.data.subscribe(
        (response: any) => {
          swal('Success!', 'Installment Payment saved successfully.', 'success');
          this.download = 1;
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
    } else {
      document.getElementById('loader-spinner').style.display = "none";
      swal('warning!', 'Please Select all mandatory fields.', 'warning');
      this.formSubmitted = true;
    }
  }

  changeCheckbox(AB_Id, Select) {
    
    for (let i = 0; i < this.AppData.PCAModel.length; i++) {
      if (this.AppData.PCAModel[i].AB_Id == AB_Id) {
        this.AppData.PCAModel[i].Select = true;
        this.AmtType=this.AppData.PCAModel[i].AB_Id;
      }
    }
    for (let i = 0; i < this.AppData.PCAModel.length; i++) {
      if (this.AppData.PCAModel[i].AB_Id != AB_Id) {
        this.AppData.PCAModel[i].Select = false;
      }
    }
  }
}
