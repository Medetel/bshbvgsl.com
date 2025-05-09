import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-casetype-form',
  templateUrl: './casetype-form.component.html',
  styleUrls: ['./casetype-form.component.css']
})
export class CasetypeFormComponent implements OnInit {

  title = "Add CaseType";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  CaseType_Id: number;
  mode: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.CaseType_Id = params['CaseType_Id'];
      this.mode = params['mode'];

      if (this.CaseType_Id > 0) {
        this.GetCaseTypeById(this.CaseType_Id)
      }
    });

    if (this.mode == 'view') {
      this.title = "View CaseType";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit CaseType";
    }
  }

  SaveCaseType(Casetype: NgForm) {
debugger;
    if (Casetype.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }


    else {

      this.data = this.userService.PostCaseType(Casetype.value);
      this.data.subscribe(
        (response) => {
          Casetype.reset();
          Casetype.resetForm();
          Casetype.form.markAsPristine();
          Casetype.form.markAsUntouched();
          if (response.Result === "Case Type with similar Case Type code or Case Type name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result , 'success');
            this.router.navigate(['/home/casetype']);
            }
          // swal('Success!', 'Casetype Added Successfully .', 'success');
          // this.router.navigate(['/home/casetype']);
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

  GetCaseTypeById(CaseType_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCaseType(CaseType_Id);
    this.data.subscribe(
      (response: any) => {
        this.c = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateCaseType(Casetype: NgForm) {

    if (Casetype.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.UpdateCaseType(Casetype.value, this.CaseType_Id);
      this.data.subscribe(
        (response) => {
          Casetype.reset();
          Casetype.resetForm();
          Casetype.form.markAsPristine();
          Casetype.form.markAsUntouched();
          if (response.Result === "Case Type with similar Case Type code or Case Type name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result , 'success');
            this.router.navigate(['/home/casetype']);
            }
          // swal('Success!', 'Casetype Updated Successfully .', 'success');
          // this.router.navigate(['/home/casetype']);
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
    this.c.CaseType_Name = '';
    this.c.CaseType_Code = '';
  }

}