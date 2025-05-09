import { DatePipe } from '@angular/common';
import { Component, ErrorHandler, OnInit, } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  username: string = 'BIHAREDISTRICT-housingboard';
  password: string = 'Bshb@202411';
  senderid: string = 'BRGOVT';
  mobileNo: any;
  message: string = 'TheOTPforverificationisBiharStateHousingBoard';
  // secureKey: string = '21b208aa-bb42-4c19-8d93-b8571a7d40d6';
  secureKey: string = '71af7035-7391-4f59-b251-63e25907bd1e';
  templateid: string = '1307165356165028460';
  data: any;
  m: any = {};
  MobileNo: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler, private datePipe: DatePipe) {
  }

  ngOnInit() {
   
  }
  SaveMobileOTP(mobileNo: any) {
    debugger
   
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

      this.message = 'The OTP for verification is' + " " + OTP + " " +'Bihar State Housing Board'

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.PostMoileOTPforFOrgot(this.username, this.password, this.senderid, mobileNo, this.message, this.secureKey, this.templateid);
    this.data.subscribe(
      (response) => {
        document.getElementById('loader-spinner').style.display = "none";
        if(response !== 'User not found')
        {
          // $('#myModal').modal('hide');
          // swal('Warning!',response, 'warning');
          const navigationExtras: NavigationExtras = {
            queryParams: { data: mobileNo,
              MobileNo:this.m.MobileNo,
             }
          };
// this.router.navigate(['/forgot-password-otp']);
         this.router.navigate(['/auth/forgot-password-otp'], navigationExtras);

        }

        else{

          swal('Warning!', 'User not found', 'warning');
          
        }
       
        // if (this.timerExpired && this.timerSubscription) {
        //   this.timerSubscription.unsubscribe(); // Unsubscribe only if expired
        // }
        // this.Timer();
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

