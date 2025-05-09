import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user.model';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../shared/ErrorHandler';


@Component({
  selector: 'app-emp-bank-details',
  templateUrl: './emp-bank-details.component.html',
  styleUrls: ['./emp-bank-details.component.css']
})
export class EmpBankDetailsComponent implements OnInit {
 
  title="Employee Bank Details";
  BankId: any;
  mode: any;
  hide: boolean;
  data: any = [];
  DistrictsList: any = [];
  l: any =[];
  b: any =[]
  AllEmployeeList: any = [];
  detailsEmployee: any =[];  
  formInvalid: boolean;
  AccountNolist: any =[];
  empId: number;
  EmployeeId: number;
  title2: string ='Bank Details';
  itemsPerPage: number=5;
  currentPage: number=1;
  EmployeeBankDetails: any =[];
  BankList : any =[]
  totalItems:any;
  userName: any;
  d: any = [];
  EMP_EMPLOYEE_ID: any;
  ItemsPerPage: number=5;
  pageno: number=1;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
 
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.GetByIdEmployeeAddress(this.userName);
    this.EMP_EMPLOYEE_ID = this.d.EMP_EMPLOYEE_ID
    console.log("Employe:", this.d.EMP_EMPLOYEE_ID)
    this.getDegaultData()
    this.route.params.subscribe(params => {
      this.BankId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];
      this.GetByIdBankDetails(this.BankId);
      if (this.mode == 'view') {
        this.hide = true;
      }
    });


    if((this.empId)>0){       
      this.EmployeeId = this.empId;
    }

    if (this.BankId > 0) {
      this.GetByIdBankDetails(this.BankId);
    }

    if(+localStorage.getItem('EmployeeId')>0){     
      this.EmployeeId = +localStorage.getItem('EmployeeId')
      localStorage.removeItem('EmployeeId');
    }   
      
    
    if(this.EmployeeId > 0){
      this.ChangeOfEmployee(this.EmployeeId)
      this.GetEmployeeAddressDetails(0, 0, this.d.EMP_EMPLOYEE_ID);
      // this.GetEmployeeBasicDetails(0,0);
    }


    if (this.mode == 'view') {
      this.hide = true;
      this.title2 = 'View Bank Details'
    }

    if (this.mode == 'edit') {      
      this.title2 = 'Edit Bank Details'
    }
  }

  ChangeOfEmployee(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeIds(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.detailsEmployee = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  getDegaultData() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

      this.data = this.userService.GetAllhrmsfixedCodes('Account Number');
      this.data.subscribe(
        (response: any) => {
          this.AccountNolist = response;
        })

    this.data = this.userService.GetAllhrmsfixedCodes('BankName');
    this.data.subscribe(
      (response: any) => {
        this.BankList = response;      
      })
  }

  ChangeOfDivision(DivisionId){    
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }


  SaveEmplBankDetails(EmplDetails: NgForm) {
    if (EmplDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      EmplDetails.value.EMP_ID = this.d.EMP_EMPLOYEE_ID ;
      this.data = this.userService.saveEmployeeBankDetails(EmplDetails.value);
      this.data.subscribe(
        (response) => {
          EmplDetails.reset();
          EmplDetails.resetForm();
          EmplDetails.form.markAsPristine();
          EmplDetails.form.markAsUntouched();
          swal('Success!', 'Employee Bank Details Added Successfully .', 'success');
          console.log("Employe:", this.d.EMP_EMPLOYEE_ID)
          // //this.router.navigate(['/home/serviceregister/bankdetails']);
          // this.GetEmployeeBasicDetails(this.itemsPerPage, this.currentPage);
          this.GetEmployeeAddressDetails(this.ItemsPerPage, this.pageno, this.d.EMP_EMPLOYEE_ID);
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


  UpdateEmplBankDetails(EMPLDetails: NgForm) {  
    if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      EMPLDetails.value.EMP_ID = this.d.EMP_EMPLOYEE_ID;
      this.data = this.userService.UpdateEmployeeBankDetails_self(EMPLDetails.value,this.BankId);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          this.resetFormFields();
          swal('Success!', 'Employee Leave Details Updated Successfully .', 'success');
          this.router.navigate(['/home/emp-bank-details']);
          // this.GetEmployeeBasicDetails(this.itemsPerPage,this.currentPage);  
          this.GetEmployeeAddressDetails(this.ItemsPerPage, this.pageno, this.d.EMP_EMPLOYEE_ID);
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

  GetByIdBankDetails(LeaveId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdBankDetailsforEmployee(LeaveId);
    this.data.subscribe(
      (response: any) => {
        this.b = response; 
        this.ChangeOfDivision(response.EMP_DIVISION_ID)     
        this.ChangeOfEmployee(response.EMP_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  Cancel(){   
    this.router.navigate(['/home/emp-bank-details']);
  }
  resetFormFields() {
    this.b = {};
  }

delete(BankId){
  debugger;
  swal({
       title: 'Are you sure?', text: "You want to delete! with Id : "+BankId, type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {        
      if (result.value) {
        this.data = this.userService.DeleteEmployeeBankDetails_self(BankId);
      this.data.subscribe(
       (response: any) => {
          //  this.GetEmployeeBasicDetails(this.itemsPerPage,this.currentPage);  
          this.GetEmployeeAddressDetails(this.ItemsPerPage, this.pageno, this.d.EMP_EMPLOYEE_ID);
          this.resetFormFields();
          this.router.navigate(['/home/emp-bank-details']);
       },       
    ); 
    
  } 
  })
  }


  gotoAdd(EmployeeId){      
    localStorage.setItem('EmployeeId',EmployeeId);  
    this.router.navigate(['/home/emp-bank-details']);
  }
  GetByIdEmployeeAddress(userName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeAddressBankDetails(userName);
    this.data.subscribe(
      (response: any) => {
        this.d = response;
        console.log(' d data :' + JSON.stringify(this.d));
        this.GetEmployeeAddressDetails(this.ItemsPerPage, this.pageno, this.d.EMP_EMPLOYEE_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetEmployeeAddressDetails(itemsPerPage: number, pageNo: number, empId: number) {
    console.log('emp id :' + this.d.EMP_EMPLOYEE_ID);
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllBankDetailsAddressForEmployee(itemsPerPage, pageNo, empId);
    this.data.subscribe(
      (response: any) => {
        console.log('address data :' + JSON.stringify(response))
        this.EmployeeBankDetails = response.HRMSEmpBankDetails;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
}

