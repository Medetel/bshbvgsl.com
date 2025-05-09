import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-leave-details-form',
  templateUrl: './leave-details-form.component.html',
  styleUrls: ['./leave-details-form.component.css']
})
export class LeaveDetailsFormComponent implements OnInit {

  title = "Employee Leave Details";
  title2 = "Add Leave Details"
  LeaveId: any;
  mode: string = '';
  hide: boolean;
  data: any = [];
  DistrictsList: any = [];
  l: any = [];
  AllEmployeeList: any = [];
  detailsEmployee: any = [];
  leavetypelist: any = [];
  formInvalid: boolean;
  EmployeeId: number;
  itemsPerPage: number = 5;
  currentPage: number;
  EmployeeLeaveDetails: any = [];
  empId: number;
  LeaveDetailList: any = [];
  totalItems:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getDegaultData()
    this.route.params.subscribe(params => {
      this.LeaveId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];
      this.GetByIdLeaveDetails(this.LeaveId);
      if (this.mode == 'view') {
        this.hide = true;
        this.title2 = 'View Leave Details'
      }

      else if (this.mode == 'edit') {
        this.hide = true;
        this.title2 = 'Edit Leave Details'
      }
    });

    if ((this.empId) > 0) {
      this.EmployeeId = this.empId;
    }

    if (+localStorage.getItem('EmployeeId') > 0) {
      this.EmployeeId = +localStorage.getItem('EmployeeId')
      localStorage.removeItem('EmployeeId');
    }


    if (this.EmployeeId > 0) {
      this.ChangeOfEmployee(this.EmployeeId)
      this.GetEmployeeLeaveDetails(0, 0);
    }
    
    this.getlaeveDetails()   

  }

  getlaeveDetails(){
    this.data = this.userService.GetAllEMPLeaveDetialsforDuplication(this.EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.LeaveDetailList = response;
      })
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

    this.data = this.userService.GetLeaveTypes();
    this.data.subscribe(
      (response: any) => {
        this.leavetypelist = response;
        this.leavetypelist = this.leavetypelist.filter(a=>a.Accumalation == 'Y')
      })


    
  }

  ChangeOfDivision(DivisionId) {
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }


  SaveEmplLeaveDetails(EMPLDetails: NgForm) {    
    debugger;   
   var list =  this.LeaveDetailList.filter(a=>a.EMP_LEAVE_DESC == EMPLDetails.value.EMP_LEAVE_DESC)
     if(list.length>0){
      swal('Warning!', 'Leave Type Already exist.', 'warning');
      return;
     }

    if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      EMPLDetails.value.EMP_ID_FK = this.EmployeeId;
      this.data = this.userService.PostEmployeeLeaveDetails(EMPLDetails.value);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          this.getlaeveDetails()   
          swal('Success!', 'Employee Leave Details Added Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/leavedetails']);
          this.GetEmployeeLeaveDetails(this.itemsPerPage, this.currentPage);
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


  UpdateEmplLeaveDetails(EMPLDetails: NgForm) {
    if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      EMPLDetails.value.EMP_ID_FK = this.EmployeeId;
      this.data = this.userService.UpdateEmployeeLeaveDetails(EMPLDetails.value, this.LeaveId);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          swal('Success!', 'Employee Leave Details Updated Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/leavedetails']);
          this.GetEmployeeLeaveDetails(this.itemsPerPage, this.currentPage);
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


  GetByIdLeaveDetails(LeaveId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdLeaveDetails(LeaveId);
    this.data.subscribe(
      (response: any) => {
        this.l = response;
        this.ChangeOfDivision(response.EMP_DIVISION_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Cancel() {
    this.router.navigate(['/home/serviceregister/leavedetails']);
  }


  GetEmployeeLeaveDetails(itemsPerPage: number, pageNo: number) {
    //this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeLeaves(itemsPerPage, pageNo, this.EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeLeaveDetails = response.EMPLeaveModels;
        //this.totalItems= response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;

        console.log('emp');
        console.log(this.EmployeeLeaveDetails);

        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  resetFormFields() {
    this.l = {};
  }
  delete(EmployeeId) {
    debugger;
    swal({
      title: 'Are you sure?', text: "You want to delete: " , type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteEmployeeLeavesDetails(EmployeeId);
        this.data.subscribe(
          (response: any) => {
            this.GetEmployeeLeaveDetails(this.itemsPerPage, this.currentPage);
            this.resetFormFields();
          },
        );

      }
    })
  }


  gotoAdd(EmployeeId) {
    localStorage.setItem('EmployeeId', EmployeeId);
    this.router.navigate(['/home/serviceregister/leavedetails-form']);
  }

}
