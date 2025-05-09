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
  selector: 'app-time-roll-gen-grid',
  templateUrl: './time-roll-gen-grid.component.html',
  styleUrls: ['./time-roll-gen-grid.component.css']
})
export class TimeRollGenGridComponent implements OnInit {

  a:any={};
  title = "View Time Roll Generation";
  data: any =[];
  timerollList : any =[];
  TIMEROLL_ID: any;
  state: number;
  itemsPerPage:any;
  itemsPerPageChanged:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }  

  ngOnInit() {
    this.getAllTimeRollist();
  }

  getAllTimeRollist(){
    document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.uspGetTimerolllists();
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

  view(TIMEROLL_ID){
    //alert(TIMEROLL_ID)
    this.router.navigate(['/home/leaveapp/time-roll-gen-form',TIMEROLL_ID,'view']);
  }

  edit(TIMEROLL_ID){
    //alert(TIMEROLL_ID)
    this.router.navigate(['/home/leaveapp/time-roll-gen-form',TIMEROLL_ID,'edit']);
  }
  onSearch(searchForm,itemsPerPage,id){

  }
}
