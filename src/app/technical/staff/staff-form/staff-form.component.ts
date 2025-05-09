import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  projectcode: any = [];
  Areacode: any = [];
  staff_mob_demob_id: number
  hide: boolean = false;
  mode: string = "";
  i: any = {};
  title = "Add Staffmob";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectstaffmob();
    this.GetAllAreastaffmob();

    this.route.params.subscribe(params => {

      this.staff_mob_demob_id = params['staff_mob_demob_id'];
      this.mode = params['mode'];

      if (this.staff_mob_demob_id > 0) {
        this.GetByIdStaffMobDemob(this.staff_mob_demob_id);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Staff";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Staff";
      }
    });


    if (this.staff_mob_demob_id > 0) {
      this.GetByIdStaffMobDemob(this.staff_mob_demob_id);
    }


  }

  Savestaff(Staffform: NgForm) {

    if (Staffform.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }


    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostStaffmob(Staffform.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          Staffform.reset();
          Staffform.resetForm();
          Staffform.form.markAsPristine();
          Staffform.form.markAsUntouched();
          swal('Success!', 'Staff Added Successfully .', 'success');
          this.router.navigate(['/home/staffmob']);

        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        }
      );
    }
  }

  GetAllProjectstaffmob() {
    this.data = this.userService.GetAllProjectstaffmob();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;
      }, (error) => {

      });
  }

  GetAllAreastaffmob() {
    this.data = this.userService.GetAllAreastaffmob();
    this.data.subscribe(
      (response: any) => {
        this.Areacode = response;
      }, (error) => {

      });
  }

  GetByIdStaffMobDemob(staff_mob_demob_id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdStaff(staff_mob_demob_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.i = response;

        if (this.i.Working_Start_Date != null)
          this.i.Working_Start_Date = ((this.i.Working_Start_Date).split('T'))[0];
        if (this.i.Working_End_Date != null)
          this.i.Working_End_Date = ((this.i.Working_End_Date).split('T'))[0];
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdateStaff(Staffform: NgForm) {
    if (Staffform.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (Staffform.value.Staff_Name != null && !Staffform.value.Staff_Name.match("http"))
        document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateStaff(this.staff_mob_demob_id, Staffform.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          Staffform.reset();
          Staffform.resetForm();
          Staffform.form.markAsPristine();
          Staffform.form.markAsUntouched();
          swal('Success!', 'Staff Updated Successfully .', 'success');
          this.router.navigate(['/home/Staffmob']);

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

}