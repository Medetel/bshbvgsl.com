import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-arrear-form',
  templateUrl: './arrear-form.component.html',
  styleUrls: ['./arrear-form.component.css']
})
export class ArrearFormComponent implements OnInit {
  data:any={};
  data1:any={};
  data2:any={};
  EmployeeList:any={};
  d:any={};
  c:any={};
  formInvalid: boolean;
  arr_id: any;
  hide: boolean = false;
  mode: string = "";
  title = "Arrear Details Form";
  EMP_CODE: any;
  EMP_EMPLOYEE_ID: any;
  days: any;
  monthcode: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
debugger
      this.arr_id = params['Id'];
      this.mode = params['mode'];

      if (this.arr_id > 0) {
        this.GetByIddetails(this.arr_id);
      }
      // if (this.EMP_CODE > 0) {
      //   this.GetArrearempCodelist(this.EMP_CODE);
      // } if (this.EMP_EMPLOYEE_ID ,this.days,this.monthcode> 0) {
      //   this.GetArrearmonthlist(this.EMP_EMPLOYEE_ID,this.days,this.monthcode, event);
      // }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "Arrear Details Form";
      }
     
    });


    // if (this.arr_id > 0) {
    //   this.GetByIddetails(this.arr_id);
    // }
this.getallnatureofemployement();
  }
  GetArrearempCodelist(EMP_CODE) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetArrearempCodelist(EMP_CODE);
    this.data.subscribe(
      (response: any) => {
        this.data= response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetArrearmonthlist(EMP_EMPLOYEE_ID,days,monthcode, event) {   
    // this.data.EMP_EMPLOYEE_ID = EMP_EMPLOYEE_ID;
    event.preventDefault();  
    document.getElementById('loader-spinner').style.display = "block";
    this.data1 = this.userService.GetArrearmonthlist(EMP_EMPLOYEE_ID,days,monthcode);
    this.data1.subscribe(
      (response: any) => {
        this.data1= response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  getallnatureofemployement(){
    this.data = this.userService.GetAllhrmsfixedCodes('EMP CATEGORY');
 this.data.subscribe(
 (response: any) => {
 this.EmployeeList = response;
 })
  }

  GetByIddetails(arr_id) {
    debugger
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdareardetails(arr_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.d = response;
        this.c.Emp_Cat = this.d.Emp_Cat;
        this.GetArrearempCodelist(this.d.EMP_CODE);
        this.GetArrearmonthlist(this.d.EMP_EMPLOYEE_ID,this.d.days,this.d.monthcode, event)
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  SaveArrarDetails(ArrearDetails: NgForm) {
    debugger
    if (ArrearDetails.invalid) {
      this.formInvalid = true;
      // swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      ArrearDetails.value.EMP_EMPLOYEE_ID = this.data[0].EMP_EMPLOYEE_ID;
      ArrearDetails.value.EMP_FIRST_NAME = this.data[0].EMP_FIRST_NAME;
      ArrearDetails.value.emppost = this.data[0].emppost;
      ArrearDetails.value.curdiv = this.data[0].curdiv;
      ArrearDetails.value.GrossPay = this.data1[0].GrossPay;
      ArrearDetails.value.TotalDeductions = this.data1[0].TotalDeductions;
      ArrearDetails.value.TotalPayable = this.data1[0].TotalPayable;
      this.data2 = this.userService.SaveArrarDetails(ArrearDetails.value);
      this.data2.subscribe(
        (response) => {
          ArrearDetails.reset();
          ArrearDetails.resetForm();
          ArrearDetails.form.markAsPristine();
          ArrearDetails.form.markAsUntouched();
          swal('Success!', 'Arrear Details Added Successfully .', 'success');
          this.router.navigate(['/home/leaveapp/arrear-grid']);
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


  
}
