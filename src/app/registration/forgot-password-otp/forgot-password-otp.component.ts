import { Component, ErrorHandler, OnInit, } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { $ } from 'protractor';
import swal from 'sweetalert2';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.css']
})
export class ForgotPasswordOtpComponent implements OnInit {
 
o:any={};
  data: any;
  PhoneNumber: any;
  MobileNo: any;
  m: any={};
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.m.MobileNo = params['MobileNo'];
      // this.pdId = params['pdId'];
      // this.role = params['role'];
    });
  }

  VerifyforgotMobileOTP(MobileNo:any,OTP:any) {
     debugger
         this.PhoneNumber= MobileNo;
           document.getElementById('loader-spinner').style.display = "block";
           this.data = this.userService.PostforgotVerifyMoileOTP(this.PhoneNumber,OTP);
           this.data.subscribe(
             (response) => {
               document.getElementById('loader-spinner').style.display = "none";
               // registerForm.reset();
               swal('Success!', 'OTP verified successfully', 'success');
               this.o.otp = '';  // Reset OTP field to empty
                 const navigationExtras: NavigationExtras = {
                                   queryParams: { data: MobileNo,
                                     MobileNo:this.m.MobileNo,
                                    }
                                 };
                       // this.router.navigate(['/forgot-password-otp']);
                       this.router.navigate(['/auth/confirm-password'], navigationExtras);
              //  this.router.navigate(['/confirm-password']);
              //     $('#myModal').modal('hide');
              //  this.v.isMobileVerified = true; 
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

