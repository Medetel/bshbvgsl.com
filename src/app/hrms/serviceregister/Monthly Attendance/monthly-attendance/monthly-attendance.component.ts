import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-monthly-attendance',
  templateUrl: './monthly-attendance.component.html',
  styleUrls: ['./monthly-attendance.component.css']
})
export class MonthlyAttendanceComponent implements OnInit {
  data: any = [];
  b: any = [];
  DistrictsList: any = [];
  CalendaryearmonthList: any = [];
  DesignationList: any = [];
  DivisionId: any;
  TimeRollDetails: any;
  days : number = 31;
  AttndMonth: any;
  yearMonth: any;
  desg_Id: any;
  year: any;
  MA_ID: number; 
  hide : boolean = false;
  mode: any;
  title: string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.MA_ID = params['Id']; 
      this.mode = params['mode']; 
      if(this.MA_ID >0){
        this.viewMonthly(this.MA_ID)
      }    
    });
    if(this.mode == 'view'){
      this.hide = true; 
      }
     
      if(this.mode=='view'){
      this.title = "View Time Roll Generation";
      }
     this.getDistrictData();

this.getmonthyear();
this.getdesignation();

  }
  getDistrictData() {
    debugger
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })
    }
    getmonthyear(){
      this.data = this.userService.GetMonthlyCalendarList();
      this.data.subscribe(
        (response) => {
          this.CalendaryearmonthList = response;
        })
    }

getdesignation(){
  this.data = this.userService.GetAllDesignation();
  this.data.subscribe(
    (response: any) => {
      this.DesignationList = response;
    })
}

Changeofdesignation(DI_Id,desg_Id){
  debugger;
  this.DivisionId = DI_Id;
  this.desg_Id = desg_Id;
  // this.desg_Id = desg_Id;
  this.data = this.userService.getEmaployeeDetailsTR(DI_Id,desg_Id);    
      this.data.subscribe(
      (response) => {
        this.TimeRollDetails = response.Result;        
        this.GenerateTimeRoll();
      })  
}
 GenerateTimeRoll(){
  debugger;
  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GenerateTime(this.year,this.AttndMonth,this.yearMonth,this.DivisionId,this.desg_Id);
  this.data.subscribe(
    (response: any) => {

      console.log('response');
      console.log(response);

      this.TimeRollDetails = response;
      document.getElementById('loader-spinner').style.display = "none";
      //this.c.code_value1 = response[0].yearmonth;
      //this.c.EMP_DIVISION_ID = response[0].DIVISION_ID;
      //this.DivisionId = response[0].DIVISION_ID;
      //this.ChangeOfmonthyear(response[0].yearmonth);
     if(((this.days != 28) && (this.days != 29)&& (this.days != 30) && (this.days != 31)) == true)
      {
        for(var i=0;i<=this.TimeRollDetails.length;i++){
          this.TimeRollDetails[i].DAY_28 = '';
          this.TimeRollDetails[i].DAY_29 ='';
          this.TimeRollDetails[i].DAY_30 ='';
           this.TimeRollDetails[i].DAY_31 ='';
        }
      }

      if(((this.days != 29)&& (this.days != 30) && (this.days != 31)) == true)
      {
        for(var i=0;i<=this.TimeRollDetails.length;i++){
         this.TimeRollDetails[i].DAY_29 ='';
          this.TimeRollDetails[i].DAY_30 ='';
           this.TimeRollDetails[i].DAY_31 ='';
        }
      }

      if(((this.days != 30) && (this.days != 31)) == true)
      {
        for(var i=0;i<=this.TimeRollDetails.length;i++){
          this.TimeRollDetails[i].DAY_30 ='';
           this.TimeRollDetails[i].DAY_31 ='';
        }
      }

      if(((this.days != 31)) == true)
      {
        for(var i=0;i<=this.TimeRollDetails.length;i++){
          this.TimeRollDetails[i].DAY_31 = ''
        }
      }
    
      console.log('response');
      console.log(response);
      
    },
    (error) => {
      document.getElementById('loader-spinner').style.display = "none";
    }
  );
}

ChangeOfmonthyear(Monyear) {    
  this.yearMonth = Monyear;
  this.year = Monyear.substring(2, 6);
  this.AttndMonth = Monyear.substring(0, 2)
  this.calculateNoofdays(this.year, this.AttndMonth);
 
}
calculateNoofdays(year,month){
  this.days= +(new Date(year, month, 0).getDate())    
}

AddTimeroll(TimeRollDetails){
 document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.Addmpnthlyattendence(TimeRollDetails,this.year,this.AttndMonth,this.yearMonth,this.DivisionId);
    this.data.subscribe(
      (response: any) => {      
        swal('Success!', 'Monthly Attendence generated successfully.', 'success');
        this.router.navigate(['/home/monthlyattendance']);       
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
    }     

    viewMonthly(MA_ID){
      debugger;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getmonthlyListbyId(MA_ID);
      this.data.subscribe(
        (response: any) => {
  
          console.log('response');
          console.log(response);
          this.TimeRollDetails = response;
          this.b.code_value1 = response[0].yearmonth;
          // this.c.EMP_DIVISION_ID = response[0].DIVISION_ID;
          this.b.desg_id = response[0].EMP_DESIGNATION_ID;
          this.b.EMP_DIVISION_ID = response[0].DIVISION_ID;
          this.ChangeOfmonthyear(response[0].yearmonth);
        
          
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
    }

    resetForm() {
      // Clear the c object that holds the applicant data
      this.b = {
        EMP_DIVISION_ID: '',
        code_value1: '',
        desg_id: '',
        
      };
      this.TimeRollDetails = [];
    }
}
