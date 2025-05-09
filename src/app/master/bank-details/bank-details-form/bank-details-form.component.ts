import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bank-details-form',
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.css']
})
export class BankDetailsFormComponent implements OnInit {

  title = "Add Bank Details";
  data: any = {};
  formInvalid: boolean = false;
  c: any = {};
  b: any = {};
  bd_id: number;
  mode: string;
  Banks: any = {};
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bd_id = params['bd_id'];
      this.mode = params['mode'];

      if (this.bd_id > 0) {
        this.GetBankDetailsById(this.bd_id)
      }
    });

    if (this.mode == 'view') {
      this.title = "View Bank Details";
    }
    else if (this.mode == 'edit') {
      this.title = "Edit Bank Details";
    }
    this.GetAllBankDetails();
  }
  GetAllBankDetails() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllBankDetails();
    this.data.subscribe(
      (response: any) => {
        this.Banks = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  SaveBankDetails(BankDetails: NgForm) {

    if (BankDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.PostBankDetails(BankDetails.value);
      this.data.subscribe(
        (response) => {
          BankDetails.reset();
          BankDetails.resetForm();
          BankDetails.form.markAsPristine();
          BankDetails.form.markAsUntouched();
          
     if (response.Result === "Bank with similar details already exists")
      {
      swal('Warning!', response.Result, 'warning')
      } 
      else {
      swal('Success!', response.Result , 'success');
      this.router.navigate(['/home/bank-details']);
      }
    
          // swal('Success!', 'Bank Details Added Successfully .', 'success');
          // this.router.navigate(['/home/bank-details']);
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
  GetBankDetailsById(bd_id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetBankDetailsById(bd_id);
    this.data.subscribe(
      (response: any) => {
        this.c = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateBankDetails(BankDetails: NgForm) {
    if (BankDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.UpdateBankDetails(BankDetails.value, this.bd_id);
      this.data.subscribe(
        (response) => {
          BankDetails.reset();
          BankDetails.resetForm();
          BankDetails.form.markAsPristine();
          BankDetails.form.markAsUntouched();
          if (response.Result === "Bank with similar details already exists")
            {
            swal('Warning!', response.Result, 'warning')
            } 
            else {
            swal('Success!', response.Result , 'success');
            this.router.navigate(['/home/bank-details']);
            }
          
          // swal('Success!', 'Bank Details updated Successfully .', 'success');
          // this.router.navigate(['/home/bank-details']);
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
  // Cancel() {  
  //   this.c.CourtT_Code = '';
  //   this.c.CourtT_Name = '';
  // }

}