import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';


@Component({
  selector: 'app-leave-bal-det-form',
  templateUrl: './leave-bal-det-form.component.html',
  styleUrls: ['./leave-bal-det-form.component.css']
})
export class LeaveBalDetFormComponent implements OnInit {
  title="Leave & Attendance Details";
  EmpId: any;
  detailsEmployee: any=[];
  data: any ={};
  LeaveBalance: any =[];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.EmpId = params['empId'];      
    })
    this.ChangeOfEmployee(this.EmpId)
    this.getthelist(this.EmpId)
  }


  ChangeOfEmployee(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeIds(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.detailsEmployee = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  getthelist(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetleaveBalanceList(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.LeaveBalance = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

}
