import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-attendance-form',
  templateUrl: './daily-attendance-form.component.html',
  styleUrls: ['./daily-attendance-form.component.css']
})
export class DailyAttendanceFormComponent implements OnInit {
  data: any=[];
  DistrictsList: any=[];
  p: any =[];
  AllEmployeeList: any =[];
  EmployeeName : string;
  myDate = new Date();
  DateValues : string;
  timevalue : string;
  intimevalue : string;
  userName : string ;
  formInvalid: boolean;
  Attendance : any =[];
  EmPId : number 
  EntryNo : number 
  mode: string;
  hide: boolean;
  send_date=new Date();
  employeeSpeedSearchlist : any =[]

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe) {     
      
    }

  ngOnInit() {
    
    this.getDegaultData()

    this.route.params.subscribe(params => {
      this.EntryNo = params['id'];
      this.mode = params['mode'];
     
      this.GetbyIdAttendanceIn(this.EntryNo);
      if (this.mode == 'view') {
        this.hide = true;
      }
    });

    //localStorage.getItem('divisonId')
    this.p.DIVISION_CODE = +localStorage.getItem('divisonId');
    this.ChangeOfDivision(this.p.DIVISION_CODE);
  }

  getDegaultData() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })   
      
      
  }

  mydata(EmpCode){ 
    debugger;      
       for(let i= 0; i<this.AllEmployeeList.length ; i++){
      if (this.AllEmployeeList[i].EMP_EMPLOYEE_CODE == EmpCode) {     
       this.p.EmpCode = EmpCode;
        this.EmployeeName = this.AllEmployeeList[i].EMP_FIRST_NAME;
        this.EmPId = this.AllEmployeeList[i].EMP_EMPLOYEE_ID
        this.DateValues = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
        this.timevalue = this.datepipe.transform(this.myDate, 'h:mm a');
        localStorage.getItem('userName');
        this.userName =  localStorage.getItem('userName');
        this.employeeSpeedSearchlist =[];
      }
    }  

    
  }

  ChangeOfDivision(DivisionId){    
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;        
         
      })
  }

  SaveEmplAttendance(Details:NgForm){      
    Details.value.EMP_ID = this.EmPId ;     
      this.data = this.userService.InsertAttendanceIn(Details.value);
      this.data.subscribe(
        (response) => {         
          if(response == 1)       
          {
            swal('Success!', 'Attendance Added Successfully .', 'success');          
            this.p.EmpCode ='';
            this.EmployeeName ='';
            this.DateValues ='';
            this.timevalue ='';
            this.userName=''; 
          }
          else if(response == 2){
            swal('Warning!', 'Leave has been sanctioned for this date', 'warning'); 
          }
          else{
            swal('Warning!', 'Attendance Added already for this employee .', 'warning');   
          }                   
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

    GetbyIdAttendanceIn(EntryNo) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllAttendaceById(EntryNo);
      this.data.subscribe(
        (response: any) => {
          this.p = response;       
          this.DateValues = this.datepipe.transform(this.p.ATTN_DATE, 'yyyy-MM-dd'); 
          this.timevalue = this.datepipe.transform(this.p.TIME_IN, 'h:mm a');
          this.userName = this.p.UserName;
          this.EmployeeName =  this.p.EMP_FIRST_NAME;
         
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
  
  //searching employee list value list
    GetEmployeeCode(EmpCode,divisionId){     
      this.data = this.userService.GetAllEmployeesSpeedSearch(EmpCode,divisionId);
      this.data.subscribe(
        (response: any) => {
          this.employeeSpeedSearchlist = response;             
        })
    }
  

}
