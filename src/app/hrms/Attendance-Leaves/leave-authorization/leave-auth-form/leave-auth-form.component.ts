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
  selector: 'app-leave-auth-form',
  templateUrl: './leave-auth-form.component.html',
  styleUrls: ['./leave-auth-form.component.css']
})
export class LeaveAuthFormComponent implements OnInit {
  LeaveAppId: any;
  mode: any;
  data: any =[];
  c: any =[];
  DateDifference: number;
  detailsEmployee: any =[];
  a :any =[]
  state : any 
  myDate = new Date();
  CancelledDate: string;
  CancelledBy: string;

  AuthDate: string;
  AuthdBy: string;

  constructor(private userService:UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe) 
  { }

  ngOnInit() 
  {
    this.route.params.subscribe(params => {      
      this.LeaveAppId = params['id'];  
      this.mode  =   params['mode'];   
        
        if(this.LeaveAppId > 0){         
           this.GetLeaveAppById(this.LeaveAppId);
        } 
  })
}


GetLeaveAppById(leaveId){
  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetLeaveAppById(leaveId);
  this.data.subscribe(
  (response: any) => {
    this.c = response;  

    if (this.c.LEAVE_START_DATE != null)
    this.c.LEAVE_START_DATE = ((this.c.LEAVE_START_DATE).split('T'))[0];
    if (this.c.LEAVE_END_DATE != null)
    this.c.LEAVE_END_DATE = ((this.c.LEAVE_END_DATE).split('T'))[0];
    this.DateDifference = this.c.LEAVE_TOTAL_DAYS;
    this.ChangeOfEmployee(this.c.EMP_ID)  
    //this.GetLeaveAppById(this.LeaveAppId)       
    document.getElementById('loader-spinner').style.display = "none";
  }, (error) => {
    document.getElementById('loader-spinner').style.display = "none";
  });
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

handleChange1(){
  debugger;
  this.state = 1; 
  this.CancelledDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');  
  localStorage.getItem('userName');
  this.CancelledBy =  localStorage.getItem('userName');
  this.AuthDate ='';
  this.AuthdBy ='';
}

handleChange2(){
  debugger;
  this.state = 2;  
  this.CancelledDate ='';
  this.CancelledBy ='';
  this.AuthDate  = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');  
  localStorage.getItem('userName');
  this.AuthdBy =  localStorage.getItem('userName');
  
}

save(Remarks){ 
  this.data = this.userService.UpdateAutherization(this.LeaveAppId,Remarks,this.state);
  this.data.subscribe(
    (response: any) => {
      swal('Success!', 'Autherization is done', 'success');
      this.router.navigate(['/home/leaveapp/leave-authorization']);
      document.getElementById('loader-spinner').style.display = "none";
    },
    (error) => {
      document.getElementById('loader-spinner').style.display = "none";
    }
  );
}

}

