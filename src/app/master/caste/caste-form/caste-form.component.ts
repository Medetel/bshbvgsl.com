import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-caste-form',
  templateUrl: './caste-form.component.html',
  styleUrls: ['./caste-form.component.css']
})
export class CasteFormComponent implements OnInit {

  title = "Add Caste";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  r: any = {};
  rev: any = {};
  mode: any;
  Caste_Id: any;
  religionList: any;
  CasteCategoryList: any;
  Code: any;
  castelist: any = [];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe: TitleCasePipe) {

  }    

  ngOnInit() {
    this.getReligions()
    this.route.params.subscribe(params => {
      this.Caste_Id = params['Caste_Id'];
      this.mode = params['mode'];

      if (this.Caste_Id > 0) {

        this.GetCasteById(this.Caste_Id)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Caste ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Caste ";
    }

    this.GetCasteCategory();
  }
  getReligions() {   
    this.data = this.userService.Getreligions();
    this.data.subscribe(
      (response) => {
        this.religionList = response.ReligionModel;
      })


    this.data = this.userService.GetAllCodes('caste_mst');
    this.data.subscribe(
      (response: any) => {
        this.Code = response;
        if ((this.mode != 'View') && (this.mode != 'Edit')) {
          this.c.caste_code = response;
        }

      })
  }

  GetCasteCategory() {   
    this.data = this.userService.GetCategory();
    this.data.subscribe(
      (response) => {
        this.CasteCategoryList = response.Caste_Category;

      })

    this.data = this.userService.GetAllCasteCodes();
    this.data.subscribe(
      (response: any) => {
        this.castelist = response;
      })

  }
  SaveCaste(Caste: NgForm) {   

    Caste.value.caste_name = this.titlecasePipe.transform(Caste.value.caste_name);

    var list = this.castelist.filter(a => a.caste_name == Caste.value.caste_name);
    if (list.length > 0) {
      swal('Warning!', Caste.value.caste_name + ' already exist.', 'warning');
      return;
    }   
    if (Caste.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {           
      this.data = this.userService.PostCaste(Caste.value);
      this.data.subscribe(
        (response) => {
          Caste.reset();
          Caste.resetForm();
          Caste.form.markAsPristine();
          Caste.form.markAsUntouched();
          swal('Success!', 'Caste Added Successfully .', 'success');
          this.router.navigate(['/home/masters/caste']);
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
  GetCasteById(Caste_Id) {   
    this.data = this.userService.GetCasteById(Caste_Id);
    this.data.subscribe(
      (response: any) => {
        this.c = response;       
      }, (error) => {
        
      });
  }

  UpdateCasteDetails(Caste: NgForm) {

    if (Caste.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    Caste.value.caste_code = this.Code;
    this.data = this.userService.UpdateCasteDetails(this.Caste_Id, Caste.value);
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Caste details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/masters/caste']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }

      });
  }
  Cancel() {
    this.c.Rlg_Id = '';
    this.c.caste_code = '';
    this.c.caste_name = '';
    this.c.fix_code_id = '';
  }
}
