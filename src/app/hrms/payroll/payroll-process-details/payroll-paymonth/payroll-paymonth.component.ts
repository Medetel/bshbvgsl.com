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
  selector: 'app-payroll-paymonth',
  templateUrl: './payroll-paymonth.component.html',
  styleUrls: ['./payroll-paymonth.component.css']
})
export class PayrollPaymonthComponent implements OnInit {

CalendarList: any = [];
data : any =[];
p: any =[];
otherCalendarList : any =[];
year : any;
workingDays : any;
monthCode : any;
isMonthSelected: boolean = false;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.CalendarLists()
    
  }

CalendarLists(){
    document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetCalendar();
      this.data.subscribe(
        (response: any) => {
          this.CalendarList = response;                 
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
  }

  ChangeOfMonth(Id) {
    if (Id > 0) {
      this.otherCalendarList = this.CalendarList.filter(a => a.Month_id == Id);
      if (this.otherCalendarList.length > 0) {
        this.year = this.otherCalendarList[0].calendar_year;
        this.workingDays = this.otherCalendarList[0].WRK_Days;
        this.monthCode = this.otherCalendarList[0].monthCode;
        this.isMonthSelected = true;  // Set to true when a month is selected
      }
    } else {
      this.isMonthSelected = false;  // Set to false if no valid month is selected
    }
  }
}
