import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-courttype-form',
  templateUrl: './courttype-form.component.html',
  styleUrls: ['./courttype-form.component.css']
})
export class CourttypeFormComponent implements OnInit {

  title = "Add Court type";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  CourtT_Id: number;
  mode: string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.CourtT_Id = params['CourtT_Id'];
      this.mode = params['mode'];

      if (this.CourtT_Id > 0) {
        this.GetCourtTypeById(this.CourtT_Id)
      }
    });

    if (this.mode == 'view') {
      this.title = "View CourtType";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit CourtType";
    }
  }

  SaveCourtType(CourtType: NgForm) {

    if (CourtType.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }


    else {

      this.data = this.userService.PostCourtType(CourtType.value);
      this.data.subscribe(
        (response) => {
          CourtType.reset();
          CourtType.resetForm();
          CourtType.form.markAsPristine();
          CourtType.form.markAsUntouched();
          
          if (response.Result === "Court Type with similar Court type code or Court type name already exists")
         {
          swal('Warning!', response.Result, 'warning')
         } 
         else {
         swal('Success!',   response.Result , 'success');
          this.router.navigate(['/home/courttype']);
      }
          // swal('Success!', 'CourtType Added Successfully .', 'success');
          // this.router.navigate(['/home/courttype']);
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
  GetCourtTypeById(CourtT_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCourtType(CourtT_Id);
    this.data.subscribe(
      (response: any) => {
        this.c = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateCourtType(CourtType: NgForm) {
    if (CourtType.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.UpdateCourtType(CourtType.value, this.CourtT_Id);
      this.data.subscribe(
        (response) => {
          CourtType.reset();
          CourtType.resetForm();
          CourtType.form.markAsPristine();
          CourtType.form.markAsUntouched();
          if (response.Result === "Court Type with similar Court type code or Court type name already exists")
            {
             swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',   response.Result , 'success');
             this.router.navigate(['/home/courttype']);
         }
          // swal('Success!', 'CourtType updated Successfully .', 'success');
          // this.router.navigate(['/home/courttype']);
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
    this.c.CourtT_Code = '';
    this.c.CourtT_Name = '';
  }

}