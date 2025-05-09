import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  title = "Payment Methods";
  AppNo: any;
  today: any;
  ChallanCopies: any = {};
  Total: any; 
  value: any;
  n_array: any;
  Amtwords: any;
  Mode: any;
  data: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.AppNo = params['AppNo'];
      this.Mode = params['Mode'];    
    })  
  }

  //By Sachin
  GetKhbchallan() {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetKhbAmountForPayment(this.AppNo)
      .subscribe(
        (response: any) => {
          this.ChallanCopies = response;
          // this.UpdatePaymentDetails();
          this.Total = parseFloat(this.ChallanCopies.PC_AppFee || 0) + parseFloat(this.ChallanCopies.PC_RegFee || 0) + parseFloat(this.ChallanCopies.PC_InitialDeposit || 0);
          this.today = new Date();
          this.AppNo = 0;
          this.AppNo = this.ChallanCopies.APP_No;
          window.open("http://localhost:14080/Esign/Payment.aspx?Total=" + this.Total + "&AppNo=" + this.AppNo, "_self");         
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  payment() {
    swal({    
      html:
        '<input placeholder="Bank Name" type="text" class="form-control"><br>' +
        '<input placeholder="Branch" type="text" class="form-control"><br>' +
        '<input placeholder="DD No." type="text" class="form-control"><br>' +
        '<input placeholder="DD Date" type="text" class="form-control"><br>' +
        '<input placeholder="Amount" type="text" class="form-control"><br>' +
        '<label>DD Copy</label><input style="width:70%;display:inline-block;margin-left:20px;"  type="file" class="form-control">',

      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Save',
      cancelButtonText:
        'Cancel',
    })
  }

}