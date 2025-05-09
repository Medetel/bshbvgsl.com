import { Component, OnInit} from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user.model';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ErrorHandler } from '../../shared/ErrorHandler';


@Component({
  selector: 'app-emp-apply-leave',
  templateUrl: './emp-apply-leave.component.html',
  styleUrls: ['./emp-apply-leave.component.css']
})
export class EmpApplyLeaveComponent implements OnInit {
  title="Add Leave Application";
  data : any = {};
  formInvalid : boolean = false;
  c : any = {};
  r: any = {};
  a: any = [];
  l: any = [];
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
  userName: any;
  ItemsPerPage: number = 5;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  pageno: number = 1;
  EmployeeLeaveDetails: any = [];
  totalItems: number;
  leaveDetailsDisabled: boolean = true;
  isSearch: boolean;
  constructor(private datePipe: DatePipe,private userService:UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe) {
   
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.GetByIdEmployeeAddress(this.userName);
    if(this.mode=='view')
    {
        this.title = "View Leave Application ";
    }
    else if(this.mode=='edit')
    {
      this.title = "Edit Leave Application ";
    }
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


  GetEmployeeLeaveDetails(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeLeaveAppDetails(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeLeaveDetails = response.EmployeeLeaveApllicationModels;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;

        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  GetByIdEmployeeAddress(userName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeAddressDetailsLeave(userName);
    this.data.subscribe(
      (response: any) => {
        this.l = response;
        console.log(' a data :' + JSON.stringify(this.a));
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
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


  SaveEmplDetails(LeaveDetails: NgForm) {
   
    if (this.mode != 'edit') {
      if (LeaveDetails.value.LEAVE_TOTAL_DAYS < 1) {
        swal('Warning!', 'No of leaves is mandatory', 'warning');
        return;
      }
      if (LeaveDetails.invalid) {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
      else {
        LeaveDetails.value.EMP_ID = this.l.EMP_EMPLOYEE_ID;
        LeaveDetails.value.LEAVE_TOTAL_DAYS = this.calculateDateDifference(LeaveDetails.value.LEAVE_START_DATE, LeaveDetails.value.LEAVE_END_DATE);
        this.data = this.userService.PostEmpLeaveAppdetails_self(LeaveDetails.value);
        this.data.subscribe(
          (response) => {
            LeaveDetails.reset();
            LeaveDetails.resetForm();
            LeaveDetails.form.markAsPristine();
            LeaveDetails.form.markAsUntouched();
            swal('Success!', 'Employee Leave application details Added Successfully .', 'success');
            // this.router.navigate(['/home/emp-apply-leave']);
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

    else {
      this.data = this.userService.PutEmpLeaveAppdetails(LeaveDetails.value, this.LeaveId);
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
  ChangeOfLeave(EmpId, leaveType) {
    this.data = this.userService.getLeaveBalance_self(EmpId, leaveType);
    this.data.subscribe(
      (response) => {
        this.LeaveBal = response;
        this.LeaveBal = this.LeaveBal;
        //this.DateDifference = this.DateDifference +1;
      })
  }

  toggleLeaveDetails() {
    this.leaveDetailsDisabled = !this.leaveDetailsDisabled;
  }

  toggleLeaveGridDetails() {
    this.leaveDetailsDisabled = !this.leaveDetailsDisabled;
  }
}

