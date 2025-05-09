import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-fm-form',
  templateUrl: './fm-form.component.html',
  styleUrls: ['./fm-form.component.css']
})
export class FmFormComponent implements OnInit {

  title = "Add File Movement";
  f: any = {};
  data: any = {};
  departmentlist: any = [];
  formInvalid: boolean = false;
  mode: any;
  FM_Id: any;
  Status: number

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.FM_Id = params['FM_Id'];
      this.mode = params['mode'];
      this.GetByIdFileMovement(this.FM_Id);
    });

    this.getDegaultData()

  }

  getDegaultData() {
    //Get All departments
    this.data = this.userService.GetAllDepartments();
    this.data.subscribe(
      (response: any) => {
        this.departmentlist = response.Result;
      })
  }

  SaveFileMovement(FileMov: NgForm) {

    if (FileMov.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else if (FileMov.value.FM_Status == null) {
      swal('Warning!', 'Please select status.', 'warning');
    }

    else {

      this.data = this.userService.GetFileMovingStatus(FileMov.value.FM_Number, FileMov.value.FM_Status, FileMov.value.FM_Dep_Id_FK)
      this.data.subscribe(
        (response) => {
          this.Status = response;
          if (this.Status == 0) {
            swal('Warning!', 'This File is already .' + FileMov.value.FM_Status, 'warning');
            return;
          }

          else {

            this.data = this.userService.PostFileMovement(FileMov.value);
            this.data.subscribe(
              (response) => {
                FileMov.reset();
                FileMov.resetForm();
                FileMov.form.markAsPristine();
                FileMov.form.markAsUntouched();
                swal('Success!', 'File Movement Added Successfully .', 'success');
                this.router.navigate(['/home/filemovement']);
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

        })

    }
  }


  GetByIdFileMovement(FM_Id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdFileMovement(FM_Id);
    this.data.subscribe(
      (response: any) => {
        this.f = response;
        if (this.f.FM_DateTime != null)
          this.f.FM_DateTime = ((this.f.FM_DateTime).split('T'))[0];

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdateFileMovement(FileMov: NgForm) {
    this.data = this.userService.UpdateFileMovement(this.FM_Id, FileMov.value);
    this.data.subscribe(
      (response) => {
        FileMov.reset();
        FileMov.resetForm();
        FileMov.form.markAsPristine();
        FileMov.form.markAsUntouched();
        swal('Success!', ' File Movement updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/filemovement']);
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