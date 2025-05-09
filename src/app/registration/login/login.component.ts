import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user.model';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLodingSpinner: boolean;
  formSubmitted: boolean;
  @Output() change = new EventEmitter();
  isLoginError: boolean = false;
  selectedItem: any;
  data: any;
  division: any = {};

  //sater here saheb
  fullWebsiteUrl: string;
  websiteLastPart: string;
  browserName = 'Unknown';
  apiURL: string;

  //end here saheb


  constructor(private userService: UserService, private router: Router, private Http: HttpClient) {
    this.formSubmitted = false;
    this.showLodingSpinner = false;
  }

  ngOnInit() {

    if (localStorage.getItem('accessToken') != null) {
      this.GetAllowedPages()
    }

    console.log('page init starts :')
    //start here saheb
    this.fullWebsiteUrl = window.location.href;
    // Split the URL at the '#' symbol, and then at '/' to extract the last segment
    const hashPart = this.fullWebsiteUrl.split('#')[1];  // Get the part after '#'

    // Check if hashPart exists, then split by '/' to get the URL segments
    const urlParts = hashPart ? hashPart.split('/') : [];
    // The last part of the URL should be the segment we're interested in
    this.websiteLastPart = urlParts.length > 0 ? urlParts[urlParts.length - 1] : '';
    // Log the last segment
    console.log('Extracted Last URL Segment:', this.websiteLastPart);
    // Log the captured URL to the console
    console.log('Captured Full URL:', this.fullWebsiteUrl);

    const userAgent = navigator.userAgent;
    console.log("browser details :" + JSON.stringify(userAgent))
    if (userAgent.includes('Edg')) { // Check for Edge first (specific to Chromium Edge)
      this.browserName = 'Microsoft Edge';
    } else if (userAgent.includes('Chrome')) { // Check for Chrome
      this.browserName = 'Google Chrome';
    } else if (userAgent.includes('Safari')) { // Check for Safari (excluding Chrome)
      this.browserName = 'Safari';
    } else if (userAgent.includes('Firefox')) { // Check for Firefox
      this.browserName = 'Mozilla Firefox';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) { // Check for Internet Explorer
      this.browserName = 'Internet Explorer';
    }
    console.log('Captured Browser Name:', this.browserName);
    //end here saheb

  }

  Login(form: NgForm) {
    if (!form.invalid) {
      this.showLodingSpinner = true;
      //start here saheb

      //Testing
      // this.apiURL = 'http://localhost:14080/token';

      //Staging
      //this.apiURL = 'https://BSHBAPI.esdinfra.com/token'; 

      //Live
      this.apiURL = 'https://api.bshbvgsl.com/token';

      //end here saheb

      const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const params = new HttpParams()
        .append('username', form.value.UserName)
        .append('password', form.value.Password)
        .append('grant_type', 'password')

      this.Http.post(this.apiURL, params, { headers: header }).subscribe((data: any) => {
        //console.log('data : ' +JSON.stringify(data))
        this.showLodingSpinner = false;
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userRole', data.userRole);
        localStorage.setItem('sessionId', data.sessionId);
        localStorage.removeItem('selectedMenu');
        this.userAuditLog(data.userName, data.sessionId);
        this.getDivision(data.userName)
        this.GetAllowedPages();
        //this.router.navigate(["/home"]);      
      },
        (error) => {
          console.log('Error:', error); // Log the error object
          this.isLoginError = true;
          this.showLodingSpinner = false;
          if (error.status == 500 || error.status == 502) {
            swal('', "Internal Server Error, Please try later");
          }
          else {
            const errorDescription = error.error ? error.error.error_description : 'Unknown Error';
            if (errorDescription) {
              swal('', errorDescription); // Display error description if available                      
            } else {
              swal('', 'An unknown error occurred'); // Fallback message for unknown error
            }

          }

        }
      )
    } else
      this.formSubmitted = true;

    /*
       if (!form.invalid) {     
         console.log('login  data : ' +JSON.stringify(form.value.UserName))
         console.log('login  data : ' +JSON.stringify(form.value.Password))
         this.showLodingSpinner = true;
         this.userService.userAuthentication(form.value)
           .subscribe((data: any) => {
             console.log('data : ' +JSON.stringify(data))
             this.showLodingSpinner = false;
             localStorage.setItem('accessToken', data.access_token);
             localStorage.setItem('userName', data.userName);
             localStorage.setItem('userRole', data.userRole);
             localStorage.removeItem('selectedMenu');
             this.getDivision(data.userName)
             this.GetAllowedPages();
           },
             (error) => {
               console.log('Error:', error); // Log the error object
               this.isLoginError = true;
               this.showLodingSpinner = false;
               if (error.status == 500 || error.status == 502) {
                 swal('', "Internal Server Error, Please try later");
               }
               else
               {
                 const errorDescription = error.error ? error.error.error_description : 'Unknown Error';
                 if (errorDescription) {
                   swal('', errorDescription); // Display error description if available
                 } else {
                   swal('', 'An unknown error occurred'); // Fallback message for unknown error
                 }
                 
               }
                
             });
             
       } else
         this.formSubmitted = true;
   
       */


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
          //console.log('getallowedpages')
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

  userAuditLog(userName, sessionId) {
    var reqData = {
      UserName: userName,
      SessionId: sessionId,
      WebsiteURL: this.fullWebsiteUrl,
      APIURL: this.apiURL,
      ModuleName: this.websiteLastPart,
      BrowserName: this.browserName,
      ActivityType: "Login Submit"

    }
    this.data = this.userService.SaveUserAuditLog(reqData);
    this.data.subscribe(
      (response: any) => {
        console.log(JSON.stringify(response))
      }
    )
  }


}

