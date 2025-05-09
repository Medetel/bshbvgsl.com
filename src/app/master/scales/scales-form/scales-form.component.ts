import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-scales-form',
  templateUrl: './scales-form.component.html',
  styleUrls: ['./scales-form.component.css']
})
export class ScalesFormComponent implements OnInit {


  r: any = {};
  data: any = {};
  formInvalid: boolean = false;
  mode: any;
  scale_id: number;
  // title = "Add Scales/Grades";
  Title = "Add Scales/Grades";
  slab_id: number;
  PayScaleList: any;
  TempTableList = [];
  Temp1: any = [];
  MaxValur: number = 0;
  s: any = [];
  scaleslist: any = [];
  Code: any;
  DesignationList: any = [];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
    private errorHandler: ErrorHandler, private titlecasePipe: TitleCasePipe) {
     
  }

  // ngOnInit() {
  //   this.getallscales()
  //   console.log(this.title);
  //   this.route.params.subscribe(params => {
  //     this.scale_id = params['scale_id'];
  //     this.mode = params['mode'];
  //     console.log(this.mode);

  //     if (this.scale_id > 0) {
  //       this.GetScaleById(this.scale_id)
  //     }
  //   });


  //   if (this.mode == 'View') {
  //     this.title = "View Scales/Grades";
  //   }
  //   else if (this.mode == 'Edit') {
  //     this.title = "Edit Scales/Grades";
  //   }
  //   else if (this.mode == 'Add') {
  //     this.title = "Add Scales/Grades";
  //   }


  // }

  ngOnInit() {
    this.getallscales();
    console.log(this.Title);
    
    this.route.params.subscribe(params => {
        this.scale_id = params['scale_id'];
        this.mode = params['mode'];
        console.log(this.mode);

        if (this.scale_id > 0) {
            this.GetScaleById(this.scale_id);
        }

        // Set title based on mode after params are loaded
        // if (this.mode == 'View') {
        //     this.Title = "View Scales/Grades";
        // } else if (this.mode == 'Edit') {
        //     this.Title = "Edit Scales/Grades";
        // } 
      // } else if (this.mode == 'Add') {
      //   //     this.title = "Add Scales/Grades";
        // }
    });
}


  getallscales() {
    this.data = this.userService.GetAllScaleslist();
    this.data.subscribe(
      (response: any) => {
        this.scaleslist = response;
      })


    this.data = this.userService.GetAllCodes('pay_scale_mst');
    this.data.subscribe(
      (response: any) => {
        this.Code = response;
        if ((this.mode != 'View') && (this.mode != 'Edit')) {
          this.r.scale_code = response;
        }
      })


    this.data = this.userService.GetAllDesignation();
    this.data.subscribe(
      (response: any) => {
        this.DesignationList = response;
      })
  }

  foo(min_value: any, incr_value: any, max_value: any, w_e_f: any) {

    if (+min_value > +max_value) {
      swal('Warning!', 'minimum value should be less than Maximum value.', 'warning');
      return;
    }

    if (+incr_value > +min_value || +incr_value > +max_value) {
      swal('Warning!', 'increment value should be less than Maximum value and minimum value already exist.', 'warning');
      return;
    }

    var rem = max_value % incr_value;
    if (rem != 0) {
      swal('Warning!', 'Type proper scale value.', 'warning');
      return;
    }

    if ((min_value != null || min_value != undefined) &&
      (incr_value != null || incr_value != undefined) &&
      (max_value != null || max_value != undefined)) {

      this.Temp1 = {
        min_value: min_value,
        incr_value: incr_value,
        max_value: max_value,
        w_e_f: w_e_f
      }
      this.s.min_value = max_value;
      this.TempTableList.push(this.Temp1);
      this.r.TempModel = this.TempTableList;
      this.s = [];
      if (this.MaxValur < max_value) {
        this.MaxValur = max_value;
      }
      this.s.min_value = this.MaxValur;

    }

    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }

  }

  Savescale(scale: NgForm) {
    scale.value.scale_name = this.titlecasePipe.transform(scale.value.scale_name);
    scale.value.TempModel = this.TempTableList;
    scale.value.scale_code = this.Code;
    var list = this.scaleslist.filter(a => a.scale_name == scale.value.scale_name);

    if (list.length > 0) {
      swal('Warning!', scale.value.scale_name + ' already exist.', 'warning');
      return;
    }

    var list2 = this.scaleslist.filter(a => a.scale_code == this.r.scale_code);
    if (list2.length > 0) {
      swal('Warning!', this.r.scale_code + ' already exist.', 'warning');
      return;
    }

    if (scale.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.PostPayScale(scale.value);
      this.data.subscribe(
        (response) => {
          scale.reset();
          scale.resetForm();
          scale.form.markAsPristine();
          scale.form.markAsUntouched();
          swal('Success!', 'Scale Added Successfully .', 'success');
          this.router.navigate(['/home/masters/scales']);
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

  GetScaleById(scale_id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetScaleById(scale_id);
    this.data.subscribe(
      (response: any) => {
        this.TempTableList = response;
        for (let i = 0; i < this.TempTableList.length; i++) {
          this.r.scale_code = this.TempTableList[i].scale_code
          this.r.scale_name = this.TempTableList[i].scale_name
          this.r.desg_id = this.TempTableList[i].desg_id
        }

        this.r.w_e_f = response[0].w_e_f;

        if (this.r.w_e_f != null) {
          this.r.w_e_f = ((this.r.w_e_f).split('T'))[0];
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdatescaleDetails(scale: NgForm) {
    this.r.TempModel = this.TempTableList;
    scale.value.scale_code = this.Code;
    this.data = this.userService.UpdateScaleDetails(this.scale_id, this.r);
    this.data.subscribe(
      (response) => {
        scale.reset();
        scale.resetForm();
        swal('Success!', ' Scale details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/masters/scales']);
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
  GetInfo(scale_id: any) {
    this.s.scale_code = scale_id.scale_code
    this.s.scale_name = scale_id.scale_name
    this.s.min_value = scale_id.min_value
    if (scale_id.w_e_f != null) {
      this.s.w_e_f = ((scale_id.w_e_f).split('T'))[0];
    }

    this.s.incr_value = scale_id.incr_value
    this.s.max_value = scale_id.max_value
    this.s.scale_id = scale_id.scale_id

  }

  RemovePDDetails(i: any) {
    this.TempTableList.splice(i, 1);
  }

  Cancel() {
    this.r.scale_code = '';
    this.r.scale_name = '';
    this.r.min_value = '';
    this.r.incr_value = '';
    this.r.max_value = '';
    this.r.w_e_f = '';
    this.TempTableList = [];

  }

}

