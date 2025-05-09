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
  selector: 'app-time-roll-apprve-grid',
  templateUrl: './time-roll-apprve-grid.component.html',
  styleUrls: ['./time-roll-apprve-grid.component.css']
})
export class TimeRollApprveGridComponent implements OnInit {
  a:any={};
  title="Time Roll Approval";
  data: any =[];
  timerollList : any =[];
  TIMEROLL_ID: any;
  state: number;
  saveDisable : boolean = false;
  mode:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

   }

  ngOnInit() {
    this.getAllTimeRollist()
  }

  getAllTimeRollist(){
    document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllTimerollList();
      this.data.subscribe(
        (response: any) => {
          this.timerollList = response;            
                
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
  }


  handleChange1(TIMEROLL_ID) {
    debugger;     
    this.TIMEROLL_ID = TIMEROLL_ID;
    this.saveDisable = false;    
    this.state = 1;
  }

  handleChange2(TIMEROLL_ID) {    debugger;
   
    this.TIMEROLL_ID = TIMEROLL_ID;
     this.saveDisable = false;  
    this.state = 2;
    //this.save(null)
  }

  save(remarks){
    this.data = this.userService.uspUpdateStatusTimeRoll(this.TIMEROLL_ID,remarks,this.state);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Timeroll status updated', 'success');
        //this.router.navigate(['/home/leaveapp/leave-sanction']);
        //location.reload()
        this.getAllTimeRollist()         
        this.saveDisable = true;       
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

}
