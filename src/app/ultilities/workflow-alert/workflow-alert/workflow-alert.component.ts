import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow-alert',
  templateUrl: './workflow-alert.component.html',
  styleUrls: ['./workflow-alert.component.css']
})
export class WorkflowAlertComponent implements OnInit {

  ShowOne: boolean;
  ShowTwo: boolean;
  ShowThree: boolean;
  ShowFour: boolean;
  ShowFive: boolean;
  ShowSix: boolean;
  WF: any = {};
  data: any;
  UserList: any = [];
  formSubmitted: boolean;
  mode: any;

  constructor(private userService: UserService, private errorHandler: ErrorHandler, private router: Router) {
    this.ShowOne = false;
    this.ShowTwo = false;
    this.ShowThree = false;
    this.ShowFour = false;
    this.ShowFive = false;
    this.ShowSix = false;
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.GetAlertUsers()
  }
  selectOne() {
    this.ShowOne = !this.ShowOne;
  }
  selectTwo() {
    this.ShowTwo = !this.ShowTwo;
  }
  selectThree() {
    this.ShowThree = !this.ShowThree;
  }
  selectFour() {
    this.ShowFour = !this.ShowFour;
  }
  selectFive() {
    this.ShowFive = !this.ShowFive;
  }
  selectSix() {
    this.ShowSix = !this.ShowSix;
  }

  GetAlertUsers() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAlertUsers();
    this.data.subscribe(
      (response: any) => {
        this.UserList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  onSubmit(form: NgForm) {

    if (!form.invalid) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.InsertAlertDetails(form.value);
      this.data.subscribe(
        (response: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Saved Successfully!', 'success');
          this.router.navigate(['/home/workflow']);
        }, (error: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', error.error.Message, 'warning');
        });
    } else
      this.formSubmitted = true;
  }
}