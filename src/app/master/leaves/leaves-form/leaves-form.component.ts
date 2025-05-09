import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-leaves-form',
  templateUrl: './leaves-form.component.html',
  styleUrls: ['./leaves-form.component.css']
})
export class LeavesFormComponent implements OnInit {

  title = "Add Leave Type";
  l: any = {};
  data: any = {};
  formInvalid: boolean = false;
  mode: any;
  Leave_id: number;
  Leavelist: any;
  Code: any;
  leavetypelist: any = [];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler
    , private titlecasePipe: TitleCasePipe) { }

  ngOnInit() {
    this.getdefaultData()
    this.route.params.subscribe(params => {
      this.Leave_id = params['Leave_id'];
      this.mode = params['mode'];

      if (this.Leave_id > 0) {
        this.GetLeaveById(this.Leave_id)
      }
    });

    if (this.mode == 'View') {
      this.title = "View Leave Type ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Leave Type ";
    }
    this.l.LeaveDays = 1;
    this.l.PaidStatus = 'No';
    this.l.AllowedInsta = 'NO';
    this.l.Accumalation = 'No';
    this.l.EnbcashmentAllowed = 'N';
    this.l.LeaveCredit = 'No';
  }


  getdefaultData() {
    this.data = this.userService.GetAllCodes('pay_leave_mst');
    this.data.subscribe(
      (response: any) => {
        this.Code = response;
        if ((this.mode != 'View') && (this.mode != 'Edit')) {
          this.l.Leave_code = response;
        }
      })

    this.data = this.userService.GetLeaveTypes();
    this.data.subscribe(
      (response: any) => {
        this.leavetypelist = response;
      })
  }

  SaveLeave(Leave: NgForm) {
    Leave.value.Leave_name = this.titlecasePipe.transform(Leave.value.Leave_name);    
    var list = this.leavetypelist.filter(a => a.Leave_name == this.l.Leave_name);

    if (list.length > 0) {
      swal('Warning!', this.l.Leave_name + ' already exist.', 'warning');
      return;
    }

    Leave.value.Leave_code = this.Code;
    if (Leave.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    if (Leave.value.PaidStatus == null) {
      swal('Warning!', 'Please Select PaidStatus.', 'warning');
      return;
    }
    else {                      
      this.data = this.userService.PostLeave(Leave.value);
      this.data.subscribe(
        (response) => {
          Leave.reset();
          Leave.resetForm();
          Leave.form.markAsPristine();
          Leave.form.markAsUntouched();
          swal('Success!', 'leaves Added Successfully .', 'success');
          this.router.navigate(['/home/masters/leaves']);
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
  UpdateLeaveDetails(Leave: NgForm) {   
    Leave.value.Leave_name = this.titlecasePipe.transform(Leave.value.Leave_name);
    Leave.value.Leave_code = this.l.Leave_code;
    this.data = this.userService.UpdateLaveDetails(this.Leave_id, Leave.value);
    this.data.subscribe(
      (response) => {
        Leave.reset();
        Leave.resetForm();
        swal('Success!', ' leaves details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/masters/leaves']);
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
  GetLeaveById(Leave_id) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetLeaveById(Leave_id);
    this.data.subscribe(
      (response: any) => {
        this.l = response;

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Cancel() {
    this.l.Leave_code = '';
    this.l.Leave_name = '';
    this.l.Encashment = '';
    this.l.Accumalation = '';
    this.l.Ceiling = '';
  }
}
