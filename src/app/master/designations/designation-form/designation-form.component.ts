import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-designation-form',
  templateUrl: './designation-form.component.html',
  styleUrls: ['./designation-form.component.css']
})
export class DesignationFormComponent implements OnInit {

  title = "Add Designation";
  r: any = {};
  data: any = {};
  formInvalid: boolean = false;
  mode: any;
  Dsc_Id: number;
  religionList: any;
  Code: any;
  DesignationList: any = [];
  sum: number = 0; 
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe: TitleCasePipe) { }

  ngOnInit() {
    this.getdefaultData();
    this.route.params.subscribe(params => {
      this.Dsc_Id = params['Dsc_Id'];
      this.mode = params['mode'];

      if (this.Dsc_Id > 0) {
        this.GetDesignationById(this.Dsc_Id)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Designation ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Designation ";
    }
  }

  getdefaultData() {
    this.data = this.userService.GetAllCodes('designation_mst');
    this.data.subscribe(
      (response: any) => {
        this.Code = response;
        if ((this.mode != 'View') && (this.mode != 'Edit')) {
          this.r.Dsc_Code = response;
        }
      })


    this.data = this.userService.GetAllDesignation();
    this.data.subscribe(
      (response: any) => {
        this.DesignationList = response;
      })
  }

  SaveReligion(Religion: NgForm) {    

    Religion.value.Dsc_Name = this.titlecasePipe.transform(Religion.value.Dsc_Name);   
    var list = this.DesignationList.filter(a => a.desg_name == Religion.value.Dsc_Name);

    if (list.length > 0) {
      swal('Warning!', Religion.value.Dsc_Name + ' already exist.', 'warning');
      return;
    }

    Religion.value.Dsc_Code = this.Code;
    if (Religion.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {                  
      this.data = this.userService.PostDesignation(Religion.value);
      this.data.subscribe(
        (response) => {
          Religion.reset();
          Religion.resetForm();
          Religion.form.markAsPristine();
          Religion.form.markAsUntouched();
          swal('Success!', 'Designation Added Successfully .', 'success');
          this.router.navigate(['/home/masters/designation']);
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
  GetDesignationById(Dsc_Id) {    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDesignationById(Dsc_Id);
    this.data.subscribe(
      (response: any) => {
        this.r = response;       
        this.mydata(this.r.Desg_gen, this.r.Desg_371j)
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdateReligionDetails(Religion: NgForm) {  
    if (Religion.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    Religion.value.Dsc_Name = this.titlecasePipe.transform(Religion.value.Dsc_Name);
    Religion.value.Dsc_Code = this.r.Dsc_Code;
    this.data = this.userService.UpdateDgDetails(this.Dsc_Id, Religion.value);
    this.data.subscribe(
      (response) => {
        Religion.reset();
        Religion.resetForm();
        swal('Success!', ' Designation details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/masters/designation']);
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
    this.r.Dsc_Code = '';
    this.r.Dsc_Name = '';
    this.r.Desg_gen = '';
    this.r.Desg_371j = '';
  }

  mydata(gen, another) {
    this.sum = (+gen) + (+another);
  }

}
