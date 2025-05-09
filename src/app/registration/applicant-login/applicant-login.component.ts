import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user.model';
import swal from 'sweetalert2';


@Component({
  selector: 'app-applicant-login',
  templateUrl: './applicant-login.component.html',
  styleUrls: ['./applicant-login.component.css']
})
export class ApplicantLoginComponent implements OnInit {
  showLodingSpinner: boolean;
  formSubmitted: boolean;
  @Output() change = new EventEmitter();
  isLoginError: boolean = false;
  selectedItem: any;
  data: any;
  division: any = {};
  message: any;

  constructor(private userService: UserService, private router: Router) {
    this.formSubmitted = false;
    this.showLodingSpinner = false;
  }

  ngOnInit() {
    if (localStorage.getItem('accessToken') != null) {
      this.GetAllowedPages()
    }
  }

  Login(form: NgForm) {
    if (!form.invalid) {
      this.showLodingSpinner = true;

      var logindata = {
        "UserName": form.value.username,
        "Password": form.value.Password
      }
      // Check user type
      this.userService.CheckUserType(form.value.username).subscribe(
        (response: any) => {
          this.showLodingSpinner = false; // Hide loading spinner
          if (response.message === "fail") {
            swal('', response.message_desc); // Show error message
            return; // Exit the function if user type check fails
          }
          // Proceed with user authentication
          this.userService.userAuthentication(logindata).subscribe(
            (data: any) => {
              this.handleSuccessfulAuthentication(data);
            },
            (error) => {
              this.handleAuthenticationError(error);
            }
          );
        },
        (error) => {
          this.showLodingSpinner = false; // Hide loading spinner
          swal('', "An error occurred while checking user type. Please try again.");
        }
      );
    } else {
      this.formSubmitted = true;
    }
  }

  private handleSuccessfulAuthentication(data: any) {
    this.showLodingSpinner = false;
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('userName', data.username);
    localStorage.setItem('userRole', data.userRole);
    localStorage.removeItem('selectedMenu');
    //this.getDivision(data.userName)
    this.GetAllowedPages();
  }

  // Function to handle authentication error
  private handleAuthenticationError(error: any) {
    this.isLoginError = true;
    this.showLodingSpinner = false;
    if (error.status == 500 || error.status == 502) {
      swal('', "Internal Server Error, Please try later");
    } else {
      swal('', error.error.error_description || "An error occurred during login");
    }
  }

  GetAllowedPages() {
    this.userService.getAllowedPages()
      .subscribe((data: any) => {
        localStorage.setItem('menuList', JSON.stringify(data));
        this.change.emit(false);
        if (data.length > 0)
          this.router.navigate([data[0].KM_Redirect_URL]);
      },
        (err: HttpErrorResponse) => {
        });
  }

  getDivision(userName) {
    this.data = this.userService.getDivisionId(userName);
    this.data.subscribe(
      (response: any) => {
        this.division = response;
        localStorage.setItem('divisonId', this.division.toString());
      }
    )
  }
}