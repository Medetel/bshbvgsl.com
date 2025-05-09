import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../shared/user.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import {UserService} from '../../../../shared/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {
  title="Add Leave Application";
  data : any = {};
  formInvalid : boolean = false;
  c : any = {};
  r: any ={};
  rev:any={};
  mode: any;
  DI_Id: number;
  LeaveId: any;
  // caste_code:any;
  religionList : any 
  CasteCategoryList:any
  EmployeeList:any
  EmployeeDetailsList: any ={};
  LeaveList:any;
  detailsEmployee: any =[];
  leavetypelist: any=[];
  myDate = new Date();
  fromDate : any;
  toDate : any;
  DateDifference : number ;
  gobackAuth : boolean = false;
  gotoAuth : number =0;
  LeaveBal : number =0;
  hide: any;

  constructor(private userService:UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe)     
  {  
  }

  ngOnInit() 
  {
    this.route.params.subscribe(params => {      
      this.LeaveId = params['id'];  
      this.mode  =   params['mode'];   

      if(this.mode == 'auth'){
        this.mode ='view';
        this.gobackAuth = true;
      }
        
        if(this.LeaveId > 0){         
           this.GetLeaveAppById(this.LeaveId)
        }    
    });
    if(this.mode=='view')
    {
        this.title = "View Leave Application ";
    }
    else if(this.mode=='edit')
    {
      this.title = "Edit Leave Application ";
    }
    this.getDistrict()
    this.GetCasteCategory();
    
    this.data = this.userService.GetLeaveTypes();
      this.data.subscribe(
        (response: any) => {
          this.leavetypelist = response;          
        })

        if(+localStorage.getItem('gotoAuth')==1){
          this.gobackAuth = true;
          localStorage.removeItem('gotoAuth')
        }   
        
      //Making division selected default based on login userId
      this.c.DI_Id = +localStorage.getItem('divisonId');
      this.loadgroup1(this.c.DI_Id);

  }
  getDistrict()
  {
    debugger;
    this.data = this.userService.GetDristic();    
            this.data.subscribe(
            (response) => {
              this.religionList = response.DivisionModel;             
            })
      }
    
  GetCasteCategory()
  {
    debugger;
    this.data = this.userService.GetCategory();    
            this.data.subscribe(
            (response) => {
              this.CasteCategoryList = response.Caste_Category;                 
            })
      }

      loadgroup1(DI_Id:any)
      {
        debugger;
        this.data = this.userService.getEmaployeeDetails(DI_Id);    
        this.data.subscribe(
        (response) => {
          this.EmployeeList = response.Result; 
        
        })
      }


      GetAllDetails(DI_Id)
      {
        debugger;
        this.data = this.userService.getEmaployeeDeT(DI_Id);    
        this.data.subscribe(
        (response) => {
          this.EmployeeDetailsList = response;          
          for (var i = 0; i < this.EmployeeDetailsList.length; i++) {
            this.c.DEPARTMENT_NAME=this.EmployeeDetailsList[i].DEPARTMENT_NAME;
            alert(this.c.DEPARTMENT_NAME)
            var EMP_CATEGORY =this.EmployeeDetailsList[i].EMP_CATEGORY;
            var EMP_TYPE =this.EmployeeDetailsList[i].EMP_TYPE;
            var EMP_FIRST_NAME =this.EmployeeDetailsList[i].EMP_FIRST_NAME;
            var DESG_NAME =this.EmployeeDetailsList[i].DESG_NAME;
            var EMP_GROUP =this.EmployeeDetailsList[i].EMP_GROUP;
              
           }
        })
      }
      ChangeOfEmployee(EmployeeId) {           
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

  mydate(Date, toDate) {
    this.fromDate = Date;
    this.toDate = toDate;
    this.data = this.userService.getDayDiffrence(this.fromDate, this.toDate);
    this.data.subscribe(
      (response) => {
        this.DateDifference = response;
        this.DateDifference = this.DateDifference + 1;
      })


  }


      Cancel(){   
        this.router.navigate(['/home/leaveapp/leave-application']);
      }

      SaveEmplDetails(LeaveDetails: NgForm){
        LeaveDetails.value.LEAVE_TOTAL_DAYS =this.DateDifference;      
        
        // if(LeaveDetails.value.LEAVE_START_DATE > LeaveDetails.value.LEAVE_END_DATE){
        //   swal('Warning!', 'From date should be less than To Date.', 'warning');
        //   return;
        // }
        
        if(this.mode!='edit')
        {          
          if(LeaveDetails.value.LEAVE_TOTAL_DAYS <1){
            swal('Warning!', 'No of leaves is mandatory', 'warning');
            return;
          }
          if (LeaveDetails.invalid) {
            this.formInvalid = true;
            swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
            return;
          }    
          else {    
            this.data = this.userService.PostEmpLeaveAppdetails(LeaveDetails.value);
            this.data.subscribe(
              (response) => {
                LeaveDetails.reset();
                LeaveDetails.resetForm();
                LeaveDetails.form.markAsPristine();
                LeaveDetails.form.markAsUntouched();
                swal('Success!', 'Employee Leave application setails Added Successfully .', 'success');
                this.router.navigate(['/home/leaveapp/leave-application']);
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

        else{
          this.data = this.userService.PutEmpLeaveAppdetails(LeaveDetails.value,this.LeaveId);
            this.data.subscribe(
              (response) => {
                LeaveDetails.reset();
                LeaveDetails.resetForm();
                LeaveDetails.form.markAsPristine();
                LeaveDetails.form.markAsUntouched();
                swal('Success!', 'Employee Leave application details Updated Successfully .', 'success');
                this.router.navigate(['/home/leaveapp/leave-application']);
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

      GetLeaveAppById(leaveId){
        document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.GetLeaveAppById(leaveId);
        this.data.subscribe(
        (response: any) => {
          this.c = response;  
          // this.ChangeOfLeave(this.c.EMP_ID,this.c.LEAVE_TYPE)
     
          if (this.c.LEAVE_START_DATE != null)
          this.c.LEAVE_START_DATE = ((this.c.LEAVE_START_DATE).split('T'))[0];
          if (this.c.LEAVE_END_DATE != null)
          this.c.LEAVE_END_DATE = ((this.c.LEAVE_END_DATE).split('T'))[0];
          this.DateDifference = this.c.LEAVE_TOTAL_DAYS;
          this.ChangeOfEmployee(this.c.EMP_ID)         
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
      }


  ChangeOfLeave(EmpId,leaveType){        
        this.data = this.userService.getLeaveBalance(EmpId,leaveType);    
        this.data.subscribe(
        (response) => {         
         this.LeaveBal = response;
         this.LeaveBal =this.LeaveBal;
         //this.DateDifference = this.DateDifference +1;
        })
      }
  calculateDateDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const diffTime = Math.abs(end.getTime() - start.getTime());

    // Calculate the difference in days
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // If start and end dates are the same, return 1 day
    if (start.toDateString() === end.toDateString()) {
      return 1;
    }

    return diffDays;
  }
      
    }
