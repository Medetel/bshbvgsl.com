import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-address-details-form',
  templateUrl: './address-details-form.component.html',
  styleUrls: ['./address-details-form.component.css']
})
export class AddressDetailsFormComponent implements OnInit {

  title = "Employee Details";
  title2 = "Add Address Details";
  data: any = [];
  AllEmployeeList: any = [];
  a: any = [];
  detailsEmployee: any = [];
  stateList: any = [];
  DistrictsList: any = [];
  formInvalid: boolean;
  addressId: number;
  mode: string;
  hide: boolean;
  EmployeeId: number;
  AddressEmployeeDetails: any = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  empId: number
  totalItems: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getAllrequiredData()

    this.route.params.subscribe(params => {
      this.addressId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];

      if (this.addressId > 0)
        this.GetByIdEmployeeAddress(this.addressId);

      if (this.mode == 'view') {
        this.hide = true;
        this.title2 = 'View Address Details'
      }

      if (this.mode == 'edit') {
        this.hide = true;
        this.title2 = 'Edit Address Details'
      }



      if ((this.empId) > 0) {
        this.EmployeeId = this.empId;
      }
    });

    if (+localStorage.getItem('EmployeeId') > 0) {
      this.EmployeeId = +localStorage.getItem('EmployeeId')
      localStorage.removeItem('EmployeeId');
    }


    if (this.EmployeeId > 0) {
      this.ChangeOfEmployee(this.EmployeeId)
      this.GetEmployeeAddressDetails(0, 0);
    }

  }

  getAllrequiredData() {


    this.data = this.userService.GetAllhrmsfixedCodes('STATE');
    this.data.subscribe(
      (response: any) => {
        this.stateList = response;
      })

    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
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


  SaveEmplAddress(AddForm: NgForm) {
    if (AddForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      AddForm.value.EMP_ID_FK = this.EmployeeId;
      this.data = this.userService.PostEmployeeAddressDetails(AddForm.value);
      this.data.subscribe(
        (response) => {
          AddForm.reset();
          AddForm.resetForm();
          AddForm.form.markAsPristine();
          AddForm.form.markAsUntouched();
          swal('Success!', 'Employee Address Details Added Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/address-details']);
          this.GetEmployeeAddressDetails(this.itemsPerPage, this.currentPage);
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


  GetByIdEmployeeAddress(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEmployeeAddress(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.a = response;
        this.ChangeOfDivision(response.EMP_DIVISION_ID)
        this.ChangeOfEmployee(response.EMP_ID_FK);
        this.getAllrequiredData()

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  UpdateEmplAddress(AddForm: NgForm) {
    swal({
      title: 'Are you sure?', text: "You want to Update!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {

        if (AddForm.invalid) {
          this.formInvalid = true;
          swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
          return;
        }
        else {
          AddForm.value.EMP_ID_FK = this.EmployeeId;
          this.data = this.userService.UpdateEmployeeAddressDetails(AddForm.value, this.addressId);
          this.data.subscribe(
            (response) => {
              AddForm.reset();
              AddForm.resetForm();
              AddForm.form.markAsPristine();
              AddForm.form.markAsUntouched();
              swal('Success!', 'Employee Address Details Updated Successfully .', 'success');
              //this.router.navigate(['/home/serviceregister/address-details']);
              this.GetEmployeeAddressDetails(this.itemsPerPage, this.currentPage);
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
    })
  }


  ChangeOfDivision(DivisionId) {
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }

  Cancel() {
    this.router.navigate(['/home/serviceregister/address-details']);
  }


  GetEmployeeAddressDetails(itemsPerPage: number, pageNo: number) {
    //this.isSearch = false; 
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeAddress(itemsPerPage, pageNo, this.EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.AddressEmployeeDetails = response.EMP_AddressModels;
        // this.totalItems= response.TotalItemsCount;
        //this.itemsPerPage = itemsPerPage;
        //this.currentPage = pageNo;       
        //this.GetEmployeeAddressDetails(this.itemsPerPage,this.currentPage);     
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  resetFormFields() {
    this.a = {}; 
  }
  delete(EMP_ADDR_ID, PId) {
    debugger;
    swal({
      title: 'Are you sure?', text: "You want to delete! " , type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteEmployeeAddress(EMP_ADDR_ID);
        this.data.subscribe(
          (response: any) => {
            this.GetEmployeeAddressDetails(this.itemsPerPage, this.currentPage);
            this.resetFormFields();
          },
        );
      }
    })
  }


  gotoAdd(EmployeeId) {
    localStorage.setItem('EmployeeId', EmployeeId);
    this.router.navigate(['/home/serviceregister/address-details-form']);
  }


}
