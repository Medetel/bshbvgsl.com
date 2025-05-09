import { Component, OnInit, ErrorHandler } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-installment-form',
  templateUrl: './installment-form.component.html',
  styleUrls: ['./installment-form.component.css']
})
export class InstallmentFormComponent implements OnInit {
  data: any = {};
  c: any = {};
  stateList: any = [];
  s: any = {};
  districtList: any = [];
  d: any = {};
  CUST_ID: any;
  mode: any;
  title: any;
  Code: any;
  formInvalid: boolean = false;
  formSubmitted: boolean;
  message: boolean;
  CustomerList: any;
  totalItems: any;
  currentPage: number;
  applicant: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {
  }

  get formattedAllotDate(): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(this.applicant.PR_App_AllotDate, 'yyyy-MM-dd') || '';
  }

  ngOnInit() {
    this.GetStateCustomerModel()
    this.GetDistrictCustomerModel(this.ST_Id)

    this.route.params.subscribe(params => {
      this.CUST_ID = params['CUST_ID'];
      this.mode = params['mode'];

      if (this.CUST_ID > 0) {

        this.GetByIdCustomerModel(this.CUST_ID)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Caste ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Caste ";
    }
  }




  ST_Id(ST_Id: any) {
    throw new Error("Method not implemented.");
  }

  GetStateCustomerModel() {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetStateCustomer();
    this.data.subscribe(
      (response: any) => {
        this.stateList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetDistrictCustomerModel(ST_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDistrictCustomer(ST_Id);
    this.data.subscribe(
      (response: any) => {
        this.districtList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetByIdCustomerModel(CUST_ID) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCustomerModel(CUST_ID);
    this.data.subscribe(
      (response: any) => {
        this.c = response;
        this.GetDistrictCustomerModel(this.c.CUST_ST_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  CreateCustomer(Customer: NgForm) {
    debugger;
    // if(Customer.invalid)
    // {
    //   this.formInvalid = true;
    //   swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
    //   return;
    // }     

    // else{                                     
    this.data = this.userService.CreateCustomer(Customer.value);
    this.data.subscribe(
      (response) => {
        Customer.reset();
        Customer.resetForm();
        Customer.form.markAsPristine();
        Customer.form.markAsUntouched();
        swal('Success!', 'Customer Details Added Successfully .', 'success');
        this.router.navigate(['/home/customer-master']);
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
    // } 
  }

  UpdateCustomer(Customer: NgForm) {
    debugger;
    this.data = this.userService.UpdateCustomer(this.CUST_ID, Customer.value);
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Customer details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/customer-master']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
      });
  }
  Cancel() {
    this.c = {};
  }

  GetAllApplicantdetailsBySearch(searchText) {
    debugger;
    console.log(searchText)
    // var searchText = this.s.SearchText;
    if (searchText == "" || searchText == null)
    swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
    document.getElementById('loader-spinner').style.display = "block";
    // this.userService.GetAllApplicantdetailsBySearch(searchText)
    // .subscribe(
    // (data: any) => {
    // this.applicant = data.ApplicantModel;
    this.data = this.userService.GetAllApplicantdetailsBySearch(searchText);
    this.data.subscribe(
    (response: any) => {
    this.applicant = response.ApplicantModel[0];
    if (this.applicant.PR_App_AllotDate != null)
    this.applicant.PR_App_AllotDate = ((this.applicant.PR_App_AllotDate).split('T'))[0];
    if (this.applicant.PR_App_AllotDate != null)
    this.applicant.PR_App_AllotDate = ((this.applicant.PR_App_AllotDate).split('T'))[0];
    if (this.applicant.P_Applicant_pay_Date != null)
    this.applicant.P_Applicant_pay_Date = ((this.applicant.P_Applicant_pay_Date).split('T'))[0];
    console.log("applicant:", + this.applicant);
    document.getElementById('loader-spinner').style.display = "none";
    }, (error) => {
    document.getElementById('loader-spinner').style.display = "none";
    this.errorHandler.handleError(error);
    });
    }
    }
}
