import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-court-form',
  templateUrl: './court-form.component.html',
  styleUrls: ['./court-form.component.css']
})
export class CourtFormComponent implements OnInit {

  title = "Add Court";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  Court_Id: number;
  mode: string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.Court_Id = params['Court_Id'];
      this.mode = params['mode'];

      if (this.Court_Id > 0) {
        this.GetCourtById(this.Court_Id)
      }
    });

    if (this.mode == 'view') {
      this.title = "View Court";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit Court";
    }
  }

  SaveCourt(Court: NgForm) {
    if (Court.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {

      this.data = this.userService.PostCourt(Court.value);
      this.data.subscribe(
        (response) => {
          Court.reset();
          Court.resetForm();
          Court.form.markAsPristine();
          Court.form.markAsUntouched();
          if (response.Result === "Court with similar Court code or Court name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result , 'success');
            this.router.navigate(['/home/court']);
            }
          // swal('Success!', 'Court Added Successfully .', 'success');
          // this.router.navigate(['/home/court']);
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
  GetCourtById(Court_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCourt(Court_Id);
    this.data.subscribe(
      (response: any) => {
        this.c = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateCourt(Court: NgForm) {
    debugger;
    if (Court.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.UpdateCourt(Court.value, this.Court_Id);
      this.data.subscribe(
        (response) => {
          Court.reset();
          Court.resetForm();
          Court.form.markAsPristine();
          Court.form.markAsUntouched();
          if (response.Result === "Court with similar Court code Court name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result , 'success');
            this.router.navigate(['/home/court']);
            }

          // swal('Success!', 'Court updated Successfully .', 'success');
          // this.router.navigate(['/home/court']);
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
    this.c.Court_Code = '';
    this.c.Court_Name = '';
  }
}