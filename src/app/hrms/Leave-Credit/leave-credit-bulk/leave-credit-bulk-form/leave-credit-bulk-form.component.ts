import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-credit-bulk-form',
  templateUrl: './leave-credit-bulk-form.component.html',
  styleUrls: ['./leave-credit-bulk-form.component.css']
})
export class LeaveCreditBulkFormComponent implements OnInit {
  data: any = {};
  DistrictsList: any = [];
  lb: any = [];
  leavetypelist: any = [];
  leavebulklist: any = [];
  FormList: any = [];
  LeavecreditId: number;
  mode: any;
  getbyIdlist: any = [];
  pageChanged:any;
  totalItems:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe) {

  }

  ngOnInit() {
    this.getDegaultData()

    this.route.params.subscribe(params => {
      this.LeavecreditId = params['Id'];
      if (this.LeavecreditId > 0)
        this.GetbyId(this.LeavecreditId)
      this.mode = params['mode'];
    });

  }

  getDegaultData() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

    this.data = this.userService.GetLeaveTypes();
    this.data.subscribe(
      (response: any) => {
        this.leavetypelist = response;
      })

    this.lb.DIVISION_CODE = +localStorage.getItem('divisonId');
  }


  GenerateList(divisonId, leaveType) {
   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetLeaveBulkList(divisonId, leaveType);
    this.data.subscribe(
      (response: any) => {
        this.leavebulklist = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  save() {
   
    if (this.lb.Credit > 0 )
    {
      for (var i = 0; i < this.leavebulklist.length; i++) {
        let temp = {
          EMP_EMPLOYEE_CODE: this.leavebulklist[i].EMP_EMPLOYEE_CODE,
          EmpName: this.leavebulklist[i].EMP_FIRST_NAME,
          leaveType: this.lb.leaveType,
          Leave_Credi: this.lb.Credit,
          EMP_ID: this.leavebulklist[i].EMP_EMPLOYEE_ID
        }
        this.FormList.push(temp);
      }
    }

    else{
      swal('Warning!', 'Enter Leave Credit.', 'warning');
      return;
    }
    

    if (this.FormList.length > 0) {

      //revert back

      // document.getElementById('loader-spinner').style.display = "block";
      // this.data = this.userService.updateLeaveCredit(this.FormList);
      // this.data.subscribe(
      //   (response: any) => {
      //     document.getElementById('loader-spinner').style.display = "none";
      //     swal('Success!', 'Leaves credited successfully.', 'success');         
      //     this.GenerateList(this.lb.DIVISION_CODE,this.lb.leaveType);
      //     //this.router.navigate(['/home/leavecredit'])
      //   }, (error) => {
      //     document.getElementById('loader-spinner').style.display = "none";
      //   });


      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.CreateLeavecredit(this.FormList, 'B');
      this.data.subscribe(
        (response: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Success!', 'Leaves credited successfully.', 'success');
          //this.router.navigate(['/home/leavecredit'])
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
  }



  GetbyId(Id) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getleavecreditBulkDetailsbyId(Id);
    this.data.subscribe(
      (response: any) => {
        this.leavebulklist = response;
       if(this.leavebulklist.length>0){
        this.lb.leaveType = response[0].leaveType;
        this.lb.Credit = response[0].LEAVE_credit_Days;
       
       }    
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
}
