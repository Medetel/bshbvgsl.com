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
  selector: 'app-payroll-finalize-payroll',
  templateUrl: './payroll-finalize-payroll.component.html',
  styleUrls: ['./payroll-finalize-payroll.component.css']
})
export class PayrollFinalizePayrollComponent implements OnInit {

monthcode : any;
AtteLeaveList : any =[];
data : any =[];
month : any;
disablebutton : boolean = false;
send_date: string;
myDate = new Date();
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  private datepipe: DatePipe) {

  }

   ngOnInit() {
    this.route.params.subscribe(params => {      
      this.monthcode = params['monthcode']       
  }); 
  const ProcessedToFinalize = localStorage.getItem('ProcessedToFinalize_' + this.monthcode);
  if (ProcessedToFinalize) {
    this.disablebutton = true;
  }
  this.GetAttendanceandLeavesList()
  this.send_date = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
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

ProcessPayroll(){
document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PayrollProcessDataFinalized(this.monthcode);
      this.data.subscribe(
        (response: any) => {           
          this.disablebutton = true;   
          localStorage.setItem('ProcessedToFinalize_' + this.monthcode, 'true');  
           swal('Success!', 'Payroll finalized for the month of ' + this.month, 'success');      
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
}

}