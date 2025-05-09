import { Component, ErrorHandler, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {

  formInvalid: boolean;
  title="Change Address";
  userRole: any;
  c: any = [];
  u: any = [];
  newAddress: any = {};
  ItemsPerPage: number = 5;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  pageno: number=1;
  data: any = [];
  userName: any;
  District: any = {};
  Districts: any = {};
  Taluks: any = {};
  numbers: any = {};
  APP_Id: any;
  copyAddress: boolean = false;
  APP_No: string;
  ApplDetails: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole'); 
    this.userName = localStorage.getItem('userName'); 
    // this.GetByIdApplicantChangeAddress(this.userName);
    this.GetAllDistrict();
    this.GetAllDistrictco();
    // this.GetByIdApplicant(this.APP_Id);
    
    // this.GetByIdApplicant(this.c.APP_Id);
  }
  // searchText;
  // heroes = [
  //   { id: 11, name: 'Mr. Nice', country: 'India' },
  //   { id: 12, name: 'Narco' , country: 'USA'},
  //   { id: 13, name: 'Bombasto' , country: 'UK'},
  //   { id: 14, name: 'Celeritas' , country: 'Canada' },
  //   { id: 15, name: 'Magneta' , country: 'Russia'},
  //   { id: 16, name: 'RubberMan' , country: 'China'},
  //   { id: 17, name: 'Dynama' , country: 'Germany'},
  //   { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
  //   { id: 19, name: 'Magma' , country: 'South Africa'},
  //   { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  // ];
  // GetByIdApplicantChangeAddress(userName) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetByIdApplicantChangeAddress(userName);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.u = response;
  //       console.log("User:", response)
  //       // this.GetApplicationnumbers(this.c.APP_Id);

  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  GetAllDistrict() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDistrictApplicant();
    this.data.subscribe(
      (response: any) => {
        this.District = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetAllDistrictco() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDistrictApplicantco();
    this.data.subscribe(
      (response: any) => {
        this.Districts = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  // GetTaluks(DistrictId) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetTalukApplicant(DistrictId);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Taluks = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }
  // GetApplicationnumbers(APP_Id) {
  //   debugger;
  //   this.data = this.userService.GetByIdApplicantChangeAddress(APP_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.numbers = response;
  //     })
  //     this.GetByIdApplicant(APP_Id);

  // }

  GetByIdApplicant(APP_No: string): void {
    debugger
    // Ensure that the APP_No entered is saved in the model
    this.APP_No = APP_No;

    // Optional: Check if the application number is entered
    if (!APP_No) {
        console.error('Application number is required');
        return;
    }

    // Show loader before starting the API call
    document.getElementById('loader-spinner').style.display = "block";

    // Call the service to fetch applicant data based on the application number
    this.userService.GetByIdApplicantChangeAddressadmin(APP_No).subscribe(
        (response: any) => {
            // Hide loader after response
            document.getElementById('loader-spinner').style.display = "none";

            // Store the fetched data in the component (but do not reset c.APP_No)
            this.c = response.Result;
            console.log('Fetched applicant data:', this.c);

            // Ensure the application number in c.APP_No is still preserved
            this.c.APP_No = APP_No;
        },
        
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
            this.c=[];
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
            this.c=[];
          }
        }
    );
}

resetForm() {
  // Clear the c object that holds the applicant data
  this.c = {
    APP_PA_Name: '',
    APP_PA_Gender: '',
    APP_PA_DOB: '',
    APP_PA_MobileNo: '',
    APP_PA_Photo: '',
    APP_No: '',
    APP_VI_Name_PERM: '',
    Post_Office_PERM: '',
    Police_Station_PERM: '',
    APP_DI_Id_FK_PERM: '',
    APP_Pincode_PERM: '',
    APP_VI_Name: '',
    Post_office_Co: '',
    Police_Station_Co: '',
    APP_DI_Id_FK: '',
    APP_Pincode: ''
  };

  // Reset the form values if required
  this.ApplDetails.resetForm();
}

  
    UpdateApplicantAddress(ApplDetails: NgForm) {  
      debugger;
      if (ApplDetails.invalid) {
        this.formInvalid = true;
        // swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
      
      else {
        //ApplDetails.value.APP_Id = this.c.APP_Id;
        // alert("Change address:"+JSON.stringify(ApplDetails.value));
        console.log("Change address:"+JSON.stringify(ApplDetails.value))
        this.data = this.userService.UpdateApplicantAddressDetails(this.APP_No,ApplDetails.value);
        this.data.subscribe(
          (response) => {
            // console.log("Response da:"+JSON.stringify(response));
            // swal('Success!', 'Applicant Change Address Updated Successfully .', 'success');
            this.c = {};
            this.copyAddress = false;
            ApplDetails.reset();
            ApplDetails.resetForm();
            ApplDetails.form.markAsPristine();
            ApplDetails.form.markAsUntouched();
            swal('Success!', 'Address Updated Successfully .', 'success');
            // this.router.navigate(['/home/emp-bank-details']);
            // this.GetByIdApplicant(this.c.APP_Id); 
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
    }

    copyPermanentAddress(checked: boolean) {
      if (checked) {
        // Copy permanent address details to communication address
        this.c.APP_VI_Name = this.c.APP_VI_Name_PERM;
        this.c.APP_DI_Id_FK = this.c.APP_DI_Id_FK_PERM;
        // this.newAddress.APP_TA_Id_FK = this.c.APP_TA_Id_FK_PERM;
        this.c.Post_office_Co = this.c.Post_Office_PERM;
        this.c.Police_Station_Co = this.c.Police_Station_PERM;
        this.c.APP_Pincode = this.c.APP_Pincode_PERM;
        // this.newAddress.Present_APP_Village_Name = this.c.Permanent_APP_Village_Name;
      } else {
        // Clear communication address fields if checkbox is unchecked
        this.c.APP_VI_Name = '';
        this.c.APP_DI_Id_FK = undefined;
        // this.newAddress.APP_TA_Id_FK = undefined;
        this.c.Post_office_Co = '';
        this.c.Police_Station_Co = '';
        this.c.APP_Pincode = '';
        // this.newAddress.Present_APP_Village_Name = '';
      }
    }
}

