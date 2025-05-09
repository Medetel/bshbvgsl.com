import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-monthly-leave-atten-grid',
  templateUrl: './monthly-leave-atten-grid.component.html',
  styleUrls: ['./monthly-leave-atten-grid.component.css']
})
export class MonthlyLeaveAttenGridComponent implements OnInit {

  title = "Monthly Leave & Attendance Process";
  data: any = [];
  DistrictsList: any = [];
  a: any = [];
  YearList: any = [];
  EndMonthList: any = [];
  Divisionid: number;
  AttndMonth: number;
  year: number
  CalendaryearmonthList: any = [];
  yearMonth: any;
  monthlytimerollDetails: any = [];
  status: string = '';
  itemsPerPage: any;
  itemsPerPageChanged: any;
  mode: any;
  totalItems:any;
  pageChanged:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })


    this.data = this.userService.GetYear();
    this.data.subscribe(
      (response) => {
        this.YearList = response.CalendarYearModel;

      })

    this.data = this.userService.GetEndMonth();
    this.data.subscribe(
      (response) => {
        this.EndMonthList = response.EndMonthModel;
      })


    this.data = this.userService.GetMonthlyCalendarList();
    this.data.subscribe(
      (response) => {
        this.CalendaryearmonthList = response;
      })


    this.data = this.userService.GetAllMonthlyTimerollHDR();
    this.data.subscribe(
      (response) => {
        this.monthlytimerollDetails = response;
      })



  }

  ChangeOfDivision(divisionId) {   
    this.Divisionid = divisionId
  }
  onSearch(searchForm, itemsPerPage, id) {

  }
  // ChangeOfCalendar(year){ 
  //   this.year = year
  // }

  // ChangeOfmonth(month){ 
  //   this.AttndMonth = month
  // }

  handleChange() {

    //   document.getElementById('loader-spinner').style.display = "block";
    //   this.data = this.userService.AddMonthlyTimeRoll(this.Divisionid, this.AttndMonth,this.year);
    //   this.data.subscribe(
    //     (response) => {
    //     //this.detailsEmployee = response;
    //     swal('Success!', 'Processed.', 'success');
    //     document.getElementById('loader-spinner').style.display = "none";
    //   },
    //   (error) => {
    //     document.getElementById('loader-spinner').style.display = "none";
    //   }
    // );

    //Check for the repeatation check

    var list = this.monthlytimerollDetails.filter(a => a.MONTH_Year_code == this.yearMonth && a.DIV_CODE == this.Divisionid)
    if (list.length > 0) {
      // swal('Warning!', 'wrong.', 'warning');
      this.status = 'Processed';
      swal('Warning!', 'Timeroll generation is done for this division and year month.', 'warning');
      return;
    }

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.InsertMonthly_Timeroll_HDR(this.Divisionid, this.yearMonth);
    this.data.subscribe(
      (response) => {
        if (response > 1) {
          this.data = this.userService.AddMonthlyTimeRoll(this.Divisionid, this.AttndMonth, this.year, response);
          this.data.subscribe(
            (response) => {
              //this.detailsEmployee = response;
              swal('Success!', 'Processed.', 'success');
              document.getElementById('loader-spinner').style.display = "none";
            },
            (error) => {
              document.getElementById('loader-spinner').style.display = "none";
            }
          );
        }
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );



  }


  //divide month and year both
  ChangeOfmonthyear(Monyear) {
    //alert(Monyear.substring(0,2))
    //alert(Monyear.substring(2,6))
    this.yearMonth = Monyear;
    this.year = Monyear.substring(2, 6);
    this.AttndMonth = Monyear.substring(0, 2)
  }
}
