import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../shared/user.service';

@Component({
  selector: 'app-pay-monthly-form',
  templateUrl: './pay-monthly-form.component.html',
  styleUrls: ['./pay-monthly-form.component.css']
})
export class PayMonthlyFormComponent implements OnInit {
  data: any;
  title: string;
  hide : boolean = false;
  mode: any;
  year_month: any;
  TimeRollDetailslist:any;
  days: number=31;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.year_month = params['Id']; 
      this.mode = params['mode']; 
      if(this.year_month >0){
        this.viewMonthly(this.year_month)
      }    
    });
    if(this.mode == 'view'){
      this.hide = true; 
      }
     
      if(this.mode=='view'){
      this.title = "View Time Roll Generation";
      }
  }
  viewMonthly(year_month){
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.viewMonthly(year_month);
    this.data.subscribe(
      (response: any) => {

        console.log('response');
        console.log(response);
        this.TimeRollDetailslist = response;
        if(((this.days != 28) && (this.days != 29)&& (this.days != 30) && (this.days != 31)) == true)
          {
            for(var i=0;i<=this.TimeRollDetailslist.length;i++){
              this.TimeRollDetailslist[i].DAY_28 = '';
              this.TimeRollDetailslist[i].DAY_29 ='';
              this.TimeRollDetailslist[i].DAY_30 ='';
               this.TimeRollDetailslist[i].DAY_31 ='';
            }
          }
    
          if(((this.days != 29)&& (this.days != 30) && (this.days != 31)) == true)
          {
            for(var i=0;i<=this.TimeRollDetailslist.length;i++){
             this.TimeRollDetailslist[i].DAY_29 ='';
              this.TimeRollDetailslist[i].DAY_30 ='';
               this.TimeRollDetailslist[i].DAY_31 ='';
            }
          }
    
          if(((this.days != 30) && (this.days != 31)) == true)
          {
            for(var i=0;i<=this.TimeRollDetailslist.length;i++){
              this.TimeRollDetailslist[i].DAY_30 ='';
               this.TimeRollDetailslist[i].DAY_31 ='';
            }
          }
    
          if(((this.days != 31)) == true)
          {
            for(var i=0;i<=this.TimeRollDetailslist.length;i++){
              this.TimeRollDetailslist[i].DAY_31 = ''
            }
          }
        // this.b.code_value1 = response[0].yearmonth;
        // this.c.EMP_DIVISION_ID = response[0].DIVISION_ID;
        // this.b.desg_id = response[0].EMP_DESIGNATION_ID;
        // this.b.EMP_DIVISION_ID = response[0].DIVISION_ID;
        // this.ChangeOfmonthyear(response[0].yearmonth);
      
        
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
  





}
