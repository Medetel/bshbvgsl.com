import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-settlement-form',
  templateUrl: './settlement-form.component.html',
  styleUrls: ['./settlement-form.component.css']
})
export class SettlementFormComponent implements OnInit {

  title="Employee Details";
  title2 ="Add Family Member Details"
  BankId: any;
  mode: any;
  hide: boolean;
  data: any = [];
  DistrictsList: any = [];  
  d : any =[];
  AllEmployeeList: any = [];
  detailsEmployee: any =[];  
  formInvalid: boolean;
  AccountNolist: any =[];
  relagionlist : any =[];
  maritalStatuslist: any =[];
  qualificationlist: any =[];
  EmployeeId: number; 
  itemsPerPage: number=5;
  currentPage: number=1;
  EmployeefamilyDetails :any =[];
  empId: number;
  totalItems:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getDegaultData()
    this.route.params.subscribe(params => {
      this.BankId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];
      this.GetByIddependentDetails(this.BankId);
      if (this.mode == 'view') {
        this.hide = true;
      }
    });

    if((this.empId)>0){       
      this.EmployeeId = this.empId;
    }


    if(+localStorage.getItem('EmployeeId')>0){     
         this.EmployeeId = +localStorage.getItem('EmployeeId');     
         localStorage.removeItem('EmployeeId');
    }   
      
    
    if(this.EmployeeId > 0){
      this.ChangeOfEmployee(this.EmployeeId)
      this.GetEmployeefamilyDetails(0,0);
    }


    if (this.mode == 'view') {
      this.hide = true;
      this.title2 = 'View Family Member Details'
    }

    if (this.mode == 'edit') {
      this.hide = true;
      this.title2 = 'Edit Family Member Details'
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

      this.data = this.userService.GetAllRelations();
      this.data.subscribe(
        (response: any) => {
          this.relagionlist = response;          
        })

    this.data = this.userService.GetAllhrmsfixedCodes('MARTIAL STATUS');
    this.data.subscribe(
      (response: any) => {
        this.maritalStatuslist = response;
      })


    this.data = this.userService.GetAllhrmsfixedCodes('Qualification Name');
    this.data.subscribe(
      (response: any) => {
        this.qualificationlist = response;
      })
  }

  ChangeOfDivision(DivisionId){    
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }


  SaveEmpldependentDetails(EMPLDetails: NgForm) {
        if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {    
      EMPLDetails.value.EMP_ID = this.EmployeeId ;
      this.data = this.userService.PostEmployeeDependentDetails(EMPLDetails.value);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          swal('Success!', 'Employee family Details Added Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/dependentdetails']);
          this.GetEmployeefamilyDetails(0,0);
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


  UpdateEmpldependentDetails(EMPLDetails: NgForm) { 
    
    if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      EMPLDetails.value.EMP_ID = this.EmployeeId ;
      this.data = this.userService.UpdateEmployeeDependentDetails(EMPLDetails.value,this.BankId);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          swal('Success!', 'Employee family Details Updated Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/dependentdetails']);
          this.GetEmployeefamilyDetails(0,0);
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


  GetByIddependentDetails(dependId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdDependentDetails(dependId);
    this.data.subscribe(
      (response: any) => {
        this.d = response;
        this.d.DEPND_DOB = ((this.d.DEPND_DOB).split('T'))[0]; 
        this.ChangeOfDivision(response.EMP_DIVISION_ID)     
        this.ChangeOfEmployee(response.EMP_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  Cancel(){   
    this.router.navigate(['/home/serviceregister/dependentdetails']);
  }



  GetEmployeefamilyDetails(itemsPerPage: number, pageNo: number){
    //this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeDependentDetails(itemsPerPage,pageNo,this.EmployeeId);
    this.data.subscribe(
         (response: any) => {
          this.EmployeefamilyDetails= response.HRMSEmpDependent;    
          //this.totalItems= response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;                
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );      
  }
  
  
  delete(Id){
    debugger;
    swal({
         title: 'Are you sure?', text: "You want to delete! with Id : "+Id, type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {        
        if (result.value) {
  
        this.data = this.userService.DeleteEmployeeDependentDetails(Id);
        this.data.subscribe(
         (response: any) => {
             this.GetEmployeefamilyDetails(this.itemsPerPage,this.currentPage);          
         },       
      );
      
      
    } 
    })
    }

    gotoAdd(EmployeeId){      
      localStorage.setItem('EmployeeId',EmployeeId);  
      this.router.navigate(['/home/serviceregister/dependentdetails-form']);
    }

}
