import { Component, OnInit } from '@angular/core';
import { Application } from '../../../shared/user.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.css']
})
export class HospitalFormComponent implements OnInit {
  a: any;
  b: any;
  Code: any;
  Hospitalist: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler
    , private titlecasePipe: TitleCasePipe) {

  }
  title = "Add Hospital";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  h: any = {};
  secondDate1: any;
  fristDate1: any;
  mode: any;
  hsptl_id: any;
  Stat_Id: number;
  StateList: any = [];
  monthCount: any;
  CasteCategoryList: any
  ngOnInit() {
    this.getAllState();
    this.route.params.subscribe(params => {
      this.hsptl_id = params['hsptl_id'];
      this.mode = params['mode'];     
      if (this.hsptl_id > 0) {
        this.GetHospitalById(this.hsptl_id)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Hospital ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Hospital ";
    }
    this.GetCasteCategory();

  }
  getAllState() {
    this.data = this.userService.GetState();
    this.data.subscribe(
      (response) => {     
        this.StateList = response.StateModel;
      })

    this.data = this.userService.GetAllCodes('hospital_mst');
    this.data.subscribe(
      (response: any) => {
        this.Code = response;
        if ((this.mode != 'View') && (this.mode != 'Edit')) {
          this.h.hsptl_code = response;
        }
      })
  }

  GetCasteCategory() {  
    this.data = this.userService.GetDistic();
    this.data.subscribe(
      (response) => {
        this.CasteCategoryList = response.Caste_Category;
      })

    this.data = this.userService.GetAllHospitals();
    this.data.subscribe(
      (response) => {
        this.Hospitalist = response;
      })
  }

  GetDate(cntr_start_date: any, cntr_end_date: any) {  
    this.monthCount = this.GetMonth(cntr_start_date, cntr_end_date);
    this.h.month = this.monthCount;
  }
  GetMonth(start: any, end1: any) {   
    var tempDate = new Date(start);
    var end = new Date(end1);
    this.monthCount = 0;
    this.monthCount = this.monthCount;

    while ((tempDate.getMonth() + '' + tempDate.getFullYear()) != (end.getMonth() + '' + end.getFullYear())) {
      this.monthCount++;
      tempDate.setMonth(tempDate.getMonth() + 1);
    }
    return this.monthCount + 1;

  }

  SaveCaste(Caste: NgForm) {   
    Caste.value.hsptl_name = this.titlecasePipe.transform(Caste.value.hsptl_name);

    var list = this.Hospitalist.filter(a => a.hsptl_name == this.h.hsptl_name);
    if (list.length > 0) {
      swal('Warning!', this.h.hsptl_name + ' already exist.', 'warning');
      return;
    }

    if (Caste.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {    
      this.data = this.userService.PostHospital(Caste.value);
      this.data.subscribe(
        (response) => {
          Caste.reset();
          Caste.resetForm();
          Caste.form.markAsPristine();
          Caste.form.markAsUntouched();
          swal('Success!', 'Hospital Added Successfully .', 'success');
          this.router.navigate(['/home/masters/hospital']);
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

  GetHospitalById(hsptl_id) { 

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetHospitalById(hsptl_id);
    this.data.subscribe(
      (response: any) => {
        this.h = response;
        if (this.h.cntr_start_date != null && this.h.cntr_end_date != null) {
          this.h.cntr_start_date = ((this.h.cntr_start_date).split('T'))[0];
          this.h.cntr_end_date = ((this.h.cntr_end_date).split('T'))[0];

        }
        this.monthCount = this.GetMonth(this.h.cntr_start_date, this.h.cntr_end_date);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });


  }

  UpdateCasteDetails(Caste: NgForm) {   
    this.data = this.userService.UpdateHospitalDetails(this.hsptl_id, Caste.value);
    this.data.subscribe(
      (response) => {
        if (this.h.cntr_start_date != null)
          this.h.cntr_start_date = ((this.h.cntr_start_date).split('T'))[0];
        swal('Success!', ' Hospital details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/masters/hospital']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }

      });
  }

  Cancel() {
    this.h.hsptl_code = '';
    this.h.hsptl_name = '';
    this.h.Address = '';
    this.h.hsptl_add_city = '';
    this.h.hsptl_add_state = '';
    this.h.hsptl_contact_p = '';
    this.h.Mouh = '';
    this.h.cntr_start_date = '';
    this.h.cntr_end_date = '';
    this.monthCount = '';
  }
}
