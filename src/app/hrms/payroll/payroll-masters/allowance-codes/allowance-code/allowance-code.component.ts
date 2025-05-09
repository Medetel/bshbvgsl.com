import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../shared/user.service';
import { ErrorHandler } from '../../../../../shared/ErrorHandler';
import { Search } from '../../../../../shared/user.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-allowance-code',
  templateUrl: './allowance-code.component.html',
  styleUrls: ['./allowance-code.component.css']
})
export class AllowanceCodeComponent implements OnInit {

  a: any ={};
  formInvalid: boolean;
  data: any=[];
  code: string;
  mode: string;  
  allowanceList: any =[];
  show1:boolean = false;
  show2:boolean = false;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.code = params['id'];
      this.mode = params['mode'];  
      if(this.code != null) {
        this.GetByIdpayrollEarningDeduction(this.code);  
        //this.show1 = true; 
      }           
    });

    this.getDefaultData()
  }
 

  toggle1() {
    this.show1 = !this.show1;       
  }
  toggle2(){
    this.show2 = !this.show2;     
  }

  getDefaultData(){
    this.data = this.userService.uspAllowaDeductionDuplicationCheck();
    this.data.subscribe(
      (response: any) => {
        this.allowanceList = response;
      })

  }

  SaveAllowanceDedu(details:NgForm){
    debugger;
    var list = this.allowanceList.filter(a =>a.ED_DESC == details.value.ED_DESC)
    if(list.length>0){
      swal('Warning!',details.value.ED_DESC+ ' is already exist', 'warning');
      return;
    }

    if (details.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {    
      if(details.value.Fixed_Variable_ind == "F")
        {
        details.value.ED_Category = 'A'
        }
        else if(details.value.Fixed_Variable_ind == "V") {
        details.value.ED_Category = 'F'
        }
      details.value.ED_TYPE = 'E' ;
      this.data = this.userService.InsertpayrollEarningDeduction(details.value);
      this.data.subscribe(
        (response) => {
          details.reset();
          details.resetForm();
          details.form.markAsPristine();
          details.form.markAsUntouched();
          swal('Success!', 'Allowance Details Added Successfully .', 'success');
          this.router.navigate(['/home/payroll/allowance-code-grid']);
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


  GetByIdpayrollEarningDeduction(code) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.uspGetEllowanceDedductionById(code);
    this.data.subscribe(
      (response: any) => {
        this.a = response;
        //this.d.DEPND_DOB = ((this.d.DEPND_DOB).split('T'))[0];         
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
 


  UpdateAllowanceDedu(details:NgForm){  

    if (details.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {    
      details.value.ED_TYPE = 'E' ;
      this.data = this.userService.uspEditPayrollAllowanceDeduction(details.value,this.code);
      this.data.subscribe(
        (response) => {
          details.reset();
          details.resetForm();
          details.form.markAsPristine();
          details.form.markAsUntouched();
          swal('Success!', 'Allowance Details Update Successfully .', 'success');
          this.router.navigate(['/home/payroll/allowance-code-grid']);       
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


  Cancel(){
    this.router.navigate(['/home/payroll/allowance-code-grid']);
  }


Fixed(){
this.a.ED_Category = 'A';
}

Variable(){
this.a.ED_Category = 'F';
}
}
