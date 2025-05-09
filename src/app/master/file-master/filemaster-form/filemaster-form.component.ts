import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-filemaster-form',
  templateUrl: './filemaster-form.component.html',
  styleUrls: ['./filemaster-form.component.css']
})
export class FilemasterFormComponent implements OnInit {

  title = "Add File";
  data: any = {};
  formInvalid: boolean = false;
  f: any = {};

  File_Id: number;
  mode: string;
  departmentlist: any = {}

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.File_Id = params['File_Id'];
      this.mode = params['mode'];

      if (this.File_Id > 0) {
        this.GetFileById(this.File_Id)
      }
    });

    if (this.mode == 'view') {
      this.title = "View File";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit File";
    }

    //Get All departments
    this.data = this.userService.GetAllDepartments();
    this.data.subscribe(
      (response: any) => {
        this.departmentlist = response.Result;
      })
  }

  SaveFile(File: NgForm) {

    if (File.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      this.data = this.userService.PostFile(File.value);
      this.data.subscribe(
        (response) => {
          File.reset();
          File.resetForm();
          File.form.markAsPristine();
          File.form.markAsUntouched();
          if (response.Result === "File with similar File Name or File Number already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!', response.Result , 'success');
            this.router.navigate(['/home/filemaster']);
            }
          
         // swal('Success!', 'File Added Successfully .', 'success');
          //this.router.navigate(['/home/filemaster']);
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

  GetFileById(File_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdFile(File_Id);
    this.data.subscribe(
      (response: any) => {
        this.f = response;     

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateFile(File: NgForm) {
    this.data = this.userService.UpdateFile(File.value, this.File_Id);
    this.data.subscribe(
      (response) => {
        File.reset();
        File.resetForm();
        File.form.markAsPristine();
        File.form.markAsUntouched();
        if (response.Result === "File with similar File Name or File Number already exists")
          {
          swal('Warning!', response.Result, 'warning')
          } 
          else {
          swal('Success!', response.Result , 'success');
          this.router.navigate(['/home/filemaster']);
          }
        //swal('Success!', 'File updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        //this.router.navigate(['/home/filemaster']);
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

  Cancel() {
    this.f.File_Number = '';
    this.f.File_Name = '';
    this.f.File_Dep_Id_FK = '';
  }

}
