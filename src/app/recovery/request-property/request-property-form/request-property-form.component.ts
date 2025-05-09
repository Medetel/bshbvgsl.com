import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request-property-form',
  templateUrl: './request-property-form.component.html',
  styleUrls: ['./request-property-form.component.css']
})
export class RequestPropertyFormComponent implements OnInit {

  data: any;
  ProjectList: any = [];
  PL: any = {};
  P: any = {};
  Categorylist: any = [];
  C: any = {};
  Customerlist: any = [];
  CU: any = {};
  PropertyList: any = [];
  Id: any;
  Id2: number;
  RequestForlist: any = [];
  F: any = {};
  ApplicantTypelist: any = [];
  R: any = [];
  formSubmitted: boolean;
  REQP_ID: any;
  mode: any = 'Save';
  title: string;
  CUST_ID: number;
  REQP_CA_ID: number;
  id1: any;
  BId: any;
  PropList: any;
  formInvalid: boolean;
  PropertyDetails: any = [];
  reqDtl: any = []
  SelectedList: any = [];
  CUST_DI_ID: any;
  REQP_APP_TYPE: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {
  }

  ngOnInit() {
    this.GetCustomerDetails();
    this.GetApplicantType();
    this.GetRequestFor();

    this.route.params.subscribe(params => {

      this.REQP_ID = params['REQP_ID'];
      this.BId = params['BId'];
      this.mode = params['mode'];
      this.CUST_ID = params['CUST_ID'];
      this.REQP_APP_TYPE = params['REQP_APP_TYPE'];
      if (this.REQP_ID > 0) {

        this.GetByIdRequestPropertyDetails(this.REQP_ID)

      }
    });
    if (this.REQP_APP_TYPE == null || this.REQP_APP_TYPE == undefined) {
      this.REQP_APP_TYPE = 1;
    }
    if (this.REQP_APP_TYPE == 2) {
      this.REQP_APP_TYPE = 5140;
    }
    if (this.mode == 'View') {
      this.title = "View Caste ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Caste ";
    }
  }

  GetCategoryDetails() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCategoryDetails();
    this.data.subscribe(
      (response: any) => {
        this.Categorylist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetCategoryDetailsOnProjId(proj_id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCategoryDetailsOnProjId(proj_id);
    this.data.subscribe(
      (response: any) => {
        this.Categorylist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetCustomerDetails() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCustomerDetails();
    this.data.subscribe(
      (response: any) => {
        this.Customerlist = response.Result;
        this.GetByIdCustomerDetails(this.R.CUST_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetProjectDetails(CUST_DI_ID) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProjectDetails_New(CUST_DI_ID);
    this.data.subscribe(
      (response: any) => {
        this.ProjectList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetProperty(PD_Id, REQP_CA_ID, mode, REQP_APP_TYPE) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProperty(PD_Id, REQP_CA_ID, this.mode, this.REQP_APP_TYPE);
    this.data.subscribe(
      (response: any) => {
        this.PropertyList = response;
        if (this.SelectedList != null) {
          for (let i = 0; i < this.SelectedList.length; i++) {
            for (let j = 0; j < this.PropertyList.length; j++) {
              if (this.SelectedList[i].PR_Id == this.PropertyList[j].PR_Id) {
                this.PropertyList[j].Selected = 1
              }
            }
          }
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetId(REQP_PD_ID) {
    this.Id = REQP_PD_ID;
    this.GetCategoryDetailsOnProjId(REQP_PD_ID);
  }
  GetIdCat(REQP_CA_ID, mode) {
    this.Id2 = REQP_CA_ID;
    this.mode = mode;
    this.GetProperty(this.P.REQP_PD_ID, this.P.REQP_CA_ID, this.mode, this.REQP_APP_TYPE);
  }

  GetRequestFor() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetRequestFor();
    this.data.subscribe(
      (response: any) => {
        this.RequestForlist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetApplicantType() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetApplicantType();
    this.data.subscribe(
      (response: any) => {
        this.ApplicantTypelist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetByIdCustomerDetails(CUST_ID) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCustomerDetails(CUST_ID);
    this.data.subscribe(
      (response: any) => {
        this.R = response;
        this.GetProjectDetails(this.R.CUST_DI_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Cancel() {
    this.R = {};
  }

  CreateRequestProperty(RequestProperties: NgForm) {

    if (RequestProperties.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      for (let i = 0; i < this.PropertyList.length; i++) {
        if (this.PropertyList[i].Selected == true) {
          this.PropertyList[i].Selected = 1;
        }
        else { this.PropertyList[i].Selected = 0; }
      }
      RequestProperties.value.REQPD_PROPRTY = this.Id;
      RequestProperties.value.RequestProperty = this.PropertyList;
      for (let p = 0; p < this.PropertyList.length; p++) {
        let temp = {
          REQP_PD_ID: this.P.REQP_PD_ID,
          REQPD_PROPRTY: this.PropertyList[p].PR_Id,
          REQP_CA_ID: this.P.REQP_CA_ID,
          REQP_CUST_ID: this.P.REQP_CUST_ID,
          selected: this.PropertyList[p].Selected,
        }
        this.reqDtl.push(temp)
      }
      RequestProperties.value.RequestProperty = this.reqDtl;
      this.data = this.userService.CreateRequestProperty(RequestProperties.value);
      this.data.subscribe(
        (response) => {
          RequestProperties.reset();
          RequestProperties.resetForm();
          RequestProperties.form.markAsPristine();
          RequestProperties.form.markAsUntouched();
          swal('Success!', 'Saved Successfully .', 'success');
          this.router.navigate(['/home/request-property']);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401 || error.status == 500) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
  }

  selectProp(PR_Id) {
      
    for (let i = 0; i < this.PropertyList.length; i++) {
      if (this.PropertyList[i].PR_Id == PR_Id) {
        if (this.PropertyList[i].Selected == true) {
          this.PropertyList[i].Selected = false;
          break;
        }
        else { this.PropertyList[i].Selected = true; }
        break;
      }
    }
  }

  GetByIdRequestPropertyDetails(REQP_ID) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdRequestPropertyDetails(REQP_ID);
    this.data.subscribe(
      (response: any) => {
        this.P = response;
        this.R = response;
        this.SelectedList = response.RequestProperty;
        this.GetApplicantType();
        this.GetProperty(this.P.PD_Id, this.P.CA_Id, this.mode, this.REQP_APP_TYPE);

        this.GetRequestFor();
        this.GetProjectDetails(this.R.CUST_DI_ID);
        this.GetCustomerDetails();
        if (this.REQP_APP_TYPE != 1) {
          this.P.REQP_APP_TYPE = this.REQP_APP_TYPE;
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  select(PR_Id) {

    this.Id = PR_Id;
  }

  UpdateRequestProperty(RequestProperties: NgForm) {
    if (RequestProperties.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      for (let i = 0; i < this.PropertyList.length; i++) {
        if (this.PropertyList[i].Selected == true) {
          this.PropertyList[i].Selected = 1;
        }
        else { this.PropertyList[i].Selected = 0; }
      }
      RequestProperties.value.REQPD_PROPRTY = this.Id;
      RequestProperties.value.RequestProperty = this.PropertyList;

      for (let p = 0; p < this.PropertyList.length; p++) {
        let temp = {
          REQP_PD_ID: this.P.REQP_PD_ID,
          REQPD_PROPRTY: this.PropertyList[p].PR_Id,
          REQP_CA_ID: this.P.REQP_CA_ID,
          REQP_CUST_ID: this.P.REQP_CUST_ID,
          selected: this.PropertyList[p].Selected,
        }
        this.reqDtl.push(temp)
      }
      RequestProperties.value.RequestProperty = this.reqDtl;
      this.data = this.userService.UpdateRequestProperty(this.REQP_ID, RequestProperties.value);
      this.data.subscribe(
        (response) => {
          RequestProperties.reset();
          RequestProperties.resetForm();
          RequestProperties.form.markAsPristine();
          RequestProperties.form.markAsUntouched();
          swal('Success!', 'Request Property details updated Successfully.', 'success');
          this.router.navigate(['/home/request-property']);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401 || error.status == 500) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
  }
}