import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../shared/user.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-miscellaneous-reports',
  templateUrl: './miscellaneous-reports.component.html',
  styleUrls: ['./miscellaneous-reports.component.css']
})
export class MiscellaneousReportsComponent implements OnInit {

a : any =[];
data : any =[];
Emplist : any =[];
CalendarList : any=[];
Emp_id : any;
MonthCode : any=null;
fixedEarningDetails : any =[];
variableEarningsDetails :any =[];
fixedDeduction : any =[];
variableDeductionDetails : any =[];
TotalFixedEarnings : number = 0;
TotalVaribaleEarnings : number = 0;
TotalFixedDeduction : number = 0
TotalVariableDeduction : number =0;
employeeDetails : any=[]
mode:any;


   constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
   ){ }

  ngOnInit() {
    this.GetAllEmployeeData()
    this.CalendarLists()   
  }


  GetAllEmployeeData() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeesofPay_emp();
    this.data.subscribe(
      (response: any) => {
        this.Emplist = response;        
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  printPage(): void {
    window.print();
   }
  CalendarLists(){
    this.data = this.userService.GetMonthlyCalendarPayrollProcessed();
    this.data.subscribe(
      (response) => {
        this.CalendarList = response;
      })    
  }

ChangeEmp(emp_id){  
  this.Emp_id = emp_id;  
  this.getAllDetails(this.MonthCode,emp_id)
   this.getEmployeeDeatils(this.MonthCode,emp_id)
}
ChangeOfMonth(monthcode){ 
  this.MonthCode = monthcode;
  this.getEmployeeDeatils(monthcode,this.Emp_id)
this.getAllDetails(monthcode,this.Emp_id)
 
}


getAllDetails(MonthCode,Emp_id){
this.fixedEarningDetails =[];
this.variableEarningsDetails =[];
this.fixedDeduction =[];
this.variableDeductionDetails =[];
this.TotalFixedEarnings  = 0;
this.TotalVaribaleEarnings  = 0;
this.TotalFixedDeduction = 0
this.TotalVariableDeduction  =0;
this.employeeDetails=[];

 document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetallowanceDeduction(MonthCode,Emp_id,'F','E');
      this.data.subscribe(
        (response: any) => {
          this.fixedEarningDetails = response;          
          this.findTotalfixEarn()             
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );

    document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetallowanceDeduction(MonthCode,Emp_id,'V','E');
      this.data.subscribe(
        (response: any) => {
          this.variableEarningsDetails = response;      
          this.findTotalvarEarn()           
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );

      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetallowanceDeduction(MonthCode,Emp_id,'F','D');
      this.data.subscribe(
        (response: any) => {
          this.fixedDeduction = response;  
          this.findTotalfixDedu()               
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );

      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetallowanceDeduction(MonthCode,Emp_id,'V','D');
      this.data.subscribe(
        (response: any) => {
          this.variableDeductionDetails = response; 
          this.findTotalvarDedu()                
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
    
}

findTotalfixEarn(){
  this.TotalFixedEarnings= 0;
 
  for(var i=0;i<this.fixedEarningDetails.length;i++){
    this.TotalFixedEarnings = this.TotalFixedEarnings+this.fixedEarningDetails[i].AMOUNT;
  }
}

  findTotalvarEarn(){
 this.TotalVaribaleEarnings=0;
  for(var i=0;i<this.variableEarningsDetails.length;i++){
    this.TotalVaribaleEarnings = this.TotalVaribaleEarnings+this.variableEarningsDetails[i].AMOUNT;
  }
  }
  findTotalfixDedu(){
 this.TotalFixedDeduction =0;
  for(var i=0;i<this.fixedDeduction.length;i++){
    this.TotalFixedDeduction = this.TotalFixedDeduction+this.fixedDeduction[i].AMOUNT;
  }
  }

findTotalvarDedu(){
 this.TotalVariableDeduction=0;
  for(var i=0;i<this.variableDeductionDetails.length;i++){
    this.TotalVariableDeduction = this.TotalVariableDeduction+this.variableDeductionDetails[i].AMOUNT;
  }

}

getEmployeeDeatils(MonthCode,Emp_id){
   document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetEmployeeDetailsforPayRollProcesss(Emp_id,MonthCode);
      this.data.subscribe(
        (response: any) => {
          this.employeeDetails = response; 
          this.findTotalvarDedu()                
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );  
}


}
