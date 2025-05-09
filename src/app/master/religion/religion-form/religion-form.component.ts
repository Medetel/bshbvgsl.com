import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-religion-form',
  templateUrl: './religion-form.component.html',
  styleUrls: ['./religion-form.component.css']
})
export class ReligionFormComponent implements OnInit {

  title = "Add Religion";
  r: any = [];
  data: any = [];
  formInvalid: boolean = false;
  mode: any;
  Rlg_Id: number;
  religionList: any
  relionlist: any = []
  Code: string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe: TitleCasePipe) {

  }
  ngOnInit() {
    this.GetDefaultData()
    this.route.params.subscribe(params => {
      this.Rlg_Id = params['Rlg_Id'];
      this.mode = params['mode'];

      if (this.Rlg_Id > 0) {
        this.GetReligionById(this.Rlg_Id)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Religion ";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit Religion ";
    }

  }

  GetDefaultData() {
    this.data = this.userService.GetReligions();
    this.data.subscribe(
      (response: any) => {
        this.relionlist = response;
      })

    this.data = this.userService.GetAllCodes('religion_mst');
    this.data.subscribe(
      (response: any) => {
        this.Code = response;
        if ((this.mode != 'View') && (this.mode != 'edit'))
          this.r.Religion_Code = response;
      })

    
  }

  SaveReligion(Religion: NgForm) {  

    Religion.value.Name = this.titlecasePipe.transform(Religion.value.Name);
    var list = this.relionlist.filter(a => a.Relg_Name == Religion.value.Name);

    if (list.length > 0) {
      swal('Warning!', Religion.value.Name + ' already exist.', 'warning');
      return;
    }

    if (Religion.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {          
      this.data = this.userService.PostReligion(Religion.value);
      this.data.subscribe(
        (response) => {
          Religion.reset();
          Religion.resetForm();
          Religion.form.markAsPristine();
          Religion.form.markAsUntouched();
          swal('Success!', 'Religion Added Successfully .', 'success');
          this.router.navigate(['/home/masters']);
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
  UpdateReligionDetails(Religion: NgForm) {  
    if (Religion.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    Religion.value.Religion_Code = this.Code;
    this.data = this.userService.UpdateReligionDetails(this.Rlg_Id, Religion.value);
    this.data.subscribe(
      (response) => {
        Religion.reset();
        Religion.resetForm();
        swal('Success!', ' Religion details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/masters']);
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
  GetReligionById(Rlg_Id) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetReligionById(Rlg_Id);
    this.data.subscribe(
      (response: any) => {
        this.r = response;

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    if (this.mode == 'View') {
      this.title = "View Scales/Grades ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Scales/Grades ";
    }
  }

  Cancel() {
    this.r.Religion_Code = '';
    this.r.Name = '';
  }
}
