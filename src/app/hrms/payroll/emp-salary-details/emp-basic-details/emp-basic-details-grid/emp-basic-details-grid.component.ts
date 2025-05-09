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
  selector: 'app-emp-basic-details-grid',
  templateUrl: './emp-basic-details-grid.component.html',
  styleUrls: ['./emp-basic-details-grid.component.css']
})
export class EmpBasicDetailsGridComponent implements OnInit {
  data: any={};
  a: any = [];  
  Emplist: any=[];
  EmpDetails: any=[];
  disable : boolean = false;
  EmpId : number;
  Emp_id : number;
  mode: any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) { }

  ngOnInit() {
      this.GetAllEmployeeData()
    this.route.params.subscribe(params => {
      this.Emp_id = params['id'];          
      }           
    );
  
  }


  GetAllEmployeeData() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeesofPay_emp();
    this.data.subscribe(
      (response: any) => {
        this.Emplist = response;  
        if(this.Emp_id>0) {
          this.a.EmpID = this.Emp_id
        this.ChangeEmp(this.Emp_id)
      }      
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  ChangeEmp(EmpId){    
    var list = this.Emplist.filter(a=>a.EMP_EMPLOYEE_ID == EmpId)   
   if(list[0].ADcode == 1)
    this.disable = true;
    else
    this.disable = false;
   this.EmpId = EmpId;
    debugger;
    var list = this.Emplist.filter(a => a.EMP_EMPLOYEE_ID==EmpId)
    localStorage.setItem('EmpCode',list[0].EMP_EMPLOYEE_CODE)    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeDetailsbyId(EmpId);
    this.data.subscribe(
      (response: any) => {
        this.EmpDetails = response;           
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
 

  DisableData(){
    //DisableAllowanceDeductionforAnEmployee
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.DisableAllowanceDeductionforAnEmployee(this.EmpId);
    this.data.subscribe(
      (response: any) => {
        this.EmpDetails = response;
        this.GetAllEmployeeData()        
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
 
}
