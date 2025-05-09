import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-khb-instachallan',
  templateUrl: './khb-instachallan.component.html',
  styleUrls: ['./khb-instachallan.component.css']
})
export class KhbInstachallanComponent implements OnInit {

  AppNo: any;
  today: any;
  ChallanCopies: any = {};
  Total: any;
  payment: any = {};
  AmtType: any;
  n_array: any;
  Amtwords: any;
  value: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    debugger;
    this.route.params.subscribe(params => {
      this.AppNo = params['AppNo'];
      this.AmtType = params['AmtType'];
      // this.ProjectID = params['ProjectID'];
    })
    if (this.AppNo != null)
      this.GetKhbchallaninsta(this.AppNo, this.AmtType);
  }

  GetKhbchallaninsta(AppNo, AmtType) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetKhbchallaninsta(AppNo, AmtType)
      .subscribe(
        (response: any) => {
          this.ChallanCopies = response;
          //this.UpdatePaymentDetails();
          this.Total = parseFloat(this.ChallanCopies.P_Amount);
          this.Amtwords = this.convertNumberToWords(this.Total);
          //+ parseFloat(this.ChallanCopies.PC_RegFee || 0)+parseFloat(this.ChallanCopies.PC_InitialDeposit || 0);
          this.today = new Date();
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  myFunction() {
    window.print();
  }

  UpdatePaymentDetails() {
    debugger;
    this.payment.APP_No = this.ChallanCopies.APP_No;
    this.payment.APP_OTP = this.ChallanCopies.APP_OTP;
    this.payment.APP_PA_MobileNo = this.ChallanCopies.APP_PA_MobileNo;
    this.payment.APP_UTR_No = this.ChallanCopies.APP_UTR_No;
    this.payment.Total_Amount = this.ChallanCopies.PC_InitialDeposit + this.ChallanCopies.PC_AppFee + this.ChallanCopies.PC_RegFee;
    this.payment.APP_Payment_Trans_Date = new Date();
    // if (!form.invalid) {
    // payment.APP_Challan_Doc = this.getAPPChallanDoc();
    document.getElementById('loader-spinner').style.display = "block";
    // form.value.PD_Feasibility_Report = this.getFeasibilityPDFUrl();
    this.userService.UpdateApplicantDetails(this.payment)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (data == "Success")
            swal('', 'Your application payment is received by KHB.<br>Confirmation and receipt along with User id and Password will be sent to you on your registered mobile number and email id. <br> Thank You!', 'success');
          else
            swal('Warning!', data, 'warning');

        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Warning!', error.error.Message, 'warning');
          // this.errorHandler.HandlerError(error);
        });
    // }else
    // document.getElementById('loader-spinner').style.display = "none";
    // this.formSubmitted = true;
  }

  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      this.n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        this.n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (this.n_array[i] == 1) {
            this.n_array[j] = 10 + parseInt(this.n_array[j]);
            this.n_array[i] = 0;
          }
        }
      }
      this.value = "";
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          this.value = this.n_array[i] * 10;
        } else {
          this.value = this.n_array[i];
        }
        if (this.value != 0) {
          words_string += words[this.value] + " ";
        }
        if ((i == 1 && this.value != 0) || (i == 0 && this.value != 0 && this.n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && this.value != 0) || (i == 2 && this.value != 0 && this.n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && this.value != 0) || (i == 4 && this.value != 0 && this.n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && this.value != 0 && (this.n_array[i + 1] != 0 && this.n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && this.value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string;
  }

}
