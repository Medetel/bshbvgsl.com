import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-district-form',
  templateUrl: './district-form.component.html',
  styleUrls: ['./district-form.component.css']
})
export class DistrictFormComponent implements OnInit {

  title = "Add District";
  data: any = {};
  formInvalid: boolean = false;
  d: any = {};

  DI_Id: number;
  mode: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.DI_Id = params['DI_Id'];
      this.mode = params['mode'];

      if (this.DI_Id > 0) {
        this.GetDistrictById(this.DI_Id)
      }
    });

    if (this.mode == 'view') {
      this.title = "View District";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit District";
    }
  }

    



  SaveDistrict(Distict: NgForm) {
    if (Distict.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      this.data = this.userService.PostDistrict(Distict.value);
      this.data.subscribe(
        (response) => {
          Distict.reset();
          Distict.resetForm();
          Distict.form.markAsPristine();
          Distict.form.markAsUntouched();
          if (response.Result === "District with similar District code or district name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result  , 'success');
            this.router.navigate(['/home/district']);
            }
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

  GetDistrictById(DI_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdDistrict(DI_Id);
    this.data.subscribe(
      (response: any) => {
        this.d = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdateDistrict(District: NgForm) {
    if (District.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (District.value.DI_District != null && !District.value.DI_District.match("http"))
        document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateDistrict(District.value, this.DI_Id);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          District.reset();
          District.resetForm();
          District.form.markAsPristine();
          District.form.markAsUntouched();
          if (response.Result === "District with similar District code or district name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result  , 'success');
            this.router.navigate(['/home/district']);
            }
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

  Cancel() {   
    this.d.DI_District = '';
    this.d.DI_Code = '';
  }
}