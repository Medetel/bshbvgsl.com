import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-boq-form',
  templateUrl: './boq-form.component.html',
  styleUrls: ['./boq-form.component.css']
})
export class BoqFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  projectcode: any = [];
  Baseline_BOQ_Id: number
  hide: boolean = false;
  mode: string = "";
  i: any = {};
  title = "Add Baseline";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectBaseline();
    this.route.params.subscribe(params => {

      this.Baseline_BOQ_Id = params['Baseline_BOQ_Id'];
      this.mode = params['mode'];

      if (this.Baseline_BOQ_Id > 0) {
        this.GetByIdBaseline(this.Baseline_BOQ_Id);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Baseline";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Baseline";
      }
    });


    if (this.Baseline_BOQ_Id > 0) {
      this.GetByIdBaseline(this.Baseline_BOQ_Id);
    }
  }
  SaveBaseline(Baselineform: NgForm) {

    if (Baselineform.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostBaseline(Baselineform.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          Baselineform.reset();
          Baselineform.resetForm();
          Baselineform.form.markAsPristine();
          Baselineform.form.markAsUntouched();
          swal('Success!', 'Baseline BOQ Added Successfully .', 'success');
          this.router.navigate(['/home/baseline']);

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

  GetAllProjectBaseline() {
    this.data = this.userService.GetAllProjectBaseline();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;
      }, (error) => {

      });
  }
  GetByIdBaseline(Baseline_BOQ_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdBaseline(Baseline_BOQ_Id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.i = response;

      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateBaseline(Baselineform: NgForm) {
    if (Baselineform.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (Baselineform.value.Staff_Name != null && !Baselineform.value.Staff_Name.match("http"))
        document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateBaseline(this.Baseline_BOQ_Id, Baselineform.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          Baselineform.reset();
          Baselineform.resetForm();
          Baselineform.form.markAsPristine();
          Baselineform.form.markAsUntouched();
          swal('Success!', 'Baseline BOQ Updated Successfully .', 'success');
          this.router.navigate(['/home/baseline']);

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