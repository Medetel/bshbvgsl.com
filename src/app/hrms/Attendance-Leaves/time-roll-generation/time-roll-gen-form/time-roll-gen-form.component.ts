import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../shared/user.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-time-roll-gen-form',
  templateUrl: './time-roll-gen-form.component.html',
  styleUrls: ['./time-roll-gen-form.component.css']
})
export class TimeRollGenFormComponent implements OnInit {

  data: any = {};
  formInvalid: boolean = false;
  c: any = {
    desg_Id: undefined
  };
  r: any = {};
  mode: any;
  hld_id: any;
  YearList: any
  TempTableList = [];
  Temp1: any = {};
  MonthList: any = [];
  DistrictsList: any = [];
  TimeRollDetails: any = [];
  CalendaryearmonthList: any = [];
  yearMonth: any;
  year: any;
  AttndMonth: any;
  timerolldetails : any =[];
  days : number = 31;
  DivisionId : number;
  TimeRollId: number; 
  hide : boolean = false;
  title = "Add Time Roll Generation";
  DesignationList: any = [];
  desg_Id: any;
  

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }
  Cancel(){   
    this.router.navigate(['/home/leaveapp/time-roll-gen']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.TimeRollId = params['Id']; 
      this.mode = params['mode']; 
      if(this.TimeRollId >0){
        this.viewTimeRoll(this.TimeRollId)
      }    
    });
    if(this.mode == 'view'){
      this.hide = true; 
      }
     
      if(this.mode=='view'){
      this.title = "View Time Roll Generation";
      }
      else if(this.mode=='edit'){
      this.title = "Edit Time Roll Generation";
      }
    this.getYear()    

    this.calculateNoofdays(2020, 1);
    
    this.data = this.userService.GetAllDesignation();
    this.data.subscribe(
      (response: any) => {
        this.DesignationList = response;
      })

  }

  calculateNoofdays(year,month){
    this.days= +(new Date(year, month, 0).getDate())    
  }


  getYear() {
    debugger;
    this.data = this.userService.GetYear();
    this.data.subscribe(
      (response) => {
        this.YearList = response.CalendarYearModel;
      })

    this.data = this.userService.GetMonth();
    this.data.subscribe(
      (response) => {
        this.MonthList = response.StartMonthModel;
      })

    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

    this.data = this.userService.GetMonthlyCalendarList();
    this.data.subscribe(
      (response) => {
        this.CalendaryearmonthList = response;
      })

    this.data = this.userService.uspgettimerolllistFortherepeatationcheck();
    this.data.subscribe(
      (response) => {
        this.timerolldetails = response;
      })
  }

  //Automatic

  
  // GenTimRoll(EMP_DIVISION_ID) {
    
  //   var list = this.timerolldetails.filter(a=>a.year_month == this.yearMonth)
  //     if(list.length > 0) {
  //       swal('Warning!', 'Timeroll generation is done for this division and year month.', 'warning');      
  //     return;
  //   }

  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetYimeRolList(this.year, this.AttndMonth, EMP_DIVISION_ID, this.yearMonth);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.TimeRollDetails = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     },
  //     (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }
  //   );
  // }


  ChangeOfmonthyear(Monyear) {    
    this.yearMonth = Monyear;
    this.year = Monyear.substring(2, 6);
    this.AttndMonth = Monyear.substring(0, 2)
    this.calculateNoofdays(this.year, this.AttndMonth);
  }


  // Changeofdivision(DI_Id){
  //   this.DivisionId = DI_Id;
  //   this.data = this.userService.getEmaployeeDetails(DI_Id);    
  //       this.data.subscribe(
  //       (response) => {
  //         this.TimeRollDetails = response.Result;        
  //         this.GenerateTimeRoll();
  //       })  
  // }

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








  AddTimeroll(TimeRollDetails){
    debugger;    
    if(this.mode == 'edit')
    {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateTimeRoll(TimeRollDetails,this.year,this.AttndMonth,this.yearMonth,this.DivisionId,this.TimeRollId);
      this.data.subscribe(
        (response: any) => {         
          swal('Success!', 'Timeroll Updated successfully.', 'success');
          this.router.navigate(['/home/leaveapp/time-roll-gen']);          
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );      
    }

    else{
      var list = this.timerolldetails.filter(a=>(a.year_month == this.yearMonth) && (a.DivisionId == this.DivisionId))
      if(list.length > 0) {
        swal('Warning!', 'Timeroll generation is done for this division and year month.', 'warning');      
      return;
    }  

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.AddTimeroll(TimeRollDetails,this.year,this.AttndMonth,this.yearMonth,this.DivisionId);
    this.data.subscribe(
      (response: any) => {      
        swal('Success!', 'Timeroll generated successfully.', 'success');
        this.router.navigate(['/home/leaveapp/time-roll-gen']);       
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
    }     

  }

  Update(TimeRollDetails){   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.UpdateTimeRoll(TimeRollDetails,this.year,this.AttndMonth,this.yearMonth,this.DivisionId,this.TimeRollId);
    this.data.subscribe(
      (response: any) => {
        if(response > 0)        
        swal('Success!', 'Timeroll generated successfully.', 'success');
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  viewTimeRoll(TimeRollId){
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getTimeRollListbyId(TimeRollId);
    this.data.subscribe(
      (response: any) => {

        console.log('response');
        console.log(response);
        this.TimeRollDetails = response;
        this.c.code_value1 = response[0].yearmonth;
        this.c.EMP_DIVISION_ID = response[0].DIVISION_ID;
        this.c.desg_id = response[0].EMP_DESIGNATION_ID;
        this.DivisionId = response[0].DIVISION_ID;
        this.ChangeOfmonthyear(response[0].yearmonth);
      
        
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
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

}
