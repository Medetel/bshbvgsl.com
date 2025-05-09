import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  title = "Add Category";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  CA_Id: number;
  mode: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.CA_Id = params['CA_Id'];
      this.mode = params['mode'];

      if (this.CA_Id > 0) {
        this.GetCategoryById(this.CA_Id)
      }
    });

    if (this.mode == 'view') {
      this.title = "View Category";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit Category";
    }
  }

  SaveCategory(Category: NgForm) {

    if (Category.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }


    else {

      this.data = this.userService.PostCategory(Category.value);
      this.data.subscribe(
        (response) => {
          Category.reset();
          Category.resetForm();
          Category.form.markAsPristine();
          Category.form.markAsUntouched();
          if (response.Result === "Category with similar Category name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result , 'success');
            this.router.navigate(['/home/category']);
            }
          // swal('Success!', 'Category Added Successfully .', 'success');
          // this.router.navigate(['/home/category']);
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

  GetCategoryById(CA_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCategory(CA_Id);
    this.data.subscribe(
      (response: any) => {
        this.c = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateCategory(Category: NgForm) {

    if (Category.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.UpdateCategory(Category.value, this.CA_Id);
      this.data.subscribe(
        (response) => {
          Category.reset();
          Category.resetForm();
          Category.form.markAsPristine();
          Category.form.markAsUntouched();
          if (response.Result === "Category with similar Category name already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!',  response.Result , 'success');
            this.router.navigate(['/home/category']);
            }
          // swal('Success!', 'Category Updated Successfully .', 'success');
          // this.router.navigate(['/home/category']);
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
  
}