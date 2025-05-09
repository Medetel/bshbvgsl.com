import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
@Component({
  selector: 'app-master-calendar-form',
  templateUrl: './master-calendar-form.component.html',
  styleUrls: ['./master-calendar-form.component.css']
})
export class MasterCalendarFormComponent implements OnInit {
  title = "Add Master Calendar";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  r: any = {};
  mode: any;
  calendar_id: any;
  MonthList: any
  EndMonthList: any
  FristWeekOfList: any = []
  SecondWeekOfList: any
  ThiredWeekOfList: any
  HalfDayList: any
  fourthWeekOf: any = [];
  maxcal: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.calendar_id = params['calendar_id'];
      this.mode = params['mode'];

      if (this.calendar_id > 0) {
        this.GetCalenderById(this.calendar_id)
      }
    });

    if (this.mode == 'View') {
      this.title = "View Master Calendare ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Master Calendar ";
    }
    else {
      this.getmaxcalendaryear()

      this.c.fin_ind = 'No';
    }
    this.getMonths()
    this.getEndMonths()
    this.getFristweekOf()
  }
  getMonths() {    
    this.data = this.userService.GetMonth();
    this.data.subscribe(
      (response) => {
        this.MonthList = response.StartMonthModel;
        if ((this.mode != 'View') || (this.mode != 'Edit')) {
          this.c.code_value = 2012;
          this.c.code_value1 = 2023;
        }
      })
  }

  getmaxcalendaryear() {
    this.data = this.userService.uspGetMaximumCalendar();
    this.data.subscribe(
      (response) => {
        this.maxcal = response;
        this.c.year = this.maxcal;
      })
  }

  getEndMonths() {    
    this.data = this.userService.GetEndMonth();
    this.data.subscribe(
      (response) => {
        this.EndMonthList = response.EndMonthModel;
      })
  }

  getFristweekOf() {   
    this.data = this.userService.GetFristWeekOff();
    this.data.subscribe(
      (response) => {
        this.FristWeekOfList = response.WeekOfOneModel;


        if ((this.mode != 'View') || (this.mode != 'Edit')) {
          this.c.code_value2 = 'Sunday';
          this.First('Sunday');
          this.c.code_value3 = 'Saturday';
          this.Second('Saturday');
        }
      })
  }



  ngAfterViewInit() {
    var first = "--Select--"
    var year = 2019;
    var till = 3050;
    var options = "";
    for (var y = year; y <= till; y++) {      
      options += "<option>" + y + "</option>";
    }

    document.getElementById("year").innerHTML = "Select" + options;
  }
  SaveCaste(Caste: NgForm) {   
    Caste.value.year = this.maxcal
    if (Caste.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {                        
      this.data = this.userService.PostCalender(Caste.value);
      this.data.subscribe(
        (response) => {
          Caste.reset();
          Caste.resetForm();
          Caste.form.markAsPristine();
          Caste.form.markAsUntouched();
          swal('Success!', 'Calender  Added Successfully .', 'success');
          this.router.navigate(['/home/masters/master-calendar']);
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

  GetCalenderById(calendar_id) {    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCalenderById(calendar_id);
    this.data.subscribe(
      (response: any) => {
        this.c = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  UpdateCasteDetails(Caste: NgForm) {   
    this.data = this.userService.UpdateCalDetails(this.calendar_id, Caste.value);
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Calender details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/masters/master-calendar']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }

      });
  }

  Cancel() {
    this.c.calendar_code = '';
    this.c.year = '';
    this.c.code_value = '';
    this.c.code_value1 = '';
    this.c.code_value2 = '';
    this.c.code_value3 = '';
    this.c.code_value4 = '';
    this.c.code_value5 = '';
    this.c.fin_ind = '';
  }

  Doo(year) {
    this.data = this.userService.UpdateToHoliday(year);
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Calender details updated to Holiday list Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";      
        this.c.AddToholiday = 1;
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
      });
  }

  GetCalendar(year) {
    alert(year)
    this.data = this.userService.GetAllCalendarList();
    this.data.subscribe(
      (response) => {
        var list = response.filter(a => a.year == year)
        if (list.length > 0) {
          swal('Warning!', 'This year already added', 'warning');
          this.c.year = 0;
        }
      })
  }

  First(code) {   
    this.SecondWeekOfList = this.FristWeekOfList.filter(a => a.code_value2 != code)
  }

  Second(code) {
    this.ThiredWeekOfList = this.SecondWeekOfList.filter(a => a.code_value2 != code)
  }

  Third(code) {
    this.fourthWeekOf = this.ThiredWeekOfList.filter(a => a.code_value2 != code)
  }
}
