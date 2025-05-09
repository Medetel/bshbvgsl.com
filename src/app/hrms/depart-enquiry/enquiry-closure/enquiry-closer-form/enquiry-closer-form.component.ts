import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enquiry-closer-form',
  templateUrl: './enquiry-closer-form.component.html',
  styleUrls: ['./enquiry-closer-form.component.css']
})
export class EnquiryCloserFormComponent implements OnInit {
  data: any = {};
  formInvalid: boolean = false;
  e: any = {};
  ProcList: any = [];
  p: any = {};
  aa: any = {};
  SCN_REPLY_ID: any;
  EMP_EMPLOYEE_ID: any;
  SClist: any = {};
  ProceedingDetails: any = {};
  SCklist: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  ENQUIRY_ID: any;
  enqplist: any = [];
  C: any = {};
  c: any = {};
  SCNlist: any = {};
  Complist: any = {};
  tt: any = {};
  sc: any = {};
  fileToUpload: File;
  title: string;
  ChargeDetails: any = []
  mode: any;
  EId: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.ENQUIRY_ID = params['ENQUIRY_ID'];

      this.mode = params['mode'];

      if (this.ENQUIRY_ID > 0) {
        this.GetEnqDetails(this.ENQUIRY_ID)
      }

      if (this.ENQUIRY_ID > 0) {
        this.GetByIdClosure(this.ENQUIRY_ID)
      }
    });

    if (this.mode == 'View') {
      this.title = "View Enq.Closure ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Enq.Closure ";
    }



  }


  //detilas of enq
  GetEnqDetails(ENQUIRY_ID) {

    this.data = this.userService.GetEnqProcDetails1(ENQUIRY_ID);
    this.data.subscribe(
      (response: any) => {
        this.enqplist = response;
        this.GetEnqProc(ENQUIRY_ID)
      })
  }

  GetEnqProc(ENQUIRY_ID) {
    
   
    this.data = this.userService.GetEnqDetailsInClosure(ENQUIRY_ID);
    this.data.subscribe(
      (response: any) => {
        this.ProcList = response;
      })
  }



  //save for proceeding


 








  GetByIdClosure(ENQUIRY_ID) {

   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdClosure(ENQUIRY_ID);
    this.data.subscribe(
      (response: any) => {
        this.e = response;

        if (this.e.TERMINATION_WEF != null)
        this.e.TERMINATION_WEF = ((this.e.TERMINATION_WEF).split('T'))[0];

        if (this.e.REVOKE_TERMINATION_WEF != null)
        this.e.REVOKE_TERMINATION_WEF = ((this.e.REVOKE_TERMINATION_WEF).split('T'))[0];
        // this.GetEnqDetails(this.ENQUIRY_ID) 
        // this.GetEnqProc(this.ENQUIRY_ID) 
        // this.GetComplaints(this.e.SCN)


        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401 || error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }

  //update
  UpdateIDE(IDE: NgForm) {

    IDE.value.ChargeModel = this.ChargeDetails;


    this.data = this.userService.UpdateIDE(IDE.value, this.ENQUIRY_ID);
    this.data.subscribe(
      (response) => {
        IDE.reset();
        IDE.resetForm();
        IDE.form.markAsPristine();
        IDE.form.markAsUntouched();

        this.ChargeDetails = [];


        swal('Success!', ' Intiate Dept.Enq  updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/dept-enquiry/initiative-depart/']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401 || error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }


}


