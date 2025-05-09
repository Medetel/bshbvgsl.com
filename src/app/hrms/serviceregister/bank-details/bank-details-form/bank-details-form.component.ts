import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-bank-details-form',
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.css']
})
export class BankDetailsFormComponent implements OnInit {

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
  title2: string =' Add Bank Details';
  itemsPerPage: number=5;
  currentPage: number=1;
  EmployeeBankDetails: any =[];
  BankList : any =[]
  totalItems:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
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


    if(+localStorage.getItem('EmployeeId')>0){     
      this.EmployeeId = +localStorage.getItem('EmployeeId')
      localStorage.removeItem('EmployeeId');
    }   
      
    
    if(this.EmployeeId > 0){
      this.ChangeOfEmployee(this.EmployeeId)
      this.GetEmployeeBasicDetails(0,0);
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


  SaveEmplBankDetails(EMPLDetails: NgForm) {
        if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      EMPLDetails.value.EMP_ID = this.EmployeeId ;
      this.data = this.userService.PostEmployeeBankDetails(EMPLDetails.value);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          swal('Success!', 'Employee Bank Details Added Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/bankdetails']);
          this.GetEmployeeBasicDetails(this.itemsPerPage,this.currentPage);  
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
      EMPLDetails.value.EMP_ID = this.EmployeeId ;
      this.data = this.userService.UpdateEmployeeBankDetails(EMPLDetails.value,this.BankId);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          swal('Success!', 'Employee Leave Details Updated Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/bankdetails']);
          this.GetEmployeeBasicDetails(this.itemsPerPage,this.currentPage);  
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
    this.data = this.userService.GetByIdBankDetails(LeaveId);
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
    this.router.navigate(['/home/serviceregister/bankdetails']);
  }


  GetEmployeeBasicDetails(itemsPerPage: number, pageNo: number){
  //this.isSearch = false;   
  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetAllEmployeeBankDetails(itemsPerPage,pageNo,this.EmployeeId);
  this.data.subscribe(
       (response: any) => {
        this.EmployeeBankDetails= response.HRMSEmpBankDetails;    
        //this.totalItems= response.TotalItemsCount;
        //this.itemsPerPage = itemsPerPage;
        //this.currentPage = pageNo;      
                 
        document.getElementById('loader-spinner').style.display = "none";
       },    
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
    );      
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
      this.data = this.userService.DeleteEmployeeBankDetails(BankId);
      this.data.subscribe(
       (response: any) => {
          this.GetEmployeeBasicDetails(this.itemsPerPage, this.currentPage);   
          this.resetFormFields();
       },       
    ); 
    
  } 
  })
  }


  gotoAdd(EmployeeId){      
    localStorage.setItem('EmployeeId',EmployeeId);  
    this.router.navigate(['/home/serviceregister/bankdetails-form']);
  }


}
