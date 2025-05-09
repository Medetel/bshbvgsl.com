import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../../shared/ErrorHandler';
import { UserService } from '../../../../../shared/user.service';

@Component({
  selector: 'app-emp-basic-details-form',
  templateUrl: './emp-basic-details-form.component.html',
  styleUrls: ['./emp-basic-details-form.component.css']
})
export class EmpBasicDetailsFormComponent implements OnInit {

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
employeeDetails : any=[];
GrossSalary : number =0;
NetSalary : number =0;
EmpDetails : any =[]

constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.Emp_id = params['empId'];     
      }           
    );

    this.getAllDetails(this.Emp_id)
  }



getAllDetails(Emp_id){
this.fixedEarningDetails =[];
this.variableEarningsDetails =[];
this.fixedDeduction =[];
this.variableDeductionDetails =[];
this.TotalFixedEarnings  = 0;
this.TotalVaribaleEarnings  = 0;
this.TotalFixedDeduction = 0
this.TotalVariableDeduction  =0;
this.employeeDetails=[];



this.data = this.userService.GetEmployeeDetailsbyId(Emp_id);
    this.data.subscribe(
      (response: any) => {
        this.EmpDetails = response;        
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });


 document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.hrmsPayrollInfoForEachEmployee(Emp_id,'F','E');
      this.data.subscribe(
        (response: any) => {
          this.fixedEarningDetails = response;          
          this.findTotalfixEarn()  
          this.getGrossNet()           
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );

    document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.hrmsPayrollInfoForEachEmployee(Emp_id,'V','E');
      this.data.subscribe(
        (response: any) => {
          this.variableEarningsDetails = response;      
          this.findTotalvarEarn()  
            this.getGrossNet()             
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );

      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.hrmsPayrollInfoForEachEmployee(Emp_id,'F','D');
      this.data.subscribe(
        (response: any) => {
          this.fixedDeduction = response;  
          this.findTotalfixDedu()   
            this.getGrossNet()                
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );

      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.hrmsPayrollInfoForEachEmployee(Emp_id,'V','D');
      this.data.subscribe(
        (response: any) => {
          this.variableDeductionDetails = response; 
          this.findTotalvarDedu()  
            this.getGrossNet()                  
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

getGrossNet(){
   this.GrossSalary = this.TotalVaribaleEarnings + this.TotalFixedEarnings;
  this.NetSalary = this.GrossSalary-this.TotalFixedDeduction-this.TotalVariableDeduction
}

// getEmployeeDeatils(Emp_id){
//    document.getElementById('loader-spinner').style.display = "block";
//       this.data = this.userService.GetEmployeeDetailsforPayRollProcesss(Emp_id,MonthCode);
//       this.data.subscribe(
//         (response: any) => {
//           this.employeeDetails = response; 
//           this.findTotalvarDedu()                
//           document.getElementById('loader-spinner').style.display = "none";
//         },
//         (error) => {
//           document.getElementById('loader-spinner').style.display = "none";
//         }
//       );  
// }

}
