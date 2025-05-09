import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-structures-form',
  templateUrl: './structures-form.component.html',
  styleUrls: ['./structures-form.component.css']
})
export class StructuresFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  Structure_id: number
  hide: boolean = false;
  mode: string = "";
  i: any = {};
  title = "Add Structures";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.Structure_id = params['Structure_id'];
      this.mode = params['mode'];

      if (this.Structure_id > 0) {
        this.GetByIdStructures(this.Structure_id);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Structures";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Structures";
      }
    });


    if (this.Structure_id > 0) {
      this.GetByIdStructures(this.Structure_id);
    }
  }
  SaveStructures(StructuresForm: NgForm) {    
    if (StructuresForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostStructures(StructuresForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          StructuresForm.reset();
          StructuresForm.resetForm();
          StructuresForm.form.markAsPristine();
          StructuresForm.form.markAsUntouched();
          swal('Success!', 'Structures Added Successfully .', 'success');
          this.router.navigate(['/home/structures']);

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
  GetByIdStructures(Structure_id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdStructures(Structure_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.i = response;     
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateStructures(StructuresForm: NgForm) {
    if (StructuresForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (StructuresForm.value.Staff_Name != null && !StructuresForm.value.Staff_Name.match("http"))
        document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateStructures(this.Structure_id, StructuresForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          StructuresForm.reset();
          StructuresForm.resetForm();
          StructuresForm.form.markAsPristine();
          StructuresForm.form.markAsUntouched();
          swal('Success!', 'Structures Updated Successfully .', 'success');
          this.router.navigate(['/home/structures']);

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