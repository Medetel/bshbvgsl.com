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
  selector: 'app-payroll-attendace-leave',
  templateUrl: './payroll-attendace-leave.component.html',
  styleUrls: ['./payroll-attendace-leave.component.css']
})
export class PayrollAttendaceLeaveComponent implements OnInit {

monthcode : any;
AtteLeaveList : any =[];
data : any =[];
month : any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {      
      this.monthcode = params['monthcode']    
  });
  this.GetAttendanceandLeavesList();
  
  }

  GetAttendanceandLeavesList(){
    document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAttendanceandLeaves(this.monthcode);
      this.data.subscribe(
        (response: any) => {
          this.AtteLeaveList = response;
          this.month =    this.AtteLeaveList[0].months              
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
  }

}
