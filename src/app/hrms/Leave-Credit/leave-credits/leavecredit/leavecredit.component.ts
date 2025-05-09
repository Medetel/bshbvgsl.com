import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-leavecredit',
  templateUrl: './leavecredit.component.html',
  styleUrls: ['./leavecredit.component.css']
})
export class LeavecreditComponent implements OnInit {
  data: any = {};
  DistrictsList: any = [];
  detailsEmployee: any = [];
  a: any = {};
  AllEmployeeList: any = [];
  leavetypelist: any = [];
  emplId: number = 0;

  FormList: any = [];
  LeavecreditId :number ;
  getbyIdlist : any =[];
  mode: any;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.LeavecreditId = params['Id'];
      if(this.LeavecreditId>0)
      this.GetbyId(this.LeavecreditId)
      this.mode = params['mode'];
      // this.empId = params['empId'];
      // this.GetByIdBankDetails(this.BankId);
      // if (this.mode == 'view') {
      //   this.hide = true;
      // }
    });

    this.getDefaultData()
  }
  getDefaultData() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

    this.data = this.userService.GetLeaveTypes();
    this.data.subscribe(
      (response: any) => {
        this.leavetypelist = response;
      })

    this.a.EMP_DIVISION_ID = +localStorage.getItem('divisonId');
    this.ChangeOfDivision(this.a.EMP_DIVISION_ID)
  }

  ChangeOfEmployee(EmployeeId) {
    this.emplId = EmployeeId;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeIds(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.detailsEmployee = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  ChangeOfDivision(DivisionId) {
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }

  Add(a) {
    if( (a.leaveType == null || a.leaveType == undefined)){
      swal('Error!', 'leaveType is required.', 'error');   
      return;
    }

    if((a.leavecredit == null || a.leavecredit == undefined) ){
       swal('Error!', 'Leavecredit is required.', 'error');   
      return;
    }

    let temp = {
      EMP_EMPLOYEE_CODE: this.detailsEmployee.EMP_EMPLOYEE_CODE,
      EmpName: this.detailsEmployee.EmpName,
      leaveType: a.leaveType,
      Leave_Credi: a.leavecredit,
      EMP_ID: this.emplId,
      leaveName: this.getleaveType(a.leaveType)
    }
    this.FormList.push(temp);

    this.a = {}
  }

  getleaveType(leaveType) {
    var list = this.leavetypelist.filter(a => a.Leave_id == leaveType)
    return list[0].Leave_name
  }


  //revert back for balance calculation

  // Save() {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.updateLeaveCredit(this.FormList);
  //   this.data.subscribe(
  //     (response: any) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //       swal('Success!', 'Leaves credited successfully.', 'success');        
  //       this.router.navigate(['/home/leavecredit'])
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }
  

  Save() {  
    if(this.FormList.length<=0){
       swal('Error!', 'Add Leave credit then Add.', 'error');   
      return;
    }

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.CreateLeavecredit(this.FormList,'S');
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        swal('Success!', 'Leaves credited successfully.', 'success');        
        this.router.navigate(['/home/leavecredit'])
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  cancel() {
    this.router.navigate(['/home/leavecredit'])
  }


  GetbyId(Id) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getleavecreditsingleDetailsbyId(Id);
    this.data.subscribe(
      (response: any) => {        
        this.getbyIdlist = response;
        this.ChangeOfEmployee(this.getbyIdlist[0].EMP_ID);
        for(var i= 0 ; i<this.getbyIdlist.length; i++){

          let temp = {
            EMP_EMPLOYEE_CODE: this.getbyIdlist[i].EMP_EMPLOYEE_CODE,
            EmpName: this.getbyIdlist[i].EMP_FIRST_NAME,      
            Leave_Credi: this.getbyIdlist[i].Leave_Credi,
            EMP_ID: this.emplId,
            leaveName: this.getbyIdlist[i].leave_name
          }
          this.FormList.push(temp);
        }
        document.getElementById('loader-spinner').style.display = "none";       
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }



}
