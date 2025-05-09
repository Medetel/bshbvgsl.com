import { Component, ErrorHandler, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPawordComponent implements OnInit {
  showPassword: boolean = false;
  showPassword1: boolean = false;
a:any={};
  m: any={};
  passwordpattern: any = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&]).{8,}$";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.m.MobileNo = params['MobileNo'];
      // this.pdId = params['pdId'];
      // this.role = params['role'];
    });

  
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibility1(): void {
    this.showPassword1 = !this.showPassword1;
  }
  UpdatePasswordSuperAdmin(confirmForm: NgForm) {
     document.getElementById('loader-spinner').style.display = "block";
     confirmForm.value.UserName = this.m.MobileNo;
     this.userService.UpdatePasswordSuperAdmin(confirmForm.value)
       .subscribe(
         (data) => {
           document.getElementById('loader-spinner').style.display = "none";
           swal('', 'updated Successfully!', 'success');
           this.router.navigate(['/auth/login']);
         }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
           this.errorHandler.handleError(error);
         });
 
   }
 
}

