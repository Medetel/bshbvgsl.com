import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SearchProject_MF } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-maintainance-fee',
  templateUrl: './maintainance-fee.component.html',
  styleUrls: ['./maintainance-fee.component.css']
})
export class MaintainanceFeeComponent implements OnInit {
  title="Maintainance Fee";
  title1="";
  title2="";
  sp: SearchProject_MF;
  SearchResult:any={};
  installmentpay:any={};
  Installments:any={};
  p:any={};
  formSubmitted: boolean = false;
  data:any;
  MF_Id:any;
  ItemsPerPage: number = 5;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  showInstallmentDiv: boolean = false;
  App_No: any;
  // MF_APP_Id_Fk: any;
  MF_Property_No: any;
  MF_APP_Id_FK: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.sp = new SearchProject_MF();
    this.formSubmitted = false;
   }

  ngOnInit() {
  }


  SearchProject(sp) {
    //alert(this.sp.app_no); 
    //alert(this.sp.property_no); 
    var App_No = 'empty'; 
    var Property_No = 'empty'; 
    //this.isApp = false;
    if (this.sp.app_no == null || this.sp.app_no == '')
    { 
        swal('warning!', 'Please enter the application no.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";          
        return;     
    }
    else {
      App_No = this.sp.app_no.trim();      
    }
    
    if (this.sp.property_no == null || this.sp.property_no == '') 
    { 
        swal('warning!', 'Please enter the property no.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;      
    }
    else {
      Property_No = this.sp.property_no.trim();
    }

    this.userService.GetProjectDetail_MF(App_No, Property_No)
    .subscribe(
      (data: any) => {
        
        document.getElementById('loader-spinner').style.display = "none";
        this.SearchResult = data;
        //console.log(this.SearchResult);        
        this.GetByIdmaintenance(App_No);
      }, (error) => {       
        if (error.status == 404) {         
          swal('warning!', 'No data found.', 'warning');
          this.SearchResult.Project_Name='';
          this.SearchResult.District_Name='';
          this.SearchResult.Phase_Name='';
          this.SearchResult.Scheme_Name='';
        }
        
      });
    
  }


  showInstallment() {
    $("#installment").modal('show');
  }

  hideInstallment() {
    this.showInstallmentDiv = false;
  }
  AddInstallments(pca) {
    this.installmentpay = {};
    // this.hideInstallment();
  }


  Save(pay: NgForm, MF_APP_Id_Fk) {
    console.log('paydata:',pay.value);
    if (pay.valid) {
      this.formSubmitted = false;
      // pay.value.MF_Id=this.MF_Id;
      // pay.value.Installments = this.Installments;
      pay.value.MF_Property_No = this.SearchResult.Property_No;
      pay.value.MF_APP_Id_Fk = this.SearchResult.App_No;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.saveInstallPayment(pay.value);
      this.data.subscribe(
        (response) => {
          console.log("data da:"+JSON.stringify(response));
          //  PaymentConfig.reset();
          //  PaymentConfig.resetForm();
          //  PaymentConfig.form.markAsPristine();
          //  PaymentConfig.form.markAsUntouched();
          //  this.formSubmitted = false;
          swal('Success!', 'Payment details has been saved successfully.', 'success');
          this.GetByIdmaintenance(this.SearchResult.App_No);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          swal('warning!', error.error.Message, 'warning');
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    else {
      swal('Warning!', 'Please fill all mandatory fields.', 'warning');
      this.formSubmitted = true;
    }
  }
 

  GetByIdmaintenance(APP_No) {
    debugger;
    console.log('details fee:',APP_No);
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetBYIdmaintenance(APP_No)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          // this.pc = data;
          // if (this.pc.PC_PT_Id_Fk == null) {
          //   this.pc.PC_PT_Id_Fk = undefined;
          // }
          this.Installments = data;
          // this.GetProjects(this.pc.PC_NO_Id_FK)
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  // payment(){
  //   swal({
  //     html:
  //       '<input placeholder="Mode of Payment" type="text" class="form-control"><br>' +
  //       '<input placeholder="Date" type="date" class="form-control"><br>' +
  //       '<input placeholder="Amount" type="text" class="form-control"><br>' +
  //       '<input placeholder="Name" type="text" class="form-control"><br>' ,
      
        
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     confirmButtonText:
  //       'Save',    
  //     cancelButtonText:
  //     'Cancel',
  //   })
  // }
  
}
